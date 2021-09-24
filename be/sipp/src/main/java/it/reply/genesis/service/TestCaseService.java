package it.reply.genesis.service;

import java.util.List;

import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.test.payload.TestCaseCaricatoDTO;
import it.reply.genesis.api.test.payload.TestCaseDTO;
import it.reply.genesis.model.LineaVO;
import it.reply.genesis.model.OutboundProxyVO;
import it.reply.genesis.model.TestCaseVO;
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

  TestCaseCaricatoDTO loadTestCase(long id) throws ApplicationException;

  List<TestCaseCaricatoDTO> readTestCaricatiOfType(TestListType inclusion) throws ApplicationException;

  /**
   * Avvia l'esecuzione di un test case caricato.
   * @param id l'identificatore del test case caricato
   * @throws ApplicationException in caso di errore
   */
  void runLoaded(long id) throws ApplicationException;

  TestCaseCaricatoDTO readCaricato(long id) throws ApplicationException;

  TestCaseCaricatoDTO updateTestCaseCaricato(TestCaseCaricatoDTO testCaseCaricato) throws ApplicationException;


}
