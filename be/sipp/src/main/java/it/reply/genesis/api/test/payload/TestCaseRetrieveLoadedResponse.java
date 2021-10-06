package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TestCaseRetrieveLoadedResponse extends PayloadResponse {

  private static final long serialVersionUID = -779434297562559926L;
  
  private TestCaseCaricatoDTO testCase;
  
  public TestCaseRetrieveLoadedResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "testCase", testCase);
    super.writeFields(sb);
  }

  public TestCaseCaricatoDTO getTestCase() {
    return testCase;
  }

  public void setTestCase(TestCaseCaricatoDTO testCase) {
    this.testCase = testCase;
  }
  
  
}
