package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TestGeneratoreRetrieveResponse extends PayloadResponse {

  private static final long serialVersionUID = -3883883149984932352L;
  
  private TestGeneratoreDTO testGeneratore;
  
  public TestGeneratoreRetrieveResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "testGeneratore", testGeneratore);
    super.writeFields(sb);
  }

  public TestGeneratoreDTO getTestGeneratore() {
    return testGeneratore;
  }

  public void setTestGeneratore(TestGeneratoreDTO testGeneratore) {
    this.testGeneratore = testGeneratore;
  }

  
}
