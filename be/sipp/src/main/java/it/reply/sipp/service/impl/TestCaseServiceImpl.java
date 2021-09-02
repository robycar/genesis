package it.reply.sipp.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.reply.sipp.AppError;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.generic.service.AbstractService;
import it.reply.sipp.api.test.payload.TestCaseDTO;
import it.reply.sipp.api.test.payload.TestCaseLineaDTO;
import it.reply.sipp.model.FileSystemScope;
import it.reply.sipp.model.FileSystemVO;
import it.reply.sipp.model.TemplateFileCategory;
import it.reply.sipp.model.TemplateFileVO;
import it.reply.sipp.model.TemplateVO;
import it.reply.sipp.model.TestCaseLineaChiamanteVO;
import it.reply.sipp.model.TestCaseVO;
import it.reply.sipp.model.repository.TestCaseLineaChiamanteRepository;
import it.reply.sipp.model.repository.TestCaseRepository;
import it.reply.sipp.service.FileSystemService;
import it.reply.sipp.service.LineaService;
import it.reply.sipp.service.OBPService;
import it.reply.sipp.service.TemplateService;
import it.reply.sipp.service.TestCaseService;

@Service
@Transactional(rollbackFor = ApplicationException.class)
public class TestCaseServiceImpl extends AbstractService implements TestCaseService {

  @Autowired
  private TestCaseRepository testCaseRepository;
  
  @Autowired
  private TemplateService templateService;
  
  @Autowired
  private LineaService lineaService;
  
  @Autowired
  private OBPService oBPService;
  
  @Autowired
  private FileSystemService fileSystemService;
  
  @Autowired
  private TestCaseLineaChiamanteRepository testCaseLineaChiamanteRepository;
  
  public TestCaseServiceImpl() {
  }

  @Override
  public List<TestCaseDTO> listTestCase() throws ApplicationException {
    logger.debug("enter listTestCase");
    List<TestCaseVO> listVO = testCaseRepository.findAll(Sort.by(Direction.DESC, "id"));
    return listVO.stream()
        .map(vo -> new TestCaseDTO(vo))
        .collect(Collectors.toList());
  }

  @Override
  public TestCaseDTO createTestCase(TestCaseDTO dto) throws ApplicationException {
    
    TemplateVO templateVO = templateService.readVO(dto.getTemplate().getId());
    
    Optional<TestCaseVO> ovo = testCaseRepository.findByNome(dto.getNome());
    if (ovo.isPresent()) {
      throw makeError(HttpStatus.CONFLICT, AppError.TEST_CASE_ALRADY_EXISTS, dto.getNome());
    }
    
    long numLinee = templateVO.getFiles().stream().filter(tvo -> tvo.getCategory().equals(TemplateFileCategory.CHIAMANTE)).count();
    int numLineeDTO = dto.getChiamanti() == null ? 0 : dto.getChiamanti().size();
    if (numLineeDTO < numLinee) {
      throw makeError(HttpStatus.BAD_REQUEST, AppError.TEST_CASE_LINEA_CHIAMANTE_MISSING, numLineeDTO+1);
    }
    
    
    TestCaseVO vo = new TestCaseVO();
    vo.setTemplate(templateVO);
    vo.init(currentUsername());
    vo.setGruppo(currentGroup());
    vo.setNome(dto.getNome());
    vo.setDescrizione(dto.getDescrizione());
    
    vo.setExpectedDuration(dto.getExpectedDuration() == null ? templateVO.getDurata() : dto.getExpectedDuration());
    TestCaseLineaDTO chiamatoDTO = dto.getChiamato();
    if (chiamatoDTO.getLinea() != null) {
      vo.setLineaChiamato(lineaService.readLineaVO(chiamatoDTO.getLinea().getId()));
    }
    if (chiamatoDTO.getProxy() != null) {
      vo.setObpChiamato(oBPService.readProxyVO(chiamatoDTO.getProxy().getId()));
    }
    
    vo = testCaseRepository.saveAndFlush(vo);
    //Copiare i file dal template
    
    Map<Long, FileSystemVO> fileCopiati = fileSystemService.copyFilesThroughScope(FileSystemScope.TEMPLATE, templateVO.getId(), FileSystemScope.TEST, vo.getId())
    .stream().collect(Collectors.toMap(p -> p.getFirst().getId(), Pair::getSecond));
    ;
    logger.debug("Copiati {} file dal template {},{}", fileCopiati.size(), templateVO.getId(), templateVO.getNome());
    
//    if (chiamatoDTO.getFile() != null) {
//      vo.setFileChiamato(findCopiedFile(fileCopiati, chiamatoDTO.getFile(), templateVO));
//    }
    
    List<TestCaseLineaChiamanteVO> chiamantiVO = new ArrayList<>(3);
    short numLinea = 1;
    for (TemplateFileVO tfVO: templateVO.getFiles()) {
      if (tfVO.getCategory().equals(TemplateFileCategory.CHIAMATO)) {
        if ( vo.getFileChiamato() == null) {
          vo.setFileChiamato(findCopiedFile(fileCopiati, tfVO, templateVO));
        }
      } else {
        TestCaseLineaChiamanteVO chiamanteVO = new TestCaseLineaChiamanteVO();
        chiamanteVO.setTestCase(vo);
        chiamanteVO.setNumLinea(numLinea++);
        chiamanteVO.setFile(findCopiedFile(fileCopiati, tfVO, templateVO));
        chiamantiVO.add(chiamanteVO);
      }
    }
    
    if (dto.getChiamanti() != null) {
      int index = 0;
      for (TestCaseLineaDTO chiamanteDTO: dto.getChiamanti()) {
        if (index >= chiamantiVO.size()) {
          throw makeError(HttpStatus.BAD_REQUEST, AppError.TEST_CASE_LINEA_CHIAMANTE_OVERFLOW, index, chiamantiVO.size());
        }
        TestCaseLineaChiamanteVO chiamanteVO = chiamantiVO.get(index++);
        if (chiamanteDTO.getLinea() != null && chiamanteDTO.getLinea().getId() != null) {
          chiamanteVO.setLinea(lineaService.readLineaVO(chiamanteDTO.getLinea().getId()));
        }
        if (chiamanteDTO.getProxy() != null && chiamanteDTO.getProxy().getId() != null) {
          chiamanteVO.setOutboundProxy(oBPService.readProxyVO(chiamanteDTO.getProxy().getId()));
        }
        chiamantiVO.add(chiamanteVO);
      }
    }
    
    
    if (chiamantiVO.size() > 0) {
      for (TestCaseLineaChiamanteVO chiamanteVO: chiamantiVO) {
        if (chiamanteVO.getLinea() == null) {
          throw makeError(HttpStatus.BAD_REQUEST, AppError.TEST_CASE_LINEA_CHIAMANTE_MISSING, chiamanteVO.getNumLinea());
        }
      }
      vo.setLineeChiamanti(testCaseLineaChiamanteRepository.saveAll(chiamantiVO));
    }
    
    vo = testCaseRepository.saveAndFlush(vo);
    
    return new TestCaseDTO(vo, true);
  }

  private FileSystemVO findCopiedFile(Map<Long, FileSystemVO> fileCopiati, TemplateFileVO file, TemplateVO templateVO) throws ApplicationException {
    if (file == null || file.getFile() == null) {
      return null;
    }
    FileSystemVO targetFile = fileCopiati.get(file.getFile().getId());
    if (targetFile == null) {
      logger.error("Impossibile trovare un riferimento al file del template {} con id {}", 
          templateVO.getId(), file.getFile().getId());
      throw makeError(HttpStatus.NOT_FOUND, AppError.FS_ENTITY_FILE_NOT_FOUND, templateVO.getId(), file.getFile().getId());
    }
    return targetFile;
  }

  @Override
  public void removeTestCase(long id) throws ApplicationException {
    logger.debug("enter removeTestCase");
    TestCaseVO testCaseVO = readVO(id);
    checkGroup(testCaseVO.getGruppo(), AppError.TEST_CASE_DELETE_WRONG_GROUP);
    
    testCaseRepository.delete(testCaseVO);
  }

  private TestCaseVO readVO(long id) throws ApplicationException {
    return testCaseRepository.findById(id)
        .orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.TEST_CASE_NOT_FOUND, id));
  }

  @Override
  public TestCaseDTO read(long id) throws ApplicationException {
    logger.debug("enter read");
    TestCaseVO vo = readVO(id);
    
    return new TestCaseDTO(vo, true);
  }

  @Override
  public TestCaseDTO updateTestCase(TestCaseDTO dto) throws ApplicationException {
    logger.debug("enter updateTestCase");
    
    TestCaseVO vo = readVO(dto.getId());
    checkGroup(vo.getGruppo(), AppError.TEST_CASE_EDIT_WRONG_GROUP);
    checkVersion(vo, dto.getVersion(), "TestCaseVO", vo.getId());
    if (dto.getChiamanti() != null) {
      if (dto.getChiamanti().size() > vo.getLineeChiamanti().size()) {
        throw makeError(HttpStatus.BAD_REQUEST, AppError.TEST_CASE_LINEA_CHIAMANTE_OVERFLOW, dto.getChiamanti().size(), vo.getLineeChiamanti().size());
      }
      int index = 0;
      for (TestCaseLineaDTO chiamanteDTO: dto.getChiamanti()) {
        TestCaseLineaChiamanteVO chiamanteVO = vo.getLineeChiamanti().get(index);
        if (chiamanteDTO.getLinea() != null && chiamanteDTO.getLinea().getId() != null) {
          chiamanteVO.setLinea(lineaService.readLineaVO(chiamanteDTO.getLinea().getId()));
        }
        if (chiamanteDTO.getProxy() != null && chiamanteDTO.getProxy().getId() != null) {
          chiamanteVO.setOutboundProxy(oBPService.readProxyVO(chiamanteDTO.getProxy().getId()));
        }
        
        ++index;
      }
    }
    TestCaseLineaDTO chiamatoDTO = dto.getChiamato(); 
    if (chiamatoDTO != null) {
      if (chiamatoDTO.getLinea() != null && chiamatoDTO.getLinea().getId() != null) {
        vo.setLineaChiamato(lineaService.readLineaVO(chiamatoDTO.getLinea().getId()));
      }
      if (chiamatoDTO.getProxy() != null && chiamatoDTO.getProxy().getId() != null) {
        vo.setObpChiamato(oBPService.readProxyVO(chiamatoDTO.getProxy().getId()));
      }
    }
      
    if (dto.getNome() != null && !dto.getNome().equals(vo.getNome())) {
      Optional<Long> existingTestCaseId = testCaseRepository.findByNome(dto.getNome())
          .map(TestCaseVO::getId)
          .filter(Predicate.not(Predicate.isEqual(vo.getId())));
      if (existingTestCaseId.isPresent()) {
        throw makeError(HttpStatus.CONFLICT, AppError.TEST_CASE_ALRADY_EXISTS, dto.getNome());
      }
      vo.setNome(dto.getNome());
    }
    if (dto.getDescrizione() != null) {
      vo.setDescrizione(dto.getDescrizione());
    }
    if (dto.getExpectedDuration() != null) {
      vo.setExpectedDuration(dto.getExpectedDuration());
    }

    vo.modifiedBy(currentUsername());
    
    vo = testCaseRepository.saveAndFlush(vo);
    
    return new TestCaseDTO(vo, true);
  }

}
