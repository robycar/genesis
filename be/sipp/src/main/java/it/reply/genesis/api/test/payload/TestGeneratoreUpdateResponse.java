package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TestGeneratoreUpdateResponse extends PayloadResponse {

  private static final long serialVersionUID = 1927364407459334166L;
  
  private TestGeneratoreDTO testGeneratore;
  
  public TestGeneratoreUpdateResponse() {
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
