package it.reply.genesis.agent.internal.impl;

import it.reply.genesis.agent.ServiceManager;
import it.reply.genesis.agent.TestCaseResult;
import it.reply.genesis.api.test.payload.TestCaseCaricatoDTO;

public class TestCaseResultImpl implements TestCaseResult {

  private TestCaseCaricatoDTO testCaseCaricato;
  
  private ServiceManager serviceManager;

  public TestCaseResultImpl(ServiceManager serviceManager, TestCaseCaricatoDTO testCaseCaricatoDTO) {
    this.serviceManager = serviceManager;
    this.testCaseCaricato = testCaseCaricatoDTO;
  }

  @Override
  public ServiceManager getServiceManager() {
    return serviceManager;
  }

  @Override
  public TestCaseCaricatoDTO getTestCaseCaricato() {
    return testCaseCaricato;
  }

}
