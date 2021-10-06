package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TestSuiteRetrieveLoadedResponse extends PayloadResponse {

  private static final long serialVersionUID = -6622083552411890886L;
  
  private TestSuiteCaricataDTO testSuite;
  
  public TestSuiteRetrieveLoadedResponse() {
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
