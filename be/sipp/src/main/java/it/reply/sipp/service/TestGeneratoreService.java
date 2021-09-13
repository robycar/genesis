package it.reply.sipp.service;

import java.util.List;

import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.test.payload.TestGeneratoreDTO;

public interface TestGeneratoreService {

  List<TestGeneratoreDTO> listTestGeneratore() throws ApplicationException;

  TestGeneratoreDTO createTestGeneratore(TestGeneratoreDTO testDTO) throws ApplicationException;

  TestGeneratoreDTO readTestGeneratore(long id) throws ApplicationException;

  TestGeneratoreDTO updateTestGeneratore(TestGeneratoreDTO testDto) throws ApplicationException;

  void deleteTestGeneratore(long id) throws ApplicationException;

}
