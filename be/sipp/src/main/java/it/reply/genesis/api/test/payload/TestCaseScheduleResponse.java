package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TestCaseScheduleResponse extends PayloadResponse {

  private static final long serialVersionUID = -7591122335549277166L;
  
  private TestCaseCaricatoDTO testCaseCaricato;
  
  public TestCaseScheduleResponse() {
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
