package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TestCaseLoadResponse extends PayloadResponse {

  private static final long serialVersionUID = -3636455484320122294L;
  
  private TestCaseCaricatoDTO testCaseCaricato;
  
  public TestCaseLoadResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "testCaseCaricato", testCaseCaricato);
    super.writeFields(sb);
  }

  public TestCaseCaricatoDTO getTestCaseCaricato() {
    return testCaseCaricato;
  }

  public void setTestCaseCaricato(TestCaseCaricatoDTO testCaseCaricato) {
    this.testCaseCaricato = testCaseCaricato;
  }

}
