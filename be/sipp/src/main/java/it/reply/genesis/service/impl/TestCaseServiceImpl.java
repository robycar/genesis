package it.reply.genesis.service.impl;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.reply.genesis.AppError;
import it.reply.genesis.agent.internal.impl.InternalAgent;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.generic.service.AbstractService;
import it.reply.genesis.api.test.payload.TestCaseCaricatoDTO;
import it.reply.genesis.api.test.payload.TestCaseDTO;
import it.reply.genesis.api.test.payload.TestCaseLineaDTO;
import it.reply.genesis.model.FileSystemScope;
import it.reply.genesis.model.FileSystemVO;
import it.reply.genesis.model.LineaVO;
import it.reply.genesis.model.OutboundProxyVO;
import it.reply.genesis.model.TemplateFileCategory;
import it.reply.genesis.model.TemplateFileVO;
import it.reply.genesis.model.TemplateVO;
import it.reply.genesis.model.TestCaseCaricatoLineaChiamanteVO;
import it.reply.genesis.model.TestCaseCaricatoStato;
import it.reply.genesis.model.TestCaseCaricatoVO;
import it.reply.genesis.model.TestCaseLineaChiamanteVO;
import it.reply.genesis.model.TestCaseVO;
import it.reply.genesis.model.repository.TestCaseCaricatoLineaChiamanteRepository;
import it.reply.genesis.model.repository.TestCaseCaricatoRepository;
import it.reply.genesis.model.repository.TestCaseLineaChiamanteRepository;
import it.reply.genesis.model.repository.TestCaseRepository;
import it.reply.genesis.service.FileSystemService;
import it.reply.genesis.service.LineaService;
import it.reply.genesis.service.OBPService;
import it.reply.genesis.service.TemplateService;
import it.reply.genesis.service.TestCaseService;
import it.reply.genesis.service.dto.TestListType;

@Service
@Transactional(rollbackFor = ApplicationException.class)
public class TestCaseServiceImpl extends AbstractService implements TestCaseService {

  @Autowired
  private TestCaseRepository testCaseRepository;
  
  @Autowired
  private TestCaseCaricatoRepository testCaseCaricatoRepository;

  @Autowired
  private TestCaseCaricatoLineaChiamanteRepository testCaseCaricatoLineaChiamanteRepository;

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
  
  @Autowired
  private InternalAgent internalAgent;

  public TestCaseServiceImpl() {
  }

  @Override
  public List<TestCaseDTO> listTestCase() throws ApplicationException {
    logger.debug("enter listTestCase");
    List<TestCaseVO> listVO = testCaseRepository.findAll(Sort.by(Direction.DESC, "id"));
    return listVO.stream()
        .map(vo -> new TestCaseDTO(vo, true))
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
  
  private FileSystemVO findCopiedFile(Map<Long, FileSystemVO> fileCopiati, FileSystemVO srcFileId, String folderName) throws ApplicationException {
    if (srcFileId == null) {
      return null;
    }
    FileSystemVO targetFile = fileCopiati.get(srcFileId.getId());
    if (targetFile == null) {
      logger.error("Impossibile trovare un riferimento al file copiato con id {} per la copia in ", srcFileId.getId(), folderName);
      throw makeError(HttpStatus.NOT_FOUND, AppError.FS_ENTITY_FILE_NOT_FOUND, folderName, srcFileId.getId());
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

  @Override
  public TestCaseVO readVO(long id) throws ApplicationException {
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

  @Override
  public List<Long> findTestCaseIdUsingLine(LineaVO lineaVO) {
    logger.debug("enter findTestCaseUsingLine");
    Set<Long> testCasePerChiamato = testCaseRepository.findIdByLineaChiamato(lineaVO);
    
    Set<Long> result = testCaseRepository.findIdByLineaChiamante(lineaVO);
    result.addAll(testCasePerChiamato);
    
    return new ArrayList<>(result);
  }

  @Override
  public List<Long> findTestCaseIdUsingProxy(OutboundProxyVO proxyVO) {
    logger.debug("enter findTestIdCaseUsingProxy");
    Set<Long> testCasePerChiamato = testCaseRepository.findIdByObpChiamato(proxyVO);
    
    Set<Long> result = testCaseRepository.findIdByObpChiamante(proxyVO);
    result.addAll(testCasePerChiamato);
    
    return new ArrayList<>(result);
  }

  @Override
  public TestCaseCaricatoDTO loadTestCase(long id) throws ApplicationException {
    logger.debug("enter loadTestCase");
    TestCaseVO tcvo = readVO(id);
    
    TestCaseCaricatoVO vo = new TestCaseCaricatoVO();
    vo.setDescrizione(tcvo.getDescrizione());
    vo.setExpectedDuration(tcvo.getExpectedDuration());
    vo.setGruppo(currentGroup());
    vo.setLineaChiamato(tcvo.getLineaChiamato());
    vo.setLoadedBy(currentUsername());
    //vo.setLoadedWhen(null);
    vo.setNome(tcvo.getNome());
    vo.setObpChiamato(tcvo.getObpChiamato());
    vo.setStato(TestCaseCaricatoStato.READY);
    vo.setTemplate(tcvo.getTemplate());
    vo.setTestCase(tcvo);
    //vo.setVersion(0);
    
    vo = testCaseCaricatoRepository.save(vo);
    
    //Copia i file dal test case al test case caricato
    logger.debug("Copia dei file dal test case al test case caricato");
    Map<Long, FileSystemVO> fileCopiati = fileSystemService.copyFilesThroughScope(FileSystemScope.TEST, tcvo.getId(), FileSystemScope.TEST_CARICATO, vo.getId())
    .stream().collect(Collectors.toMap(p -> p.getFirst().getId(), Pair::getSecond));
    
    String folderName = FileSystemScope.TEST_CARICATO.name() + "/" + vo.getId();
    if (tcvo.getLineeChiamanti() != null) {
      ArrayList<TestCaseCaricatoLineaChiamanteVO> tccLineeChiamanti = new ArrayList<>(tcvo.getLineeChiamanti().size());
      for (TestCaseLineaChiamanteVO lc: tcvo.getLineeChiamanti()) {
        TestCaseCaricatoLineaChiamanteVO tcclc = new TestCaseCaricatoLineaChiamanteVO();
        tcclc.setTestCaseCaricato(vo);
        tcclc.setNumLinea(lc.getNumLinea());
        tcclc.setLinea(lc.getLinea());
        tcclc.setOutboundProxy(lc.getOutboundProxy());
        tcclc.setFile(findCopiedFile(fileCopiati, tcvo.getFileChiamato(), folderName));
        tccLineeChiamanti.add(tcclc);
      }
      if (!tccLineeChiamanti.isEmpty()) {
        vo.setLineeChiamanti(testCaseCaricatoLineaChiamanteRepository.saveAll(tccLineeChiamanti));
      }
    }
    
    if (tcvo.getFileChiamato() != null) {
      vo.setFileChiamato(findCopiedFile(fileCopiati, tcvo.getFileChiamato(), folderName));
    }
    
    testCaseCaricatoRepository.saveAndFlush(vo);
    
    return new TestCaseCaricatoDTO(vo, true, true).assignFolder(fileCopiati.values());
  }

  @Override
  public List<TestCaseCaricatoDTO> readTestCaricatiOfType(TestListType inclusion) throws ApplicationException {
    
    TestCaseCaricatoStato stato;
    switch (inclusion) {
    case COMPLETED: 
      stato = TestCaseCaricatoStato.COMPLETED;
      break;
    case READY:
      stato = TestCaseCaricatoStato.READY;
      break;
    case RUNNING:
      stato = TestCaseCaricatoStato.RUNNING;
      break;
    case WAITING:
      stato = TestCaseCaricatoStato.WAITING;
      break;
    default:
      return Collections.emptyList();
    }
    
    List<TestCaseCaricatoVO> result = testCaseCaricatoRepository.findByStato(stato, Sort.by(Direction.DESC, "id"));

    return result.stream()
        .map(TestCaseCaricatoDTO::new)
        .collect(Collectors.toList());
  }

  @Override
  public void runLoaded(long id) throws ApplicationException {
    TestCaseCaricatoVO vo = readCaricatoVO(id, true);
    //Verifica che lo stato sia ready
    checkStatoOfTestCaseCaricato(vo, TestCaseCaricatoStato.READY);
    
    vo.setStato(TestCaseCaricatoStato.WAITING);
    vo.setStartDate(Instant.now());
    vo.setStartedBy(currentUsername());

    testCaseCaricatoRepository.save(vo);
    
    internalAgent.runTestCaseIfQueueEmpty(vo);
    testCaseCaricatoRepository.flush();
  }

  public void checkStatoOfTestCaseCaricato(TestCaseCaricatoVO vo, TestCaseCaricatoStato statoAtteso) throws ApplicationException {
    if (!statoAtteso.equals(vo.getStato())) {
      throw makeError(HttpStatus.BAD_REQUEST, AppError.TEST_CASE_CARICATO_WRONG_STATE, vo.getId(), vo.getStato(), statoAtteso);
    }
  }

  private TestCaseCaricatoVO readCaricatoVO(long id) throws ApplicationException {
    return readCaricatoVO(id, false);
  }
  
  private TestCaseCaricatoVO readCaricatoVO(long id, boolean locking) throws ApplicationException {
    Optional<TestCaseCaricatoVO> result;
    if (locking) {
      result = testCaseCaricatoRepository.findByIdLocking(id);
    } else {
      result = testCaseCaricatoRepository.findById(id);
    }
    
    return result.orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.TEST_CASE_CARICATO_NOT_FOUND, id));

  }

}
