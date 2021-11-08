package it.reply.genesis.api.dashboard.payload;

import it.reply.genesis.api.generic.payload.PayloadRequest;
import it.reply.genesis.service.dto.TestListType;

public class DashboardInfoRequest extends PayloadRequest {

  private static final long serialVersionUID = 1577895578786522300L;

  private TestListType includeTestCaseOfType;
  
  private TestListType includeTestSuiteOfType;
  
  private TestListType includeTestGeneratoreOfType;
  
  private boolean includeRiepilogoTestCase;
  
  private boolean includeRiepilogoTestSuite;
  
  private boolean includeRiepilogoTestGeneratore;
  
  public DashboardInfoRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "includeTestCaseOfType", includeTestCaseOfType);
    writeField(sb, "includeTestSuiteOfType", includeTestSuiteOfType);
    writeField(sb, "includeTestGeneratoreOfType", includeTestGeneratoreOfType);
    writeField(sb, "includeRiepilogoTestCase", includeRiepilogoTestCase);
    writeField(sb, "includeRiepilogoTestSuite", includeRiepilogoTestSuite);
    writeField(sb, "includeRiepilogoTestGeneratore", includeRiepilogoTestGeneratore);
    
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

  public boolean isIncludeRiepilogoTestCase() {
    return includeRiepilogoTestCase;
  }

  public void setIncludeRiepilogoTestCase(boolean includeRiepilogoTestCase) {
    this.includeRiepilogoTestCase = includeRiepilogoTestCase;
  }

  public boolean isIncludeRiepilogoTestSuite() {
    return includeRiepilogoTestSuite;
  }

  public void setIncludeRiepilogoTestSuite(boolean includeRiepilogoTestSuite) {
    this.includeRiepilogoTestSuite = includeRiepilogoTestSuite;
  }

  public boolean isIncludeRiepilogoTestGeneratore() {
    return includeRiepilogoTestGeneratore;
  }

  public void setIncludeRiepilogoTestGeneratore(boolean includeRiepilogoTestGeneratore) {
    this.includeRiepilogoTestGeneratore = includeRiepilogoTestGeneratore;
  }

  
}
