package it.reply.sipp.api.test.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class TestCaseAddResponse extends PayloadResponse {

  private static final long serialVersionUID = -7144257605929209363L;
  
  private TestCaseDTO testCase;
  
  public TestCaseAddResponse() {
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
