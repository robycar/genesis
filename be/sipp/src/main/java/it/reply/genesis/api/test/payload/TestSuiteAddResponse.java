package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TestSuiteAddResponse extends PayloadResponse {

  private static final long serialVersionUID = -6834674317794535993L;
  
  private TestSuiteDTO testSuite;
  
  public TestSuiteAddResponse() {
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
