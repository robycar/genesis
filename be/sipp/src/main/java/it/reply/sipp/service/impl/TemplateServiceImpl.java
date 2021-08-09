package it.reply.sipp.service.impl;

import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;

import it.reply.sipp.AppError;
import it.reply.sipp.api.files.payload.FileDTO;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.generic.service.AbstractService;
import it.reply.sipp.api.test.payload.TemplateDTO;
import it.reply.sipp.api.test.payload.TemplateFileDTO;
import it.reply.sipp.model.FileSystemScope;
import it.reply.sipp.model.FileSystemVO;
import it.reply.sipp.model.TemplateFileCategory;
import it.reply.sipp.model.TemplateFileVO;
import it.reply.sipp.model.TemplateVO;
import it.reply.sipp.model.repository.FileSystemRepository;
import it.reply.sipp.model.repository.TemplateRepository;
import it.reply.sipp.service.TemplateService;

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
    vo.init(getUsername());
    vo.setDurata(dto.getDurata());
    vo.setNome(dto.getNome());
    vo.setTypeTemplate(dto.getTypeTemplate());
    vo.setDescrizione(dto.getDescrizione());

    return new TemplateDTO(templateRepository.save(vo));
    
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
    vo.modifiedBy(getUsername());
    
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

  private TemplateVO readVO(long id) throws ApplicationException {
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
    templateRepository.delete(templateVO);
    fileSystemRepository.deleteAllByScopeAndIdRef(FileSystemScope.TEMPLATE, templateVO.getId());
  }
  
}
