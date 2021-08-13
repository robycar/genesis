package it.reply.sipp.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Path;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.hibernate.engine.jdbc.BlobProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import it.reply.sipp.AppError;
import it.reply.sipp.api.files.payload.FileContentDTO;
import it.reply.sipp.api.files.payload.FileDTO;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.generic.service.AbstractService;
import it.reply.sipp.model.BaseEntity;
import it.reply.sipp.model.FileSystemScope;
import it.reply.sipp.model.FileSystemVO;
import it.reply.sipp.model.TemplateFileVO;
import it.reply.sipp.model.TemplateVO;
import it.reply.sipp.model.repository.FileSystemRepository;
import it.reply.sipp.model.repository.TemplateRepository;
import it.reply.sipp.service.FileSystemService;

@Service
@Transactional(rollbackFor = ApplicationException.class)
public class FileSystemServiceImpl extends AbstractService implements FileSystemService {

  @Autowired
  private FileSystemRepository fileSystemRepository;
  
  @Autowired
  private TemplateRepository templateRepository;
  
  @Override
  public List<FileDTO> listFolder(FileSystemScope scope, long idRef) throws ApplicationException {
    logger.debug("enter listFolder");
    List<FileSystemVO> folderVO = fileSystemRepository.findByScopeAndIdRef(scope, idRef);
    
    return folderVO.stream()
        .map(vo -> new FileDTO(vo))
        .collect(Collectors.toList());
  }

  @Override
  public List<FileDTO> upload(FileSystemScope scope, long idRef, List<MultipartFile> files)
      throws ApplicationException {
    logger.debug("enter upload");
    
    //TODO Verifica che il "folder" esista
    checkFolderExists(scope, idRef);
    
    ArrayList<FileDTO> result = new ArrayList<>(files.size());
    
    for (MultipartFile file: files) {
      FileSystemVO fileVO = saveFile(scope, idRef, file);
      result.add(new FileDTO(fileVO));
    }
    
    return result;
  }

  private static final Path root = Path.of("");
  
  private FileSystemVO saveFile(FileSystemScope scope, long idRef, MultipartFile file) throws ApplicationException {
    logger.debug("enter saveFile");
    
    logger.debug("OriginalFileName: {}, ContentType: {}", file.getOriginalFilename(), file.getContentType());
    
    Path path = root.resolve(file.getOriginalFilename());
    
    FileSystemVO fileVO = fileSystemRepository.findByScopeAndIdRefAndPath(scope, idRef, path.toString())
        .orElseGet(() -> {
          FileSystemVO vo = new FileSystemVO();
          vo.init(getUsername());
          vo.setIdRef(idRef);
          vo.setScope(scope);
          vo.setPath(path.toString());
          return vo;
        });
    
    
    Blob content = fileVO.getContent();
    if (content == null) {
      try {
        fileVO.setContent(BlobProxy.generateProxy(file.getInputStream(), file.getSize()));
      } catch (IOException e) {
        logger.error("Impossibile leggere il contenuto del file da caricare: {} ({})",
            file.getName(), file.getSize(), e);
        throw makeError(HttpStatus.INTERNAL_SERVER_ERROR, AppError.FS_UPLOAD_READ_ERROR, file.getName());
      }
    } else {
      try {
        long originalLength = content.length();
        try (OutputStream os = content.setBinaryStream(1);
            InputStream is = file.getInputStream()) {
          long newLength = is.transferTo(os);
          if (newLength < originalLength) {
            content.truncate(newLength);
          }
        }
        
      } catch (SQLException|IOException e) {
        logger.error("Errore nella scrittura del BLOB content", e);
        throw makeError(HttpStatus.INTERNAL_SERVER_ERROR, AppError.FS_UPLOAD_WRITE_ERROR, file.getOriginalFilename());
      }
    }
    if (file.getContentType() != null) {
      fileVO.setContentType(file.getContentType());
    }
    fileVO = fileSystemRepository.saveAndFlush(fileVO);
    
    return fileVO;
    
  }

  private BaseEntity checkFolderExists(FileSystemScope scope, long idRef) throws ApplicationException {
    logger.debug("enter checkFolderExists");
    if (scope.equals(FileSystemScope.TEMPLATE)) {
      return templateRepository.findById(idRef).orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.TEMPLATE_NOT_FOUND, idRef));
    }

    //TODO: return test
    return null;
    
  }
  
  private FileSystemVO findFile(FileSystemScope scope, long idRef, String pathOrId) throws ApplicationException {
   
    FileSystemVO fileVO = null;
    try {
      Long id = Long.parseLong(pathOrId);
      fileVO = fileSystemRepository.findById(id)
          .filter(v -> v.getScope().equals(scope) && v.getIdRef().equals(idRef))
          .orElse(null);
      
    } catch (NumberFormatException nfe) {
    }
    
    if (fileVO == null) {
      fileVO = fileSystemRepository.findByScopeAndIdRefAndPath(scope, idRef, pathOrId)
          .orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.FS_ENTITY_FILE_NOT_FOUND, 
              scope, idRef, pathOrId));
    }

    return fileVO;
  }

  @Override
  public FileContentDTO readFile(FileSystemScope scope, long idRef, String pathOrId) throws ApplicationException {
    checkFolderExists(scope, idRef);
    FileSystemVO fileVO = findFile(scope, idRef, pathOrId);
    
    try {
      return new FileContentDTO(fileVO);
    } catch (SQLException e) {
      logger.error("Errore nella lettura del BLOB per la risorsa FileSystemVO {}", fileVO.getId());
      throw makeGenericError("Errore nella lettura della risorsa richiesta");
    }
    
    
  }

  @Override
  public void deleteFile(FileSystemScope scope, long idRef, String pathOrId) throws ApplicationException {
    FileSystemVO fileVO = findFile(scope, idRef, pathOrId);
    BaseEntity entity = checkFolderExists(scope, idRef);
    switch(scope) {
    case TEMPLATE:
      TemplateVO template = (TemplateVO) entity;
      for (TemplateFileVO templateFile : template.getFiles()) {
        if (templateFile.getFile().equals(fileVO)) {
          throw makeError(HttpStatus.BAD_REQUEST, AppError.FS_PREVENT_DELETE_USED_FILE);
        }
      }
      break;
    case TEST:
      break;
    }
    
    fileSystemRepository.delete(fileVO);
    
  }

  @Override
  public List<Pair<FileSystemVO, FileSystemVO>> copyFilesThroughScope(FileSystemScope sourceScope, long sourceId, FileSystemScope targetScope,
      long targetId) throws ApplicationException {
    
    List<FileSystemVO> originalFiles = fileSystemRepository.findByScopeAndIdRef(sourceScope, sourceId);
    Map<String, FileSystemVO> targetMap = fileSystemRepository.findByScopeAndIdRef(targetScope, targetId)
      .stream().collect(Collectors.toMap(FileSystemVO::getPath, Function.identity()));
    ArrayList<Pair<FileSystemVO, FileSystemVO>> result = new ArrayList<>(originalFiles.size());
    
    
    for (FileSystemVO f: originalFiles) {
      FileSystemVO t = targetMap.get(f.getPath());
      if (t == null) {
        t = new FileSystemVO();
        t.init(getUsername());
        t.setScope(targetScope);
        t.setIdRef(targetId);
        t.setPath(f.getPath());
      }
      t.setContentType(f.getContentType());
      t.setContent(f.getContent());
      t = fileSystemRepository.save(t);
      result.add(Pair.of(f, t));
    }
    
    return result;
    
  }
  
  

  
  
}
