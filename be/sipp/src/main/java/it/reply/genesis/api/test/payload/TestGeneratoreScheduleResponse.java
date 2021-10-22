package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TestGeneratoreScheduleResponse extends PayloadResponse {

  private static final long serialVersionUID = 5085115198401377973L;
  
  private TestGeneratoreCaricatoDTO testGeneratoreCaricato;

  public TestGeneratoreScheduleResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "testGeneratoreCaricato", testGeneratoreCaricato);
    super.writeFields(sb);
  }

  public TestGeneratoreCaricatoDTO getTestGeneratoreCaricato() {
    return testGeneratoreCaricato;
  }

  public void setTestGeneratoreCaricato(TestGeneratoreCaricatoDTO testGeneratoreCaricato) {
    this.testGeneratoreCaricato = testGeneratoreCaricato;
  }

}
