package it.reply.genesis.model;

import java.io.Serializable;
import java.util.Objects;

public class TestCaseCaricatoLineaChiamanteKey implements Serializable {

  private static final long serialVersionUID = -376794186165434844L;

  private Long testCaseCaricato;
  
  private Short numLinea;
  
  public TestCaseCaricatoLineaChiamanteKey() {
  }

  public TestCaseCaricatoLineaChiamanteKey(Long testCaseCaricato, Short numLinea) {
    this.testCaseCaricato = testCaseCaricato;
    this.numLinea = numLinea;
  }

  @Override
  public int hashCode() {
    return Objects.hash(numLinea, testCaseCaricato);
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    if (getClass() != obj.getClass()) {
      return false;
    }
    TestCaseCaricatoLineaChiamanteKey other = (TestCaseCaricatoLineaChiamanteKey) obj;
    return Objects.equals(numLinea, other.numLinea) && Objects.equals(testCaseCaricato, other.testCaseCaricato);
  }

  public Long getTestCaseCaricato() {
    return testCaseCaricato;
  }

  public void setTestCaseCaricato(Long testCaseCaricato) {
    this.testCaseCaricato = testCaseCaricato;
  }

  public Short getNumLinea() {
    return numLinea;
  }

  public void setNumLinea(Short numLinea) {
    this.numLinea = numLinea;
  }

}
