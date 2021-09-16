package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TestGeneratoreAddResponse extends PayloadResponse {

  private static final long serialVersionUID = -5355375920768468781L;
  
  private TestGeneratoreDTO testGeneratore;
  
  public TestGeneratoreAddResponse() {
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
