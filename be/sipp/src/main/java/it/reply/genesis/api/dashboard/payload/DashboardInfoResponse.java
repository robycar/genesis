package it.reply.genesis.api.dashboard.payload;

import java.util.List;

import it.reply.genesis.api.generic.payload.PayloadResponse;
import it.reply.genesis.api.test.payload.TestCaseCaricatoDTO;

public class DashboardInfoResponse extends PayloadResponse {

  private static final long serialVersionUID = -3274302069519448455L;

  private List<TestCaseCaricatoDTO> testCaseList;
  
  private List<TestCaseCaricatoDTO> testSuiteList;
  
  private List<TestCaseCaricatoDTO> testGeneratoList;
  
  public DashboardInfoResponse() {
  }

  public List<TestCaseCaricatoDTO> getTestCaseList() {
    return testCaseList;
  }

  public void setTestCaseList(List<TestCaseCaricatoDTO> testCaseList) {
    this.testCaseList = testCaseList;
  }

  public List<TestCaseCaricatoDTO> getTestSuiteList() {
    return testSuiteList;
  }

  public void setTestSuiteList(List<TestCaseCaricatoDTO> testSuiteList) {
    this.testSuiteList = testSuiteList;
  }

  public List<TestCaseCaricatoDTO> getTestGeneratoList() {
    return testGeneratoList;
  }

  public void setTestGeneratoList(List<TestCaseCaricatoDTO> testGeneratoList) {
    this.testGeneratoList = testGeneratoList;
  }

  
}
