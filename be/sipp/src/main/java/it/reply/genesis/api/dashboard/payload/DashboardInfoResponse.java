package it.reply.genesis.api.dashboard.payload;

import java.util.List;

import it.reply.genesis.api.generic.payload.PayloadResponse;
import it.reply.genesis.api.test.payload.TestCaseCaricatoDTO;
import it.reply.genesis.api.test.payload.TestGeneratoreCaricatoDTO;
import it.reply.genesis.api.test.payload.TestSuiteCaricataDTO;

public class DashboardInfoResponse extends PayloadResponse {

  private static final long serialVersionUID = -3274302069519448455L;

  private List<TestCaseCaricatoDTO> testCaseList;
  
  private List<TestSuiteCaricataDTO> testSuiteList;
  
  private List<TestGeneratoreCaricatoDTO> testGeneratoList;
  
  private RiepilogoNumericoTestDTO riepilogoTestCaseGiorni;
  
  private RiepilogoNumericoTestDTO riepilogoTestCaseSettimana;
  
  private RiepilogoNumericoTestSuiteDTO riepilogoTestSuiteGiorno;
  
  private RiepilogoNumericoTestSuiteDTO riepilogoTestSuiteSettimana;
  
  private RiepilogoNumericoTestGeneratoreDTO riepilogoTestGeneratoreGiorno;
  
  private RiepilogoNumericoTestGeneratoreDTO riepilogoTestGeneratoreSettimana;
  
  public DashboardInfoResponse() {
  }

  public List<TestCaseCaricatoDTO> getTestCaseList() {
    return testCaseList;
  }

  public void setTestCaseList(List<TestCaseCaricatoDTO> testCaseList) {
    this.testCaseList = testCaseList;
  }

  public List<TestSuiteCaricataDTO> getTestSuiteList() {
    return testSuiteList;
  }

  public void setTestSuiteList(List<TestSuiteCaricataDTO> testSuiteList) {
    this.testSuiteList = testSuiteList;
  }

  public List<TestGeneratoreCaricatoDTO> getTestGeneratoList() {
    return testGeneratoList;
  }

  public void setTestGeneratoList(List<TestGeneratoreCaricatoDTO> testGeneratoList) {
    this.testGeneratoList = testGeneratoList;
  }

  public RiepilogoNumericoTestDTO getRiepilogoTestCaseGiorni() {
    return riepilogoTestCaseGiorni;
  }

  public void setRiepilogoTestCaseGiorni(RiepilogoNumericoTestDTO riepilogoTestCaseGiorni) {
    this.riepilogoTestCaseGiorni = riepilogoTestCaseGiorni;
  }

  public RiepilogoNumericoTestDTO getRiepilogoTestCaseSettimana() {
    return riepilogoTestCaseSettimana;
  }

  public void setRiepilogoTestCaseSettimana(RiepilogoNumericoTestDTO riepilogoTestCaseSettimana) {
    this.riepilogoTestCaseSettimana = riepilogoTestCaseSettimana;
  }

  public RiepilogoNumericoTestSuiteDTO getRiepilogoTestSuiteGiorno() {
    return riepilogoTestSuiteGiorno;
  }

  public void setRiepilogoTestSuiteGiorno(RiepilogoNumericoTestSuiteDTO riepilogoTestSuiteGiorno) {
    this.riepilogoTestSuiteGiorno = riepilogoTestSuiteGiorno;
  }

  public RiepilogoNumericoTestSuiteDTO getRiepilogoTestSuiteSettimana() {
    return riepilogoTestSuiteSettimana;
  }

  public void setRiepilogoTestSuiteSettimana(RiepilogoNumericoTestSuiteDTO riepilogoTestSuiteSettimana) {
    this.riepilogoTestSuiteSettimana = riepilogoTestSuiteSettimana;
  }

  public RiepilogoNumericoTestGeneratoreDTO getRiepilogoTestGeneratoreGiorno() {
    return riepilogoTestGeneratoreGiorno;
  }

  public void setRiepilogoTestGeneratoreGiorno(RiepilogoNumericoTestGeneratoreDTO riepilogoTestGeneratoreGiorno) {
    this.riepilogoTestGeneratoreGiorno = riepilogoTestGeneratoreGiorno;
  }

  public RiepilogoNumericoTestGeneratoreDTO getRiepilogoTestGeneratoreSettimana() {
    return riepilogoTestGeneratoreSettimana;
  }

  public void setRiepilogoTestGeneratoreSettimana(RiepilogoNumericoTestGeneratoreDTO riepilogoTestGeneratoreSettimana) {
    this.riepilogoTestGeneratoreSettimana = riepilogoTestGeneratoreSettimana;
  }

}
