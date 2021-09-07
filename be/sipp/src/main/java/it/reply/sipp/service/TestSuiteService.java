package it.reply.sipp.service;

import java.util.List;

import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.test.payload.TestSuiteDTO;

public interface TestSuiteService {

  List<TestSuiteDTO> list() throws ApplicationException;

  TestSuiteDTO createTestSuite(TestSuiteDTO testSuiteDTO) throws ApplicationException;

  TestSuiteDTO update(TestSuiteDTO testSuiteDTO) throws ApplicationException;

  void remove(long id) throws ApplicationException;

  TestSuiteDTO retrieve(long id) throws ApplicationException;

}
