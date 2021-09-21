package it.reply.genesis.api.dashboard.payload;

import it.reply.genesis.api.generic.payload.PayloadRequest;
import it.reply.genesis.service.dto.TestListType;

public class DashboardInfoRequest extends PayloadRequest {

  private static final long serialVersionUID = 1577895578786522300L;

  private TestListType includeTestCaseOfType;
  
  private TestListType includeTestSuiteOfType;
  
  private TestListType includeTestGeneratoreOfType;
  
  public DashboardInfoRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "includeTestCaseOfType", includeTestCaseOfType);
    writeField(sb, "includeTestSuiteOfType", includeTestSuiteOfType);
    writeField(sb, "includeTestGeneratoreOfType", includeTestGeneratoreOfType);
    super.writeFields(sb);
  }

  public TestListType getIncludeTestCaseOfType() {
    return includeTestCaseOfType;
  }

  public void setIncludeTestCaseOfType(TestListType includeTestCaseOfType) {
    this.includeTestCaseOfType = includeTestCaseOfType;
  }

  public TestListType getIncludeTestSuiteOfType() {
    return includeTestSuiteOfType;
  }

  public void setIncludeTestSuiteOfType(TestListType includeTestSuiteOfType) {
    this.includeTestSuiteOfType = includeTestSuiteOfType;
  }

  public TestListType getIncludeTestGeneratoreOfType() {
    return includeTestGeneratoreOfType;
  }

  public void setIncludeTestGeneratoreOfType(TestListType includeTestGeneratoreOfType) {
    this.includeTestGeneratoreOfType = includeTestGeneratoreOfType;
  }

}
