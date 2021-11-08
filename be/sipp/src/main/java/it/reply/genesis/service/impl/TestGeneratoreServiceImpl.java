package it.reply.genesis.service.impl;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.reply.genesis.AppError;
import it.reply.genesis.agent.internal.impl.SingleThreadSingleTestExecutor;
import it.reply.genesis.api.dashboard.payload.RiepilogoNumericoTestGeneratoreDTO;
import it.reply.genesis.api.files.payload.FileDTO;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.generic.service.AbstractService;
import it.reply.genesis.api.test.payload.TestGeneratoreCaricatoDTO;
import it.reply.genesis.api.test.payload.TestGeneratoreDTO;
import it.reply.genesis.model.FileSystemScope;
import it.reply.genesis.model.FileSystemVO;
import it.reply.genesis.model.LoadedEntityStatus;
import it.reply.genesis.model.OutboundProxyVO;
import it.reply.genesis.model.TemplateVO;
import it.reply.genesis.model.TestGeneratoreCaricatoVO;
import it.reply.genesis.model.TestGeneratoreVO;
import it.reply.genesis.model.dao.TestGeneratoreSelector;
import it.reply.genesis.model.dao.TestStatus;
import it.reply.genesis.model.repository.TestGeneratoreCaricatoRepository;
import it.reply.genesis.model.repository.TestGeneratoreRepository;
import it.reply.genesis.service.FileSystemService;
import it.reply.genesis.service.LineaService;
import it.reply.genesis.service.OBPService;
import it.reply.genesis.service.TemplateService;
import it.reply.genesis.service.TestGeneratoreService;
import it.reply.genesis.service.dto.ScheduleInfo;
import it.reply.genesis.service.dto.TestListType;

@Service
@Transactional(rollbackFor = ApplicationException.class)
public class TestGeneratoreServiceImpl extends AbstractService implements TestGeneratoreService {

  @Autowired
  private TestGeneratoreRepository testGeneratoreRepository;
  
  @Autowired
  private TestGeneratoreCaricatoRepository testGeneratoreCaricatoRepository;
  
  @Autowired
  private TemplateService templateService;
  
  @Autowired
  private LineaService lineaService;
  
  @Autowired
  private OBPService oBPService;
  
  @Autowired
  private FileSystemService fileSystemService;
  
  @Autowired
  private SingleThreadSingleTestExecutor testExecutor;
  
  @Autowired
  private TestGeneratoreSelector testGeneratoreSelector;
  
  @Override
  public List<TestGeneratoreDTO> listTestGeneratore() throws ApplicationException {
    logger.debug("enter listTestGeneratore");
    
    return testGeneratoreRepository.findAll(Sort.by(Direction.DESC, "id"))
        .stream()
        .map(vo -> new TestGeneratoreDTO(vo))
        .collect(Collectors.toList());
  }

  @Override
  public TestGeneratoreDTO createTestGeneratore(TestGeneratoreDTO dto) throws ApplicationException {
    logger.debug("enter createTestGeneratore");
    
    TemplateVO templateVO = templateService.readVO(dto.getTemplate().getId());
    if (testGeneratoreRepository.findByNome(dto.getNome()).isPresent()) {
      throw makeError(HttpStatus.CONFLICT, AppError.TEST_GEN_ALRADY_EXISTS, dto.getNome());
    }
    
    TestGeneratoreVO vo = new TestGeneratoreVO();
    vo.init(currentUsername());
    vo.setNome(dto.getNome());
    vo.setDescrizione(dto.getDescrizione());
    vo.setLineaChiamante(lineaService.readLineaGeneratoreVO(dto.getLineaChiamante().getId()));
    vo.setLineaChiamato(lineaService.readLineaGeneratoreVO(dto.getLineaChiamato().getId()));
    vo.setProxyChiamante(oBPService.readProxyVO(dto.getProxyChiamante().getId()));
    vo.setProxyChiamato(oBPService.readProxyVO(dto.getProxyChiamato().getId()));
    vo.setTemplate(templateService.readVO(dto.getTemplate().getId()));
    vo = testGeneratoreRepository.save(vo);
    
    List<Pair<FileSystemVO, FileSystemVO>> fileCopiati = fileSystemService.copyFilesThroughScope(FileSystemScope.TEMPLATE, templateVO.getId(), FileSystemScope.TEST, vo.getId());
    logger.debug("Copiati {} file dal template {},{} al test generatore {},{}", 
        fileCopiati.size(), 
        templateVO.getId(), templateVO.getNome(),
        vo.getId(), vo.getNome());
    
    testGeneratoreRepository.flush();
    
    return new TestGeneratoreDTO(vo);
  }

  @Override
  public TestGeneratoreDTO readTestGeneratore(long id) throws ApplicationException {
    TestGeneratoreVO vo = readTestGeneratoreVO(id);
    
    return new TestGeneratoreDTO(vo);
  }

  public TestGeneratoreVO readTestGeneratoreVO(long id) throws ApplicationException {
    return testGeneratoreRepository.findById(id)
        .orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.TEST_GEN_NOT_FOUND, id));
  }

  @Override
  public TestGeneratoreDTO updateTestGeneratore(TestGeneratoreDTO dto) throws ApplicationException {
    logger.debug("enter updateTestGeneratore");
    
    TestGeneratoreVO vo = readTestGeneratoreVO(dto.getId());
    checkVersion(vo, dto.getVersion(), "TestGeneratoreVO", dto.getId());
    
    if (dto.getNome() != null && !dto.getNome().equals(vo.getNome())) {
      Optional<Long> existingId = testGeneratoreRepository.findByNome(dto.getNome())
        .filter(s -> !s.getId().equals(dto.getId()))
        .map(s -> s.getId());
      if (existingId.isPresent()) {
        throw makeError(HttpStatus.CONFLICT, AppError.TEST_GEN_ALRADY_EXISTS, dto.getNome());
      }
      
      vo.setNome(dto.getNome());
    }
    
    if (dto.getDescrizione() != null) {
      vo.setDescrizione(dto.getDescrizione());
    }
    
    if (dto.getLineaChiamante() != null) {
      vo.setLineaChiamante(lineaService.readLineaGeneratoreVO(dto.getLineaChiamante().getId()));
    }
    
    if (dto.getLineaChiamato() != null) {
      vo.setLineaChiamato(lineaService.readLineaGeneratoreVO(dto.getLineaChiamato().getId()));
    }
    
    if (dto.getProxyChiamante() != null) {
      vo.setProxyChiamante(oBPService.readProxyVO(dto.getProxyChiamante().getId()));
    }
    
    if (dto.getProxyChiamato() != null) {
      vo.setProxyChiamato(oBPService.readProxyVO(dto.getProxyChiamato().getId()));
    }
    
    vo.modifiedBy(currentUsername());
    
    testGeneratoreRepository.saveAndFlush(vo);
    
    return new TestGeneratoreDTO(vo);
  }

  @Override
  public void deleteTestGeneratore(long id) throws ApplicationException {
    logger.debug("enter deleteTestGeneratore");
    TestGeneratoreVO testVO = readTestGeneratoreVO(id);
    
    testGeneratoreRepository.delete(testVO);
    
  }

  @Override
  public List<Long> findTestIdUsingProxy(OutboundProxyVO proxy) throws ApplicationException {
    logger.debug("enter findTestIdUsingProxy");
    return testGeneratoreRepository.findIdByProxyChiamanteOrChiamato(proxy);
  }

  @Override
  public TestGeneratoreCaricatoDTO loadTestGeneratore(TestGeneratoreCaricatoDTO testDTO, ScheduleInfo scheduleInfo) throws ApplicationException {
    logger.debug("enter loadTestGeneratore");
    TestGeneratoreVO testVO = readTestGeneratoreVO(testDTO.getId());
    
    TestGeneratoreCaricatoVO vo = new TestGeneratoreCaricatoVO();
    vo.init(currentUsername());
    vo.setDescrizione(testVO.getDescrizione());
    vo.setDurataTraffico(testDTO.getDurataTraffico());
    vo.setGruppo(currentGroup());
    vo.setLineaChiamante(lineaService.cloneLineaVO(testVO.getLineaChiamante()));
    vo.setLineaChiamato(lineaService.cloneLineaVO(testVO.getLineaChiamato()));
    vo.setNome(testVO.getNome());
    vo.setProxyChiamante(testVO.getProxyChiamante());
    vo.setProxyChiamato(testVO.getProxyChiamato());
    vo.setRate(testDTO.getRate());
    vo.setTemplate(testVO.getTemplate());
    vo.setTestGeneratore(testVO);
    
    
    if (scheduleInfo != null) {
      vo.setDelay(scheduleInfo.getDelay());
      vo.setScheduleDateTime(scheduleInfo.getScheduleDateTime());
      vo.setStato(LoadedEntityStatus.SCHEDULED);
    } else {
      vo.setStato(LoadedEntityStatus.READY);
    }
    
    vo = testGeneratoreCaricatoRepository.save(vo);
    
    List<Pair<FileSystemVO, FileSystemVO>> fileCopiati = fileSystemService.copyFilesThroughScope(
        FileSystemScope.TEMPLATE, testVO.getTemplate().getId(), 
        FileSystemScope.TESTGEN_CARICATO, vo.getId());
    
    testGeneratoreCaricatoRepository.flush();
    
    return new TestGeneratoreCaricatoDTO(vo, true)
        .setFolder(fileCopiati.stream()
            .map(Pair::getSecond)
            .map(FileDTO::new)
            .collect(Collectors.toList()));
  }

  @Override
  public List<TestGeneratoreCaricatoDTO> readTestCaricatiOfType(TestListType inclusion) {
    logger.debug("enter readTestCaricatiOfType");
    Collection<LoadedEntityStatus> stato;
    //String orderBy = "id";
    Sort.Order order;
    switch (inclusion) {
    case COMPLETED: 
      stato = Collections.singleton(LoadedEntityStatus.COMPLETED);
      order = Sort.Order.desc("endDate");
      break;
    case SCHEDULED:
      stato = Collections.singleton(LoadedEntityStatus.SCHEDULED);
      order = Sort.Order.asc("scheduleDateTime");
      break;
    case READY:
      stato = Collections.singleton(LoadedEntityStatus.READY);
      order = Sort.Order.desc("id");
      break;
    case RUNNING:
      stato = List.of(LoadedEntityStatus.RUNNING, LoadedEntityStatus.PAUSED);
      order = Sort.Order.asc("startDate");
      break;
    default:
      return Collections.emptyList();
    }

    List<TestGeneratoreCaricatoVO> result = testGeneratoreCaricatoRepository.findByStatoIn(stato, Sort.by(order));
    
    return result.stream()
        .map(TestGeneratoreCaricatoDTO::new)
        .collect(Collectors.toList());
  }

  @Override
  public void runLoaded(long id) throws ApplicationException {
    logger.debug("enter runLoaded");
    TestGeneratoreCaricatoVO testGeneratoreCarcatoVO = readTestGeneratoreCaricatoVO(id, true);
    
    checkStatoOfTestGeneratoreCaricato(testGeneratoreCarcatoVO, LoadedEntityStatus.READY);
    internalRunTestGeneratoreCaricato(testGeneratoreCarcatoVO);
  }

  private void internalRunTestGeneratoreCaricato(TestGeneratoreCaricatoVO testCaricatoVO) throws ApplicationException {
    testCaricatoVO.setStartDate(Instant.now());
    testCaricatoVO.setStartedBy(currentUsername());
    testCaricatoVO.setStato(LoadedEntityStatus.RUNNING);
    testCaricatoVO = testGeneratoreCaricatoRepository.saveAndFlush(testCaricatoVO);
    logger.info("Lo stato del test case generatore caricato {} e' stato impostato a RUNNING", testCaricatoVO.getId());
    testExecutor.startTestGeneratore(new TestGeneratoreCaricatoDTO(testCaricatoVO));
  }

  private void checkStatoOfTestGeneratoreCaricato(TestGeneratoreCaricatoVO vo, LoadedEntityStatus expectedStatus) throws ApplicationException {
    if (!expectedStatus.equals(vo.getStato())) {
      throw makeError(HttpStatus.BAD_REQUEST, AppError.TEST_GEN_CARICATO_WRONG_EXPECTED_STATE, vo.getId(), vo.getStato(), expectedStatus);
    }
    
  }

  private TestGeneratoreCaricatoVO readTestGeneratoreCaricatoVO(long id, boolean locking) throws ApplicationException {
    Optional<TestGeneratoreCaricatoVO> result;
    
    if (locking) {
      result = testGeneratoreCaricatoRepository.findByIdLocking(id);
    } else {
      result = testGeneratoreCaricatoRepository.findById(id);
    }
    return result.orElseThrow(() -> 
      makeError(HttpStatus.NOT_FOUND, AppError.TEST_GEN_CARICATO_NOT_FOUND, id));
  }

  @Override
  public TestGeneratoreCaricatoDTO retrieveCaricato(long id, boolean includeDetails, boolean locking) throws ApplicationException {
    TestGeneratoreCaricatoVO vo = readTestGeneratoreCaricatoVO(id, locking);
    return new TestGeneratoreCaricatoDTO(vo, includeDetails);
  }

  @Override
  public TestGeneratoreCaricatoDTO updateTestGeneratoreCaricato(TestGeneratoreCaricatoDTO dto)
      throws ApplicationException {
    logger.debug("enter updateTestGeneratoreCaricato");
    TestGeneratoreCaricatoVO vo = readTestGeneratoreCaricatoVO(dto.getId(), true);
    
    if (dto.getStartedBy() != null) {
      vo.setStartedBy(dto.getStartedBy());
    }
    
    if (dto.getStartDate() != null) {
      vo.setStartDate(dto.getStartDate());
    }

    if (dto.getEndDate() != null) {
      vo.setEndDate(dto.getEndDate());
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
    
    vo = testGeneratoreCaricatoRepository.saveAndFlush(vo);
    
    return new TestGeneratoreCaricatoDTO(vo, true);
  }

  @Override
  public void removeCaricati(@Valid List<Long> ids) throws ApplicationException {
    logger.debug("enter removeCaricati");
    for (Long id: ids) {
      TestGeneratoreCaricatoVO vo = readTestGeneratoreCaricatoVO(id, true);
      if (LoadedEntityStatus.PAUSED.equals(vo.getStato()) || LoadedEntityStatus.RUNNING.equals(vo.getStato())) {
        throw makeError(HttpStatus.BAD_REQUEST, AppError.TEST_GEN_CARICATO_WRONG_STATE, vo.getId(), vo.getStato());
      }
      logger.debug("Elimino il test generatore caricato {}:{}:{}", id, vo.getNome(), vo.getStato());
      fileSystemService.deleteFolder(FileSystemScope.TESTGEN_CARICATO, id);
      testGeneratoreCaricatoRepository.delete(vo);
      testGeneratoreCaricatoRepository.flush();
    }
  }

  @Override
  public RiepilogoNumericoTestGeneratoreDTO riepilogoNumerico(LocalDate fromDay, LocalDate toDay)
      throws ApplicationException {
    List<TestStatus> records = testGeneratoreSelector.testGeneratoreCaricatiExecutionStatus(fromDay, toDay);
    long completati = 0L;
    long caricati = 0L;
    long schedulati = 0L;
    
    for (TestStatus record: records) {
      switch(record.getStato()) {
      case COMPLETED:
        completati += record.getCount();
        break;
      case SCHEDULED:
        schedulati += record.getCount();
        break;
      case PAUSED:
      case READY:
      case RUNNING:
        caricati += record.getCount();
        break;
      default:
        logger.warn("Nel metodo riepilogoNumerico trovati {} test generatori che si trovano in uno stato non atteso: {}", record.getCount(), record.getStato());
        break;
      }
    }
    
    RiepilogoNumericoTestGeneratoreDTO result = new RiepilogoNumericoTestGeneratoreDTO();
    result.setCompletati(completati);
    result.setCaricati(caricati);
    result.setSchedulati(schedulati);
    return result;
  }

}
