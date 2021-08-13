package it.reply.sipp.api.test.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class TestCaseUpdateResponse extends PayloadResponse {

  private static final long serialVersionUID = 4439453884461269801L;
  
  private TestCaseDTO testCase;
  
  public TestCaseUpdateResponse() {
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
