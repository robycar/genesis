package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TeseGeneratoreRetrieveCaricatoResponse extends PayloadResponse {

  private static final long serialVersionUID = -7781688447682939704L;
  
  private TestGeneratoreCaricatoDTO testGeneratoreCaricato;
  
  public TeseGeneratoreRetrieveCaricatoResponse() {
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
