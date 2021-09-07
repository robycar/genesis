package it.reply.sipp.service;

import java.util.List;

import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.test.payload.TestCaseDTO;
import it.reply.sipp.model.LineaVO;
import it.reply.sipp.model.TestCaseVO;

public interface TestCaseService {

  List<TestCaseDTO> listTestCase() throws ApplicationException;

  TestCaseDTO createTestCase(TestCaseDTO testCaseDTO) throws ApplicationException;

  void removeTestCase(long id) throws ApplicationException;

  TestCaseDTO read(long id) throws ApplicationException;

  TestCaseDTO updateTestCase(TestCaseDTO testCaseDTO) throws ApplicationException;

  List<Long> findTestCaseIdUsingLine(LineaVO lineaVO);

  TestCaseVO readVO(long id) throws ApplicationException;

}
