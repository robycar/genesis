package it.reply.genesis.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;

import it.reply.genesis.AppError;
import it.reply.genesis.api.files.payload.FileDTO;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.generic.service.AbstractService;
import it.reply.genesis.api.test.payload.TemplateCreateFullRequest;
import it.reply.genesis.api.test.payload.TemplateDTO;
import it.reply.genesis.api.test.payload.TemplateFileDTO;
import it.reply.genesis.api.test.payload.TemplateSearchRequest;
import it.reply.genesis.model.FileSystemScope;
import it.reply.genesis.model.FileSystemVO;
import it.reply.genesis.model.TemplateFileCategory;
import it.reply.genesis.model.TemplateFileVO;
import it.reply.genesis.model.TemplateVO;
import it.reply.genesis.model.repository.FileSystemRepository;
import it.reply.genesis.model.repository.TemplateRepository;
import it.reply.genesis.service.FileSystemService;
import it.reply.genesis.service.TemplateService;

@Service
@Transactional(rollbackFor = ApplicationException.class)
public class TemplateServiceImpl extends AbstractService implements TemplateService {

  @Autowired
  private TemplateRepository templateRepository;
  
  @Autowired
  private FileSystemRepository fileSystemRepository;
  
  @Override
  public TemplateDTO createTemplate(TemplateDTO dto) throws ApplicationException {
    
    logger.debug("enter createTemplate");
    
    Optional<TemplateVO> existing = templateRepository.findByNome(dto.getNome());
    if (existing.isPresent()) {
      throw makeError(HttpStatus.CONFLICT, AppError.TEMPLATE_NAME_ALRADY_EXISTS, dto.getNome());
    }
    
    TemplateVO vo = new TemplateVO();
    vo.init(currentUsername());
    vo.setDurata(dto.getDurata());
    vo.setNome(dto.getNome());
    vo.setTypeTemplate(dto.getTypeTemplate());
    vo.setDescrizione(dto.getDescrizione());
    vo.setGruppo(currentGroup());
    return new TemplateDTO(templateRepository.save(vo));
    
  }

  @Autowired
  private FileSystemService fileSystemService;
  
  @Override
  public TemplateDTO createAndPopulateTemplate(TemplateCreateFullRequest dto) throws ApplicationException {
    logger.debug("enter createAndPopulateTemplate");
    
    Optional<TemplateVO> existing = templateRepository.findByNome(dto.getNome());
    if (existing.isPresent()) {
      throw makeError(HttpStatus.CONFLICT, AppError.TEMPLATE_NAME_ALRADY_EXISTS, dto.getNome());
    }

    TemplateVO vo = new TemplateVO();
    vo.init(currentUsername());
    vo.setDurata(dto.getDurata());
    vo.setNome(dto.getNome());
    vo.setTypeTemplate(dto.getTypeTemplate());
    vo.setDescrizione(dto.getDescrizione());
    vo.setGruppo(currentGroup());
    
    vo = templateRepository.save(vo);
    
    
    List<FileDTO> folderDTO = null;
    //Aggiungo i file
    if (dto.getFile() != null) {
      logger.debug("storing {} files", dto.getFile().size());
      folderDTO = fileSystemService.upload(FileSystemScope.TEMPLATE, vo.getId(), dto.getFile());
    }

    //Collego chiamante chiamato ai file
    List<FileSystemVO> templateFolder = fileSystemRepository.findByScopeAndIdRef(FileSystemScope.TEMPLATE, vo.getId());
    Map<String, FileSystemVO> savedFiles = new HashMap<>();
    for (FileSystemVO fileVO: templateFolder) {
      savedFiles.put(fileVO.getPath(), fileVO);
    }
    
    if (vo.getFiles() == null) {
      vo.setFiles(new ArrayList<>(4));
    }
    
    HashSet<String> usedFiles = new HashSet<>(4);
    
    if (dto.getChiamato() != null) {
      FileSystemVO fileSystemVO = savedFiles.get(dto.getChiamato());
      if (fileSystemVO == null) {
        logger.error("Campo chiamato del template in fase di creazione fa riferimento ad un file inesistente: {}", dto.getChiamato());
        throw makeError(HttpStatus.NOT_FOUND, AppError.FS_FILE_NOT_FOUND, dto.getChiamato());
      }
      
      usedFiles.add(fileSystemVO.getPath());
      
      TemplateFileVO templateFileVO = new TemplateFileVO();
      templateFileVO.setCategory(TemplateFileCategory.CHIAMATO);
      templateFileVO.setFile(fileSystemVO);
      templateFileVO.setOrder(1);
      templateFileVO.setTemplate(vo);
      
      vo.getFiles().add(templateFileVO);

    }
    
    if (dto.getChiamanti() != null) {
      int order=1;
      for (String chiamante: dto.getChiamanti()) {
        FileSystemVO fileSystemVO = savedFiles.get(chiamante);
        if (fileSystemVO == null) {
          logger.error("Campo chiamante del template, in fase di creazione, fa riferimenti ad un file inesistente: {}" , chiamante);
          throw makeError(HttpStatus.NOT_FOUND, AppError.FS_FILE_NOT_FOUND, chiamante);
        }
        
        if (!usedFiles.add(fileSystemVO.getPath())) {
          logger.error("Campo chiamante del template, in fase di creazione, sta utilizzando lo stesso file utilizzato da un altro chiamante o dal chiamato: {}", fileSystemVO.getPath());
          throw makeError(HttpStatus.BAD_REQUEST, AppError.TEMPLATE_FILE_MULTIPLE_USE, fileSystemVO.getPath());
        }
        
        TemplateFileVO templateFileVO = new TemplateFileVO();
        templateFileVO.setCategory(TemplateFileCategory.CHIAMANTE);
        templateFileVO.setFile(fileSystemVO);
        templateFileVO.setOrder(order++);
        templateFileVO.setTemplate(vo);
        
        vo.getFiles().add(templateFileVO);
      }
    }
    
    vo = templateRepository.save(vo);
    
    TemplateDTO result = new TemplateDTO(vo);
    mapFileLinks(result, vo);
    result.setFolder(folderDTO);
    return result;
    
  }
  
  
  @Override
  public List<TemplateDTO> listTemplate() throws ApplicationException {
    logger.debug("enter listTemplate");
    
    return templateRepository.findAll(Sort.by(Direction.DESC, "id"))
        .stream()
        .map(vo -> new TemplateDTO(vo))
        .collect(Collectors.toList());
  }

  @Override
  public TemplateDTO updateTemplate(TemplateDTO dto) throws ApplicationException {
    
    logger.debug("ener updateTemplate");
    
    TemplateVO vo = readVO(dto.getId());
    checkGroup(vo.getGruppo(), AppError.TEMPLATE_EDIT_WRONG_GROUP);
    if (dto.getNome() != null && !dto.getNome().equals(vo.getNome())) {
      final Long levelId = vo.getId();
      Optional<Long> existingTemplateId = templateRepository.findByNome(dto.getNome())
          .filter(v -> !levelId.equals(v.getId()))
          .map(v -> v.getId());
      if (existingTemplateId.isPresent()) {
        throw makeError(HttpStatus.CONFLICT, AppError.TEMPLATE_NAME_ALRADY_EXISTS, existingTemplateId.get());
      }
      vo.setNome(dto.getNome());
    }
    checkVersion(vo, dto.getVersion(), "template", vo.getId());
    vo.modifiedBy(currentUsername());
    
    if (dto.getDurata() != null) {
      vo.setDurata(dto.getDurata());
    }
    
    if (dto.getTypeTemplate() != null) {
      vo.setTypeTemplate(dto.getTypeTemplate());
    }
    
    if (dto.getDescrizione() != null) {
      vo.setDescrizione(dto.getDescrizione());
    }
    
    if (dto.getFileLinks() != null) {
      List<FileSystemVO> templateFolder = fileSystemRepository.findByScopeAndIdRef(FileSystemScope.TEMPLATE, vo.getId());
      for (Map.Entry<String, List<TemplateFileDTO>> flEntry : dto.getFileLinks().entrySet()) {
        TemplateFileCategory category;
        try {
          category = TemplateFileCategory.valueOf(flEntry.getKey().toUpperCase());
        } catch (IllegalArgumentException iae) {
          throw makeError(HttpStatus.BAD_REQUEST, AppError.TEMPLATE_INVALID_FILE_CATEGORY_NAME, flEntry.getKey());
        }
        
        if (flEntry.getValue() != null) {
          updateFileLinks(vo, templateFolder, category, vo.getFiles(), flEntry.getValue());
        }
        
      }
    }
    
    //Verifico se tra chiamante e chiamato ci sia l'utilizzo dello stesso file
    HashSet<String> usedFiles = new HashSet<>(4);
    for (TemplateFileVO tf : vo.getFiles()) {
      if (!usedFiles.add(tf.getFile().getPath())) {
        throw makeError(HttpStatus.BAD_REQUEST, AppError.TEMPLATE_FILE_MULTIPLE_USE, tf.getFile().getPath());
      }
    }

    vo = templateRepository.saveAndFlush(vo);

    TemplateDTO result = new TemplateDTO(vo);
    mapFileLinks(result, vo);
    return result;
  }

  private void updateFileLinks(TemplateVO templateVO, List<FileSystemVO> folder, TemplateFileCategory category, List<TemplateFileVO> originalLinks, List<TemplateFileDTO> newLinksDTO) throws ApplicationException {
    int order = 1;
    int i=0;
    
    Map<Long, FileSystemVO> folderMap = folder.stream().collect(Collectors.toMap(FileSystemVO::getId, Function.identity()));
    
    logger.debug("Aggiorno i collegamenti per il template {} e categoria {}", templateVO.getId(), category);
    
    for (ListIterator<TemplateFileVO> it = originalLinks.listIterator(); it.hasNext();) {
      TemplateFileVO tfileVO = it.next();
      if (!category.equals(tfileVO.getCategory())) {
        continue;
      }
      if (i >= newLinksDTO.size()) {
        it.remove();
      } else {
        Long nuovoId = newLinksDTO.get(i).getId();
        if (nuovoId == null) {
          logger.error("Nella lista dei link dei file per il template {}, category {}, il link {} ha id nullo",
              templateVO.getId(), category, i);
          makeGenericError("Ricevuto link a file nullo");
        }
        
        if (!tfileVO.getFile().getId().equals(nuovoId)) {
          tfileVO.setFile(resolveFile(templateVO, folderMap, nuovoId));
        }
        
        tfileVO.setOrder(order++);
        ++i;
      }
    }
    while (i < newLinksDTO.size()) {
      Long nuovoId = newLinksDTO.get(i).getId();
      if (nuovoId == null) {
        logger.error("Nella lista dei link dei file per il template {}, category {}, il link {} ha id nullo",
            templateVO.getId(), category, i);
        makeGenericError("Ricevuto link a file nullo");
      }
      
      TemplateFileVO tfileVO = new TemplateFileVO();
      tfileVO.setFile(resolveFile(templateVO, folderMap, nuovoId));
      tfileVO.setTemplate(templateVO);
      tfileVO.setCategory(category);
      tfileVO.setOrder(order);
      
      originalLinks.add(tfileVO);
      
      ++i;
    }
    
    
  }

  private FileSystemVO resolveFile(TemplateVO templateVO, Map<Long, FileSystemVO> folderMap, long fileId) throws ApplicationException {
    FileSystemVO result = folderMap.get(fileId);
    if (result == null) {
      throw makeError(HttpStatus.NOT_FOUND, AppError.FS_FILE_NOT_FOUND, fileId);
    }
    return result;
  }

  @Override
  public TemplateVO readVO(long id) throws ApplicationException {
    Optional<TemplateVO> result = templateRepository.findById(id);
    return result.orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.TEMPLATE_NOT_FOUND, id));
  }

  @Override
  public TemplateDTO read(long id) throws ApplicationException {
    
    TemplateVO templateVO = readVO(id);
    List<FileSystemVO> folderVO = fileSystemRepository.findByScopeAndIdRef(FileSystemScope.TEMPLATE, id);

    List<FileDTO> folderDTO = folderVO.stream()
        .map(FileDTO::new)
        .collect(Collectors.toList());
    

    
    //leggi la directory del template
    TemplateDTO dto = new TemplateDTO(templateVO);
    dto.setFolder(folderDTO);
    mapFileLinks(dto, templateVO);

    return dto;
  }

  private void mapFileLinks(TemplateDTO templateDTO, TemplateVO templateVO) {
    if (templateVO.getFiles() != null) {
      LinkedMultiValueMap<String, TemplateFileDTO> fileLinks = new LinkedMultiValueMap<>();
      for (TemplateFileVO fileVO: templateVO.getFiles()) {
        fileLinks.add(fileVO.getCategory().name(), new TemplateFileDTO(fileVO));
      }
      templateDTO.setFileLinks(fileLinks);
    }
    
  }

  @Override
  public void removeTemplate(long id) throws ApplicationException {
    logger.debug("enter removeTemplate");
    
    TemplateVO templateVO = readVO(id);
    checkGroup(templateVO.getGruppo(), AppError.TEMPLATE_DELETE_WRONG_GROUP);
    templateRepository.delete(templateVO);
    fileSystemService.deleteFolder(FileSystemScope.TEMPLATE, id);
    //fileSystemRepository.deleteAllByScopeAndIdRef(FileSystemScope.TEMPLATE, templateVO.getId());
  }


  private static Predicate<TemplateFileVO> isChiamante() {
    return f -> f.getCategory().equals(TemplateFileCategory.CHIAMANTE);
  }
  
  private static Predicate<TemplateFileVO> isChiamato() {
    return f -> f.getCategory().equals(TemplateFileCategory.CHIAMATO);
  }
  
  @Override
  public List<TemplateDTO> search(TemplateSearchRequest dto) throws ApplicationException {
    logger.debug("enter search");
    TemplateVO vo = new TemplateVO();
    vo.setId(dto.getId());
    vo.setNome(dto.getNome());
    vo.setDurata(dto.getDurata());
    vo.setDescrizione(dto.getDescrizione());
    vo.setTypeTemplate(dto.getTypeTemplate());

    List<TemplateVO> result = templateRepository.findAll(Example.of(vo, 
        ExampleMatcher.matchingAll()
          .withIgnorePaths("version")
          ));

    Stream<TemplateVO> sresult = result.stream();

    //Restituisci solo i template che hanno il numero dei chiamanti indicati 
    // nella condizionedi ricerca
    if (dto.getNumChiamanti() != null) {
      sresult = sresult.filter( s -> 
        s.getFiles().stream().filter(isChiamante()).count() == dto.getNumChiamanti()
      );
    }
    
    if (dto.getNumChiamati() != null) {
      sresult = sresult.filter(s ->
        s.getFiles().stream().filter(isChiamato()).count() == dto.getNumChiamati()
      );
    }
    
    return sresult.map(s -> new TemplateDTO(s)).collect(Collectors.toList());
  }


  
}
