package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TestGeneratoreLoadResponse extends PayloadResponse {

  private static final long serialVersionUID = 4368510747628438484L;
  
  private TestGeneratoreCaricatoDTO testGeneratoreCaricato;

  public TestGeneratoreLoadResponse() {
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
