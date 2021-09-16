package it.reply.sipp.agent;

import it.reply.sipp.api.test.payload.TestCaseCaricatoDTO;

public interface TestCaseResult {

  public ServiceManager getServiceManager();
  
  public TestCaseCaricatoDTO getTestCaseCaricato();
}
