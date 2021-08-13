package it.reply.sipp.api.test.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class TestCaseRetrieveResponse extends PayloadResponse {

  private static final long serialVersionUID = -3445768661335570761L;

  private TestCaseDTO testCase;
  
  public TestCaseRetrieveResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "testCase", testCase);
    super.writeFields(sb);
  }

  public TestCaseDTO getTestCase() {
    return testCase;
  }

  public void setTestCase(TestCaseDTO testCase) {
    this.testCase = testCase;
  }

  
  
}
