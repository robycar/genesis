package it.reply.genesis.service.impl;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import it.reply.genesis.AppError;
import it.reply.genesis.agent.internal.impl.SingleThreadSingleTestExecutor;
import it.reply.genesis.api.dashboard.payload.RiepilogoNumericoTestDTO;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.generic.service.AbstractService;
import it.reply.genesis.api.test.payload.TestCaseCaricatoDTO;
import it.reply.genesis.api.test.payload.TestCaseDTO;
import it.reply.genesis.api.test.payload.TestCaseLineaDTO;
import it.reply.genesis.model.ExecutionResult;
import it.reply.genesis.model.FileSystemScope;
import it.reply.genesis.model.FileSystemVO;
import it.reply.genesis.model.LineaVO;
import it.reply.genesis.model.LoadedEntityStatus;
import it.reply.genesis.model.OutboundProxyVO;
import it.reply.genesis.model.TemplateFileCategory;
import it.reply.genesis.model.TemplateFileVO;
import it.reply.genesis.model.TemplateVO;
import it.reply.genesis.model.TestCaseCaricatoLineaChiamanteVO;
import it.reply.genesis.model.TestCaseCaricatoPropertyVO;
import it.reply.genesis.model.TestCaseCaricatoVO;
import it.reply.genesis.model.TestCaseLineaChiamanteVO;
import it.reply.genesis.model.TestCaseVO;
import it.reply.genesis.model.TestSuiteCaricataVO;
import it.reply.genesis.model.repository.IdProjection;
import it.reply.genesis.model.repository.TestCaseCaricatoLineaChiamanteRepository;
import it.reply.genesis.model.repository.TestCaseCaricatoPropertyRepository;
import it.reply.genesis.model.repository.TestCaseCaricatoRepository;
import it.reply.genesis.model.repository.TestCaseCaricatoRepository.StatoTest;
import it.reply.genesis.model.repository.TestCaseLineaChiamanteRepository;
import it.reply.genesis.model.repository.TestCaseRepository;
import it.reply.genesis.service.FileSystemService;
import it.reply.genesis.service.LineaService;
import it.reply.genesis.service.OBPService;
import it.reply.genesis.service.TemplateService;
import it.reply.genesis.service.TestCaseService;
import it.reply.genesis.service.dto.ScheduleInfo;
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
  private TestCaseCaricatoPropertyRepository testCaseCaricatoPropertyRepository;

  @Autowired
  private SingleThreadSingleTestExecutor internalTestExecutor;

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
    
//    Optional<TestCaseVO> ovo = testCaseRepository.findByNome(dto.getNome());
//    if (ovo.isPresent()) {
//      throw makeError(HttpStatus.CONFLICT, AppError.TEST_CASE_ALRADY_EXISTS, dto.getNome());
//    }
    
    long numLinee = templateVO.getFiles().stream().filter(tvo -> tvo.getCategory().equals(TemplateFileCategory.CHIAMANTE)).count();
    int numLineeDTO = dto.getChiamanti() == null ? 0 : dto.getChiamanti().size();
    if (numLineeDTO < numLinee) {
      throw makeError(HttpStatus.BAD_REQUEST, AppError.TEST_CASE_LINEA_CHIAMANTE_MISSING, numLineeDTO+1);
    }
    
    
    TestCaseVO vo = new TestCaseVO();
    vo.setTemplate(templateVO);
    vo.init(currentUsername());
    vo.setGruppo(currentGroup());
    {
      StringBuilder sb = new StringBuilder(TestCaseVO.NOME_LENGTH + 40);
      sb.append(UUID.randomUUID().toString())
        .append(dto.getNome());
      if (sb.length() > TestCaseVO.NOME_LENGTH + 10)
        sb.delete(TestCaseVO.NOME_LENGTH + 9, sb.length());
      vo.setNome(sb.toString());
    }
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
    vo.setNome(dto.getNome() + "_" + vo.getId());
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
  public TestCaseCaricatoDTO updateTestCaseCaricato(TestCaseCaricatoDTO dto) throws ApplicationException {
    logger.debug("enter updateTestCaseCaricato");
    
    TestCaseCaricatoVO vo = readCaricatoVO(dto.getId(), true);
    //checkVersion(vo, dto.getVersion(), "TestCaseCaricatoVO, vo.getId());
    if (dto.getEndDate() != null) {
      vo.setEndDate(dto.getEndDate());
    }
    if (dto.getPathInstance() != null) {
      vo.setPathInstance(dto.getPathInstance());
    }
    if (dto.getResult() != null) {
      vo.setResult(dto.getResult());
    }
    if (dto.getStartDate() != null) {
      vo.setStartDate(dto.getStartDate());
    }
    if (dto.getStartedBy() != null) {
      vo.setStartedBy(dto.getStartedBy());
    }
    if (dto.getStato() != null) {
      vo.setStato(dto.getStato());
    }
    
    if (dto.getScheduleDateTime() != null) {
      vo.setScheduleDateTime(dto.getScheduleDateTime());
    }
    
    if (dto.getDelay() != null) {
      vo.setDelay(dto.getDelay());
    }
    
    if (dto.getProperties() != null) {
      
      HashMap<String, String> dtoProperties = new HashMap<>(dto.getProperties());
      
      List<TestCaseCaricatoPropertyVO> propertiesVO = vo.getProperties();
      for (Iterator<TestCaseCaricatoPropertyVO> it = propertiesVO.iterator(); it.hasNext();) {
        TestCaseCaricatoPropertyVO pvo = it.next();
        String propKey = pvo.getKey();
        String newPropValue = dtoProperties.get(propKey);
        if (newPropValue == null) {
          it.remove();
        } else {
          if (!newPropValue.equals(pvo.getValue())) {
            pvo.setValue(newPropValue);
          }
          dtoProperties.remove(propKey);
        }
      }
      
      for (Entry<String, String> entry: dtoProperties.entrySet()) {
        TestCaseCaricatoPropertyVO pvo = new TestCaseCaricatoPropertyVO();
        pvo.setKey(entry.getKey());
        pvo.setValue(entry.getValue());
        pvo.setTestCaseCaricato(vo);
        propertiesVO.add(testCaseCaricatoPropertyRepository.save(pvo));
      }
    }
    
    vo = testCaseCaricatoRepository.saveAndFlush(vo);
    
    return new TestCaseCaricatoDTO(vo, true, true)
        .assignFolder(fileSystemService.listFolderVO(FileSystemScope.TEST_CARICATO, vo.getId()));
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
  public TestCaseCaricatoDTO loadTestCase(long id, ScheduleInfo scheduleInfo) throws ApplicationException {
    logger.debug("enter loadTestCase");
    TestCaseVO tcvo = readVO(id);
    
    ArrayList<FileSystemVO> fileCopiati = new ArrayList<>();
    
    TestCaseCaricatoVO vo = loadTestCaseInternal(tcvo, null, scheduleInfo, true, fileCopiati);
    
    testCaseCaricatoRepository.saveAndFlush(vo);
    
    return new TestCaseCaricatoDTO(vo, true, true).assignFolder(fileCopiati);
  }

  @Override
  public List<TestCaseCaricatoDTO> readTestCaricatiOfType(TestListType inclusion) throws ApplicationException {
    
    LoadedEntityStatus stato;
    switch (inclusion) {
    case COMPLETED: 
      stato = LoadedEntityStatus.COMPLETED;
      break;
    case SCHEDULED:
      stato = LoadedEntityStatus.SCHEDULED;
      break;
    case READY:
      stato = LoadedEntityStatus.READY;
      break;
    case RUNNING:
      stato = LoadedEntityStatus.RUNNING;
      break;
//    case WAITING:
//      stato = LoadedEntityStatus.WAITING;
//      break;
    default:
      return Collections.emptyList();
    }
    
    List<TestCaseCaricatoVO> result = testCaseCaricatoRepository.findByStatoAndTestSuite(stato, null, Sort.by(Direction.DESC, "id"));

    return result.stream()
        .map(TestCaseCaricatoDTO::new)
        .collect(Collectors.toList());
  }

  @Override
  public void runLoaded(long id) throws ApplicationException {
    TestCaseCaricatoVO vo = readCaricatoVO(id, true);
    //Verifica che lo stato sia ready
    checkStatoOfTestCaseCaricato(vo, LoadedEntityStatus.READY);
    
    internalRunTestCaseCaricato(vo);
  }

  @Override
  public void runScheduled(long id) throws ApplicationException {
    TestCaseCaricatoVO vo = readCaricatoVO(id, true);
    //Verifica che lo stato sia ready
    checkStatoOfTestCaseCaricato(vo, LoadedEntityStatus.SCHEDULED);
    
    internalRunTestCaseCaricato(vo);
    
  }
  
  private void internalRunTestCaseCaricato(TestCaseCaricatoVO vo) throws ApplicationException {
    vo.setStato(LoadedEntityStatus.RUNNING);
    vo.setStartDate(Instant.now());
    vo.setStartedBy(currentUsername());

    vo = testCaseCaricatoRepository.saveAndFlush(vo);
    logger.debug("Lo stato del test case caricato {} e' stato impostato a RUNNING", vo.getId());
    
    //internalAgent.runTestCaseIfQueueEmpty(vo);
    internalTestExecutor.startTestCase(vo);
    
  }

  public void checkStatoOfTestCaseCaricato(TestCaseCaricatoVO vo, LoadedEntityStatus statoAtteso) throws ApplicationException {
    if (!statoAtteso.equals(vo.getStato())) {
      throw makeError(HttpStatus.BAD_REQUEST, AppError.TEST_CASE_CARICATO_WRONG_EXPECTED_STATE, vo.getId(), vo.getStato(), statoAtteso);
    }
  }

  @Override
  public TestCaseCaricatoDTO readCaricato(long id, boolean includeDetails, boolean includeFolder) throws ApplicationException {
    TestCaseCaricatoVO vo = readCaricatoVO(id);
    TestCaseCaricatoDTO result = new TestCaseCaricatoDTO(vo, includeDetails, includeDetails);
    if (includeFolder) {
      result.assignFolder(fileSystemService.listFolderVO(FileSystemScope.TEST_CARICATO, id));
    }
    return result;
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

  @Override
  public TestCaseCaricatoDTO markTestCompleted(long id, ExecutionResult executionResult,
      TestCaseCaricatoDTO dto) throws ApplicationException {
    logger.debug("enter markTestCompleted");
    Assert.notNull(executionResult, "executionResult must not be null");
    
    TestCaseCaricatoVO vo = readCaricatoVO(id, true);
    //checkVersion(vo, dto.getVersion(), "TestCaseCaricatoVO, vo.getId());
    if (dto != null) {
      if (dto.getPathInstance() != null) {
        vo.setPathInstance(dto.getPathInstance());
      }
      
      if (dto.getStartDate() != null) {
        vo.setStartDate(dto.getStartDate());
      }
      
      if (dto.getStartedBy() != null) {
        vo.setStartedBy(dto.getStartedBy());
      }
    }
   
    vo.setResult(executionResult);
    vo.setStato(LoadedEntityStatus.COMPLETED);
    vo.setEndDate(Instant.now());
    
    vo = testCaseCaricatoRepository.saveAndFlush(vo);
    
    return new TestCaseCaricatoDTO(vo, false, false);
  }

  @Override
  public List<TestCaseCaricatoVO> loadTestCasesInTestSuiteVO(TestSuiteCaricataVO testSuite,
      Collection<TestCaseVO> testCases) throws ApplicationException {
    logger.debug("enter loadTestCasesInTestSuiteVO");
    ArrayList<TestCaseCaricatoVO> result = new ArrayList<>(testCases.size());
    for (TestCaseVO tcvo: testCases) {
      result.add(loadTestCaseInternal(tcvo, testSuite, null, false, null));
      
    }
    return result;
  }

  private TestCaseCaricatoVO loadTestCaseInternal(TestCaseVO tcvo, TestSuiteCaricataVO testSuiteCaricata, ScheduleInfo scheduleInfo,
      boolean flush, Collection<FileSystemVO> outfileCopiati) throws ApplicationException {
    
    TestCaseCaricatoVO vo = new TestCaseCaricatoVO();
    vo.setDescrizione(tcvo.getDescrizione());
    vo.setExpectedDuration(tcvo.getExpectedDuration());
    vo.setGruppo(currentGroup());
    vo.setLineaChiamato(tcvo.getLineaChiamato());
    vo.setLoadedBy(currentUsername());
    //vo.setLoadedWhen(null);
    vo.setNome(tcvo.getNome());
    vo.setObpChiamato(tcvo.getObpChiamato());
    if (scheduleInfo == null) {
      vo.setStato(LoadedEntityStatus.READY);
    } else {
      vo.setStato(LoadedEntityStatus.SCHEDULED);
      vo.setDelay(scheduleInfo.getDelay());
      vo.setScheduleDateTime(scheduleInfo.getScheduleDateTime());
    }
    vo.setTemplate(tcvo.getTemplate());
    vo.setTestCase(tcvo);
    vo.setTestSuite(testSuiteCaricata);
    //vo.setVersion(0);
    
    vo = testCaseCaricatoRepository.save(vo);
    
    //Copia i file dal test case al test case caricato
    logger.debug("Copia dei file dal test case {} al test case caricato {}", tcvo.getId(), vo.getId());
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
        tcclc.setFile(findCopiedFile(fileCopiati, lc.getFile(), folderName));
        tccLineeChiamanti.add(tcclc);
      }
      if (!tccLineeChiamanti.isEmpty()) {
        vo.setLineeChiamanti(testCaseCaricatoLineaChiamanteRepository.saveAll(tccLineeChiamanti));
      }
    }
    
    if (tcvo.getFileChiamato() != null) {
      vo.setFileChiamato(findCopiedFile(fileCopiati, tcvo.getFileChiamato(), folderName));
    }
    
    if (outfileCopiati != null) {
      outfileCopiati.addAll(fileCopiati.values());
    }
    
    if (flush) {
      return testCaseCaricatoRepository.saveAndFlush(vo);
    } else {
      return testCaseCaricatoRepository.save(vo);
    }
  }

  @Override
  public void removeCaricati(List<Long> ids) throws ApplicationException {
    logger.debug("enter removeCaricati");
    for (Long id: ids) {
      TestCaseCaricatoVO vo = readCaricatoVO(id, true);
      if (vo.getTestSuite() != null) {
        throw makeError(HttpStatus.NOT_FOUND, AppError.TEST_CASE_CARICATO_IN_TEST_SUITE, id, vo.getTestSuite().getId());
      }
      removeCaricatoVO(vo);
    }
  }

  @Override
  public void removeCaricatoVO(TestCaseCaricatoVO testCaseVO) throws ApplicationException {
    logger.debug("enter removeCaricatoVO");
    if (LoadedEntityStatus.RUNNING.equals(testCaseVO.getStato())) {
      throw makeError(HttpStatus.BAD_REQUEST, AppError.TEST_CASE_CARICATO_WRONG_STATE, testCaseVO.getId(), testCaseVO.getStato());
    }
    checkGroup(testCaseVO.getGruppo(), AppError.TEST_CASE_DELETE_WRONG_GROUP);
    testCaseCaricatoRepository.delete(testCaseVO);
    long deleted = fileSystemService.deleteFolder(FileSystemScope.TEST_CARICATO, testCaseVO.getId());
    logger.debug("Deleted {} files associated to testCase {}", deleted, testCaseVO.getId());
  }

  @Override
  public RiepilogoNumericoTestDTO riepilogoNumerico(LocalDate fromDay, LocalDate toDay) {
    
    RiepilogoNumericoTestDTO result = new RiepilogoNumericoTestDTO();
    long caricati = 0L;
    long schedulati = 0L;
    long completatiOK = 0L;
    long completatiKO = 0L;

    List<StatoTest> records = testCaseCaricatoRepository
        .findByLoadedWhenBetweenAndTestSuiteIsNullAndScheduleDateIsNull(fromDay, toDay);
    for (StatoTest record: records) {
      switch (record.getStato()) {
      case COMPLETED:
        ++caricati;
        if (record.getResult() != null) {
          if(ExecutionResult.OK.equals(record.getResult())) {
            ++completatiOK;
          } else {
            ++completatiKO;
          }
        }
        break;
      case READY:
      case RUNNING:
        ++caricati;
        break;
      default:
        logger.warn("Durante il riepilogoNumerico per i test non schedulati il test {} e' stato trovato in uno stato non atteso: {}", record.getId(), record.getStato());
      }
    }
    
    records = testCaseCaricatoRepository.findScheduledInInterval(fromDay, toDay);
    for (StatoTest record: records) {
      switch (record.getStato()) {
      case COMPLETED:
        ++schedulati;
        if (record.getResult() != null) {
          if (ExecutionResult.OK.equals(record.getResult())) {
            ++completatiOK;
          } else {
            ++completatiKO;
          }
        }
        break;
      case SCHEDULED:
      case RUNNING:
        ++schedulati;
        break;
      default:
        logger.warn("Durante il riepilogoNumerico per i test schedulati il test {} e' stato trovato in uno stato non atteso: {}", record.getId(), record.getStato());
      }

    }
    
    result.setCaricati(caricati);
    result.setCompletatiKO(completatiKO);
    result.setCompletatiOK(completatiOK);
    result.setSchedulati(schedulati);
    
    return result;
  }

  @Override
  public Optional<Long> findNextScheduledTestCaseToExecute() {
    logger.info("enter findNextScheduledTestCaseToExecute");
    return testCaseCaricatoRepository.findFirstByStatoAndScheduleDateTimeLessThanEqualOrderByScheduleDateTime(LoadedEntityStatus.SCHEDULED, LocalDateTime.now())
        .map(IdProjection::getId);
    
  }


}
