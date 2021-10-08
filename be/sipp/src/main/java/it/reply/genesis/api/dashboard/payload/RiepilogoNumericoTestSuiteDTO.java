package it.reply.genesis.api.dashboard.payload;

import it.reply.genesis.api.generic.payload.DTO;

public class RiepilogoNumericoTestSuiteDTO extends DTO {

  private static final long serialVersionUID = -4019448598799286032L;

  private long caricate;
  
  private long schedulate;
  
  private long completate;
  
  private long testTotali;
  
  private long testOK;
  
  private long testKO;
  
  public RiepilogoNumericoTestSuiteDTO() {
  }
  
  @Override
  protected void writeFields(StringBuilder sb) {
    super.writeFields(sb);
  }

  public long getPianificate() {
    return caricate + schedulate;
  }
  
  public long getCaricate() {
    return caricate;
  }

  public void setCaricate(long caricate) {
    this.caricate = caricate;
  }

  public long getSchedulate() {
    return schedulate;
  }

  public void setSchedulate(long schedulate) {
    this.schedulate = schedulate;
  }

  public long getCompletate() {
    return completate;
  }

  public void setCompletate(long completate) {
    this.completate = completate;
  }

  public long getTestTotali() {
    return testTotali;
  }

  public void setTestTotali(long testTotali) {
    this.testTotali = testTotali;
  }

  public long getTestOK() {
    return testOK;
  }

  public void setTestOK(long testOK) {
    this.testOK = testOK;
  }

  public long getTestKO() {
    return testKO;
  }

  public void setTestKO(long testKO) {
    this.testKO = testKO;
  }

  
  
}
