package it.reply.genesis.service.impl;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.reply.genesis.AppError;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.generic.service.AbstractService;
import it.reply.genesis.api.test.payload.TestCaseDTO;
import it.reply.genesis.api.test.payload.TestSuiteCaricataDTO;
import it.reply.genesis.api.test.payload.TestSuiteDTO;
import it.reply.genesis.model.LoadedEntityStatus;
import it.reply.genesis.model.TestCaseCaricatoVO;
import it.reply.genesis.model.TestCaseVO;
import it.reply.genesis.model.TestSuiteCaricataVO;
import it.reply.genesis.model.TestSuiteVO;
import it.reply.genesis.model.repository.TestCaseRepository;
import it.reply.genesis.model.repository.TestSuiteCaricataRepository;
import it.reply.genesis.model.repository.TestSuiteRepository;
import it.reply.genesis.service.TestCaseService;
import it.reply.genesis.service.TestSuiteService;

@Service
@Transactional(rollbackFor = ApplicationException.class)
public class TestSuiteServiceImpl extends AbstractService implements TestSuiteService {

  @Autowired
  private TestCaseService testCaseService;

  @Autowired
  private TestSuiteRepository testSuiteRepository;
  
  @Autowired
  private TestCaseRepository testCaseRepository;
  
  @Autowired
  private TestSuiteCaricataRepository testSuiteCaricataRepository;
  
  public TestSuiteServiceImpl() {
  }

  @Override
  public List<TestSuiteDTO> list() {
    logger.debug("enter list");
    List<TestSuiteVO> result = testSuiteRepository.findAll(Sort.by(Direction.DESC, "id"));
    return result.stream()
        .map(vo -> {
          TestSuiteDTO dto = new TestSuiteDTO(vo);
          dto.setNumTestCases(testSuiteRepository.sizeOfChildren(vo));
          return dto;
         })
        .collect(Collectors.toList());
  }

  @Override
  public TestSuiteDTO createTestSuite(TestSuiteDTO testSuiteDTO) throws ApplicationException {
    long count = testSuiteRepository.countByNome(testSuiteDTO.getNome());
    if (count > 0) {
      throw makeError(HttpStatus.CONFLICT, AppError.TEST_SUITE_ALRADY_EXISTS, testSuiteDTO.getNome());
    }
    TestSuiteVO testSuiteVO = new TestSuiteVO();
    testSuiteVO.init(currentUsername());
    testSuiteVO.setGruppo(currentGroup());
    testSuiteVO.setNome(testSuiteDTO.getNome());
    testSuiteVO.setDescrizione(testSuiteDTO.getDescrizione());
    
    
    if (testSuiteDTO.getTestCases() != null) {
      Set<Long> testCaseIds = testSuiteDTO.getTestCases()
          .stream()
          .map(tc -> tc.getId())
          .filter(Objects::nonNull)
          .collect(Collectors.toSet());
      if (!testCaseIds.isEmpty()) {
        List<TestCaseVO> testCaseList = testCaseRepository.findAllById(testCaseIds);
        testCaseList.forEach(tcVO -> testCaseIds.remove(tcVO.getId()));
        if (!testCaseIds.isEmpty()) {
          throw makeError(HttpStatus.NOT_FOUND, AppError.TEST_CASE_NOT_FOUND, testCaseIds);
        }
        testSuiteVO.setTestCases(new HashSet<>(testCaseList));
      }
    }
    testSuiteVO = testSuiteRepository.saveAndFlush(testSuiteVO);
    return new TestSuiteDTO(testSuiteVO, true);
  }

  @Override
  public TestSuiteDTO update(TestSuiteDTO testSuiteDTO) throws ApplicationException {
    logger.debug("enter update");
    TestSuiteVO testSuiteVO = readVO(testSuiteDTO.getId());
    checkGroup(testSuiteVO.getGruppo(), AppError.TEST_SUITE_EDIT_WRONG_GROUP);
    checkVersion(testSuiteVO, testSuiteDTO.getVersion(), "testsuite", testSuiteVO.getId());
    if (testSuiteDTO.getNome() != null && testSuiteDTO.getNome() != testSuiteVO.getNome()) {
      Optional<Long> existingVoId = testSuiteRepository.findByNome(testSuiteDTO.getNome())
          .filter(evo -> !evo.getId().equals(testSuiteDTO.getId()))
          .map(TestSuiteVO::getId);
      if (existingVoId.isPresent()) {
        throw makeError(HttpStatus.CONFLICT, AppError.TEST_SUITE_ALRADY_EXISTS, testSuiteDTO.getNome());
      }
      testSuiteVO.setNome(testSuiteDTO.getNome());
    }
    
    if (testSuiteDTO.getDescrizione() != null) {
      testSuiteVO.setDescrizione(testSuiteDTO.getDescrizione());
    }
    testSuiteVO.modifiedBy(currentUsername());

    // aggiungi rimuovi test case dall'elenco della test suite
    if (testSuiteDTO.getTestCases() != null) {
      Set<Long> nuoviTestCase = testSuiteDTO.getTestCases()
          .stream()
          .map(TestCaseDTO::getId)
          .collect(Collectors.toSet());
      HashMap<Long, TestCaseVO> testCaseAssegnati = new HashMap<>(testSuiteVO.getTestCases().size());
      Iterator<TestCaseVO> it = testSuiteVO.getTestCases().iterator();
      while (it.hasNext()) {
        TestCaseVO existingTestCaseVO = it.next();
        if (nuoviTestCase.contains(existingTestCaseVO.getId())) {
          testCaseAssegnati.put(existingTestCaseVO.getId(), existingTestCaseVO);
        } else {
          it.remove();
        }
      }
      nuoviTestCase.removeAll(testCaseAssegnati.keySet());
      if (!nuoviTestCase.isEmpty()) {
        List<TestCaseVO> testCaseDaAggiungere = testCaseRepository.findAllById(nuoviTestCase);
        for (TestCaseVO tcVO: testCaseDaAggiungere) {
          nuoviTestCase.remove(tcVO.getId());
        }
        if (!nuoviTestCase.isEmpty()) {
          throw makeError(HttpStatus.NOT_FOUND, AppError.TEST_CASE_NOT_FOUND, nuoviTestCase);
        }
        testSuiteVO.getTestCases().addAll(testCaseDaAggiungere);
      }
    }
    testSuiteVO.modifiedBy(currentUsername());
    testSuiteVO = testSuiteRepository.saveAndFlush(testSuiteVO);
    
    return new TestSuiteDTO(testSuiteVO, true);
  }

  private TestSuiteVO readVO(long id) throws ApplicationException {
    return testSuiteRepository.findById(id)
        .orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.TEST_SUITE_NOT_FOUND, id));
  }

  @Override
  public void remove(long id) throws ApplicationException {
    logger.debug("enter remove");
    TestSuiteVO testSuiteVO = readVO(id);
    testSuiteRepository.delete(testSuiteVO);
  }

  @Override
  public TestSuiteDTO retrieve(long id) throws ApplicationException {
    logger.debug("enter retrieve");
    TestSuiteVO testSuiteVO = readVO(id);
    
    return new TestSuiteDTO(testSuiteVO, true);
  }

  @Override
  public TestSuiteCaricataDTO loadTestSuite(long id) throws ApplicationException {
    logger.debug("enter loadTestSuite");
    TestSuiteVO src = readVO(id);
    
    TestSuiteCaricataVO vo = new TestSuiteCaricataVO();
    
    vo.setDescrizione(src.getDescrizione());
    vo.setGruppo(src.getGruppo());
    vo.setLoadedBy(currentUsername());
    //vo.setLoadedWhen(new Timestamp());
    vo.setNome(src.getNome());
    vo.setStato(LoadedEntityStatus.READY);
    vo.setTestSuite(src);
    
    vo = testSuiteCaricataRepository.save(vo);
    
    if (!src.getTestCases().isEmpty()) {
      List<TestCaseCaricatoVO> loadedTestCases = testCaseService.loadTestCasesInTestSuiteVO(vo, src.getTestCases());
      vo.setTestCases(loadedTestCases);
      vo = testSuiteCaricataRepository.saveAndFlush(vo);
    } else {
      testSuiteCaricataRepository.flush();
    }

    return new TestSuiteCaricataDTO(vo, true);
  }

}
