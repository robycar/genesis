package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TestSuiteLoadResponse extends PayloadResponse {

  private static final long serialVersionUID = 119440372376767370L;
  
  private TestSuiteCaricataDTO testSuiteCaricata;
  
  public TestSuiteLoadResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "testSuiteCaricata", testSuiteCaricata);
    super.writeFields(sb);
  }

  public TestSuiteCaricataDTO getTestSuiteCaricata() {
    return testSuiteCaricata;
  }

  public void setTestSuiteCaricata(TestSuiteCaricataDTO testSuiteCaricata) {
    this.testSuiteCaricata = testSuiteCaricata;
  }

}
