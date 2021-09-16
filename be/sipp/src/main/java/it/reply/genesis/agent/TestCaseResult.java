package it.reply.genesis.agent;

import it.reply.genesis.api.test.payload.TestCaseCaricatoDTO;

public interface TestCaseResult {

  public ServiceManager getServiceManager();
  
  public TestCaseCaricatoDTO getTestCaseCaricato();
}
