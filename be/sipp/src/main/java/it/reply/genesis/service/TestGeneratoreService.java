package it.reply.genesis.service;

import java.util.List;

import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.test.payload.TestGeneratoreDTO;
import it.reply.genesis.model.OutboundProxyVO;

public interface TestGeneratoreService {

  List<TestGeneratoreDTO> listTestGeneratore() throws ApplicationException;

  TestGeneratoreDTO createTestGeneratore(TestGeneratoreDTO testDTO) throws ApplicationException;

  TestGeneratoreDTO readTestGeneratore(long id) throws ApplicationException;

  TestGeneratoreDTO updateTestGeneratore(TestGeneratoreDTO testDto) throws ApplicationException;

  void deleteTestGeneratore(long id) throws ApplicationException;

  List<Long> findTestIdUsingProxy(OutboundProxyVO proxy) throws ApplicationException;

}
