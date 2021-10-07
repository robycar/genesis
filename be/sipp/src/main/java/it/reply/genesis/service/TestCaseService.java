package it.reply.genesis.service;

import java.util.Collection;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.test.payload.TestCaseCaricatoDTO;
import it.reply.genesis.api.test.payload.TestCaseDTO;
import it.reply.genesis.model.ExecutionResult;
import it.reply.genesis.model.LineaVO;
import it.reply.genesis.model.OutboundProxyVO;
import it.reply.genesis.model.TestCaseCaricatoVO;
import it.reply.genesis.model.TestCaseVO;
import it.reply.genesis.model.TestSuiteCaricataVO;
import it.reply.genesis.service.dto.ScheduleInfo;
import it.reply.genesis.service.dto.TestListType;

public interface TestCaseService {

  List<TestCaseDTO> listTestCase() throws ApplicationException;

  TestCaseDTO createTestCase(TestCaseDTO testCaseDTO) throws ApplicationException;

  void removeTestCase(long id) throws ApplicationException;

  TestCaseDTO read(long id) throws ApplicationException;

  TestCaseDTO updateTestCase(TestCaseDTO testCaseDTO) throws ApplicationException;

  List<Long> findTestCaseIdUsingLine(LineaVO lineaVO);

  List<Long> findTestCaseIdUsingProxy(OutboundProxyVO proxyVO);
  
  TestCaseVO readVO(long id) throws ApplicationException;

  TestCaseCaricatoDTO loadTestCase(long id, ScheduleInfo scheduleInfo) throws ApplicationException;
  
  List<TestCaseCaricatoVO> loadTestCasesInTestSuiteVO(TestSuiteCaricataVO testSuite, Collection<TestCaseVO> testCases) throws ApplicationException;

  List<TestCaseCaricatoDTO> readTestCaricatiOfType(TestListType inclusion) throws ApplicationException;

  /**
   * Avvia l'esecuzione di un test case caricato.
   * @param id l'identificatore del test case caricato
   * @throws ApplicationException in caso di errore
   */
  void runLoaded(long id) throws ApplicationException;

  @Transactional(rollbackFor = ApplicationException.class)
  default TestCaseCaricatoDTO readCaricato(long id) throws ApplicationException {
    return readCaricato(id, false, false);
  }
  
  TestCaseCaricatoDTO readCaricato(long id, boolean includeDetails, boolean includeFolder) throws ApplicationException;

  TestCaseCaricatoDTO updateTestCaseCaricato(TestCaseCaricatoDTO testCaseCaricato) throws ApplicationException;

  @Transactional(rollbackFor = ApplicationException.class)
  default TestCaseCaricatoDTO markTestCompleted(long id, ExecutionResult executionResult) throws ApplicationException {
    return markTestCompleted(id, executionResult, null);
  }
  
  TestCaseCaricatoDTO markTestCompleted(long id, ExecutionResult executionResult, TestCaseCaricatoDTO extraFieldsToSet) throws ApplicationException;

  void removeCaricati(List<Long> ids) throws ApplicationException;
  
  void removeCaricatoVO(TestCaseCaricatoVO testCase) throws ApplicationException;
  
}
