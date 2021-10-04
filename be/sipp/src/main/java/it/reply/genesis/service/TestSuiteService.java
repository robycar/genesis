package it.reply.genesis.service;

import java.util.List;

import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.test.payload.TestSuiteCaricataDTO;
import it.reply.genesis.api.test.payload.TestSuiteDTO;

public interface TestSuiteService {

  List<TestSuiteDTO> list() throws ApplicationException;

  TestSuiteDTO createTestSuite(TestSuiteDTO testSuiteDTO) throws ApplicationException;

  TestSuiteDTO update(TestSuiteDTO testSuiteDTO) throws ApplicationException;

  void remove(long id) throws ApplicationException;

  TestSuiteDTO retrieve(long id) throws ApplicationException;

  TestSuiteCaricataDTO loadTestSuite(long id) throws ApplicationException;

}
