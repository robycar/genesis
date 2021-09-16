package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TestSuiteRetrieveResponse extends PayloadResponse {

  private static final long serialVersionUID = -5268225195607625025L;

  private TestSuiteDTO testSuite;
  
  public TestSuiteRetrieveResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "testSuite", testSuite);
    super.writeFields(sb);
  }

  public TestSuiteDTO getTestSuite() {
    return testSuite;
  }

  public void setTestSuite(TestSuiteDTO testSuite) {
    this.testSuite = testSuite;
  }

}
