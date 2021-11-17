package it.reply.genesis.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
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
import it.reply.genesis.model.NaturaLinea;
import it.reply.genesis.model.TemplateLineaChiamanteVO;
import it.reply.genesis.model.TemplateVO;
import it.reply.genesis.model.TipoTemplateVO;
import it.reply.genesis.model.repository.FileSystemRepository;
import it.reply.genesis.model.repository.TemplateRepository;
import it.reply.genesis.model.repository.TipoTemplateRepository;
import it.reply.genesis.service.FileSystemService;
import it.reply.genesis.service.TemplateService;

@Service
@Transactional(rollbackFor = ApplicationException.class)
public class TemplateServiceImpl extends AbstractService implements TemplateService {

  @Autowired
  private TemplateRepository templateRepository;
  
  @Autowired
  private FileSystemRepository fileSystemRepository;
  
  @Autowired
  private TipoTemplateRepository tipoTemplateRepository;
  
  @Override
  public TemplateDTO createTemplate(TemplateDTO dto) throws ApplicationException {
    
    logger.debug("enter createTemplate");
    
    Optional<TemplateVO> existing = templateRepository.findByNome(dto.getNome());
    if (existing.isPresent()) {
      throw makeError(HttpStatus.CONFLICT, AppError.TEMPLATE_NAME_ALRADY_EXISTS, dto.getNome());
    }
    
    TipoTemplateVO tipoTemplate = readTipoTemplateVO(dto.getTypeTemplate());
    
    TemplateVO vo = new TemplateVO();
    vo.init(currentUsername());
    vo.setDurata(dto.getDurata());
    vo.setNome(dto.getNome());
    vo.setTypeTemplate(tipoTemplate);
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
    TipoTemplateVO tipoTemplate = readTipoTemplateVO(dto.getTypeTemplate());

    TemplateVO vo = new TemplateVO();
    vo.init(currentUsername());
    vo.setDurata(dto.getDurata());
    vo.setNome(dto.getNome());
    vo.setTypeTemplate(tipoTemplate);
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
    
    
//    if (vo.getFiles() == null) {
//      vo.setFiles(new ArrayList<>(4));
//    }
    
    HashSet<String> usedFiles = new HashSet<>(4);
    
    vo.setNaturaChiamato(dto.getNaturaChiamato());
    if (dto.getChiamato() != null) {
      FileSystemVO fileSystemVO = savedFiles.get(dto.getChiamato());
      if (fileSystemVO == null) {
        logger.error("Campo chiamato del template in fase di creazione fa riferimento ad un file inesistente: {}", dto.getChiamato());
        throw makeError(HttpStatus.NOT_FOUND, AppError.FS_FILE_NOT_FOUND, dto.getChiamato());
      }
      
      usedFiles.add(fileSystemVO.getPath());
      vo.setFileChiamato(fileSystemVO);
      if (vo.getNaturaChiamato() == null) {
        throw makeError(HttpStatus.BAD_REQUEST, AppError.TEMPLATE_NATURA_MISSING);
      }
    }
    
    if (dto.getChiamanti() != null) {
      if (vo.getChiamanti() == null) {
        vo.setChiamanti(new ArrayList<>(dto.getChiamanti().size()));
      }
      // verifica che la dimensione dei chiamanti e naturaChiamanti sia la stessa
      int naturaSize = dto.getNaturaChiamanti() == null ? 0 : dto.getNaturaChiamanti().size();
      if (naturaSize != dto.getChiamanti().size()) {
        logger.error("Le liste dei chiamanti e delle nature dei chiamanti non hanno la stessa dimensione. Chiamanti: {}, Nature: {}", dto.getChiamanti().size(), naturaSize);
        throw makeError(HttpStatus.BAD_REQUEST, AppError.TEMPLATE_NATURA_FILE_MISMATCH, dto.getChiamanti().size(), naturaSize);
      }

      for (int i=0; i < naturaSize; ++i) {
      //for (String chiamante: dto.getChiamanti()) {
        String chiamante = dto.getChiamanti().get(i);
        NaturaLinea natura = dto.getNaturaChiamanti().get(i);
        FileSystemVO fileSystemVO = savedFiles.get(chiamante);
        if (fileSystemVO == null) {
          logger.error("Campo chiamante del template, in fase di creazione, fa riferimenti ad un file inesistente: {}" , chiamante);
          throw makeError(HttpStatus.NOT_FOUND, AppError.FS_FILE_NOT_FOUND, chiamante);
        }
        
        if (!usedFiles.add(fileSystemVO.getPath())) {
          logger.error("Campo chiamante del template, in fase di creazione, sta utilizzando lo stesso file utilizzato da un altro chiamante o dal chiamato: {}", fileSystemVO.getPath());
          throw makeError(HttpStatus.BAD_REQUEST, AppError.TEMPLATE_FILE_MULTIPLE_USE, fileSystemVO.getPath());
        }
        
        TemplateLineaChiamanteVO lineaChiamanteVO = new TemplateLineaChiamanteVO();
        lineaChiamanteVO.setTemplate(vo);
        lineaChiamanteVO.setFile(fileSystemVO);
        lineaChiamanteVO.setNatura(natura);
        vo.getChiamanti().add(lineaChiamanteVO);
      }
    }
    
    vo = templateRepository.saveAndFlush(vo);
    
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
      vo.setTypeTemplate(readTipoTemplateVO(dto.getTypeTemplate()));
    }
    
    if (dto.getDescrizione() != null) {
      vo.setDescrizione(dto.getDescrizione());
    }
    
    if (dto.getFileLinks() != null || dto.getChiamato() != null || dto.getChiamanti() != null) {
      List<FileSystemVO> templateFolder = fileSystemRepository.findByScopeAndIdRef(FileSystemScope.TEMPLATE, vo.getId());
      Map<Long, FileSystemVO> folderMap = templateFolder.stream().collect(Collectors.toMap(FileSystemVO::getId, Function.identity()));
      TemplateFileDTO chiamatoDTO = null;
      
      if (dto.getChiamato() != null && dto.getChiamato().getId() != null) {
        chiamatoDTO = dto.getChiamato();
      } else {
        List<TemplateFileDTO> listaChiamatoDTO = dto.getFileLinks().get("CHIAMATO");
        if (listaChiamatoDTO != null && listaChiamatoDTO.size() > 0) {
          chiamatoDTO = listaChiamatoDTO.get(0);
        }
      }
      
      if (chiamatoDTO != null) {
        if (chiamatoDTO.getNatura() != null) {
          vo.setNaturaChiamato(chiamatoDTO.getNatura());
        }
        if (chiamatoDTO.getId() != null) {
          if (vo.getFileChiamato() == null || !Objects.equals(vo.getFileChiamato().getId(),chiamatoDTO.getId())) {
            vo.setFileChiamato(resolveFile(vo, folderMap, vo.getFileChiamato().getId()));
            if ( vo.getNaturaChiamato() == null ) {
              throw makeError(HttpStatus.BAD_REQUEST, AppError.TEMPLATE_NATURA_MISSING);
            }
          }
        }
      }
      
      List<TemplateFileDTO> chiamanti = dto.getChiamanti();
      if (chiamanti == null) {
        chiamanti = dto.getFileLinks().get("CHIAMANTE");
      }
      if (chiamanti != null) {
        updateFileLinks(vo, folderMap, vo.getChiamanti(), chiamanti);
      }
      
    }
    
//    if (dto.getFileLinks() != null) {
//      List<FileSystemVO> templateFolder = fileSystemRepository.findByScopeAndIdRef(FileSystemScope.TEMPLATE, vo.getId());
//      for (Map.Entry<String, List<TemplateFileDTO>> flEntry : dto.getFileLinks().entrySet()) {
//        TemplateFileCategory category;
//        try {
//          category = TemplateFileCategory.valueOf(flEntry.getKey().toUpperCase());
//        } catch (IllegalArgumentException iae) {
//          throw makeError(HttpStatus.BAD_REQUEST, AppError.TEMPLATE_INVALID_FILE_CATEGORY_NAME, flEntry.getKey());
//        }
//        
//        if (flEntry.getValue() != null) {
//          updateFileLinks(vo, templateFolder, category, vo.getFiles(), flEntry.getValue());
//        }
//        
//      }
//    }
    
    //Verifico se tra chiamante e chiamato ci sia l'utilizzo dello stesso file
    HashSet<String> usedFiles = new HashSet<>(4);
    if (vo.getFileChiamato() != null) {
      usedFiles.add(vo.getFileChiamato().getPath());
    }
    for (TemplateLineaChiamanteVO tf : vo.getChiamanti()) {
      if (!usedFiles.add(tf.getFile().getPath())) {
        throw makeError(HttpStatus.BAD_REQUEST, AppError.TEMPLATE_FILE_MULTIPLE_USE, tf.getFile().getPath());
      }
    }

    vo = templateRepository.saveAndFlush(vo);

    TemplateDTO result = new TemplateDTO(vo);
    mapFileLinks(result, vo);
    return result;
  }

  private void updateFileLinks(TemplateVO templateVO, Map<Long, FileSystemVO> folderMap, List<TemplateLineaChiamanteVO> originalLinks, List<TemplateFileDTO> newLinksDTO) throws ApplicationException {
    int i=0;
    
    //Map<Long, FileSystemVO> folderMap = folder.stream().collect(Collectors.toMap(FileSystemVO::getId, Function.identity()));
    
    logger.debug("Aggiorno i collegamenti per il template {} e categoria CHIAMANTE", templateVO.getId());
    
    for (ListIterator<TemplateLineaChiamanteVO> it = originalLinks.listIterator(); it.hasNext();) {
      TemplateLineaChiamanteVO tfileVO = it.next();
      if (i >= newLinksDTO.size()) {
        it.remove();
      } else {
        Long nuovoId = newLinksDTO.get(i).getId();
        if (nuovoId == null) {
          logger.error("Nella lista dei chiamanti per il template {} il link {} ha id nullo",
              templateVO.getId(), i);
          makeGenericError("Ricevuto link a file nullo");
        }
        
        if (!tfileVO.getFile().getId().equals(nuovoId)) {
          tfileVO.setFile(resolveFile(templateVO, folderMap, nuovoId));
        }
        ++i;
      }
    }
    while (i < newLinksDTO.size()) {
      Long nuovoId = newLinksDTO.get(i).getId();
      if (nuovoId == null) {
        logger.error("Nella lista dei link dei file per il template {}, il link {} ha id nullo",
            templateVO.getId(), i);
        makeGenericError("Ricevuto link a file nullo");
      }
      
      TemplateLineaChiamanteVO tfileVO = new TemplateLineaChiamanteVO();
      tfileVO.setFile(resolveFile(templateVO, folderMap, nuovoId));
      tfileVO.setTemplate(templateVO);
      NaturaLinea natura = newLinksDTO.get(i).getNatura();
      if (natura == null) {
        makeError(HttpStatus.BAD_REQUEST, AppError.TEMPLATE_NATURA_MISSING);
      }
      tfileVO.setNatura(natura);
      
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

  private TipoTemplateVO readTipoTemplateVO(String nome) throws ApplicationException {
    Optional<TipoTemplateVO> result = tipoTemplateRepository.findById(nome);
    return result.orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.TIPO_TEMPLATE_NOT_FOUND, nome));
    
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
    LinkedMultiValueMap<String, TemplateFileDTO> fileLinks = new LinkedMultiValueMap<>();
    if (templateVO.getFileChiamato() != null) {
      templateDTO.setChiamato(new TemplateFileDTO(templateVO.getFileChiamato(), templateVO.getNaturaChiamato()));
      fileLinks.add("CHIAMATO", templateDTO.getChiamato() );
    }
    
    if (templateVO.getChiamanti() != null) {
    //if (templateVO.getFiles() != null) {
      templateDTO.setChiamanti(templateVO.getChiamanti()
        .stream()
        .map(TemplateFileDTO::new)
        .collect(Collectors.toList()));
      for (TemplateLineaChiamanteVO fileVO: templateVO.getChiamanti()) {
        fileLinks.add("CHIAMANTE", new TemplateFileDTO(fileVO));
      }
    }
    templateDTO.setFileLinks(fileLinks);
    
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


//  private static Predicate<TemplateFileVO> isChiamante() {
//    return f -> f.getCategory().equals(TemplateFileCategory.CHIAMANTE);
//  }
//  
//  private static Predicate<TemplateFileVO> isChiamato() {
//    return f -> f.getCategory().equals(TemplateFileCategory.CHIAMATO);
//  }
  
  @Override
  public List<TemplateDTO> search(TemplateSearchRequest dto) throws ApplicationException {
    logger.debug("enter search");
    TemplateVO vo = new TemplateVO();
    vo.setId(dto.getId());
    vo.setNome(dto.getNome());
    vo.setDurata(dto.getDurata());
    vo.setDescrizione(dto.getDescrizione());
    vo.setNaturaChiamato(dto.getNaturaChiamato());
    
    if (dto.getTypeTemplate() != null) {
      vo.setTypeTemplate(tipoTemplateRepository.findById(dto.getTypeTemplate()).orElse(null));
    }
    

    List<TemplateVO> result = templateRepository.findAll(Example.of(vo, 
        ExampleMatcher.matchingAll()
          .withIgnorePaths("version")
          ));

    Stream<TemplateVO> sresult = result.stream();

//    //Restituisci solo i template che hanno il numero dei chiamanti indicati 
      // e la stessa natura

    if (dto.getNaturaChiamanti() != null) {
      sresult = sresult.filter(s -> {
        if (s.getChiamanti().size() != dto.getNaturaChiamanti().size()) {
          return false;
        }
        Iterator<TemplateLineaChiamanteVO> itVO = s.getChiamanti().iterator();
        Iterator<NaturaLinea> itDTO = dto.getNaturaChiamanti().iterator();
        while (itVO.hasNext()) {
          if (!itVO.next().getNatura().equals(itDTO.next())) {
            return false;
          }
        }
        return true;
      });
          
    }
    
    return sresult.map(TemplateDTO::new).collect(Collectors.toList());
  }


  @Override
  public List<String> typeList() throws ApplicationException {
    logger.debug("enter typeList");
    List<TipoTemplateVO> result = tipoTemplateRepository.findAll(Sort.by("nome"));
    return result.stream()
        .map(TipoTemplateVO::getNome)
        .collect(Collectors.toList());
  }

  
}
