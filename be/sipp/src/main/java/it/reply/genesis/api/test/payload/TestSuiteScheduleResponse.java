package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TestSuiteScheduleResponse extends PayloadResponse {

  private static final long serialVersionUID = 7270577762105432327L;
  
  private TestSuiteCaricataDTO testSuite;
  
  public TestSuiteScheduleResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "testSuite", testSuite);
    super.writeFields(sb);
  }

  public TestSuiteCaricataDTO getTestSuite() {
    return testSuite;
  }

  public void setTestSuite(TestSuiteCaricataDTO testSuite) {
    this.testSuite = testSuite;
  }

}
