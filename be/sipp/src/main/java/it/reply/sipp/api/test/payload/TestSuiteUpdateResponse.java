package it.reply.sipp.api.test.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class TestSuiteUpdateResponse extends PayloadResponse {

  private static final long serialVersionUID = 1L;
  
  private TestSuiteDTO testSuite;
  
  public TestSuiteUpdateResponse() {
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
