package it.reply.sipp.model;

import java.io.Serializable;
import java.util.Objects;

public class TestCaseLineaChiamanteKey implements Serializable {

  private static final long serialVersionUID = 6508123382568466603L;

  private Long testCase;
  
  private Short numLinea;
  
  public TestCaseLineaChiamanteKey() {
  }

  public TestCaseLineaChiamanteKey(Long testCase, Short numLinea) {
    this.testCase = testCase;
    this.numLinea = numLinea;
  }
  
  public static TestCaseLineaChiamanteKey of(long testCase, short numLinea) {
    return new TestCaseLineaChiamanteKey(testCase, numLinea);
  }

  public Long getTestCase() {
    return testCase;
  }

  public void setTestCase(Long testCase) {
    this.testCase = testCase;
  }

  public Short getNumLinea() {
    return numLinea;
  }

  public void setNumLinea(Short numLinea) {
    this.numLinea = numLinea;
  }

  @Override
  public int hashCode() {
    return Objects.hash(numLinea, testCase);
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
    TestCaseLineaChiamanteKey other = (TestCaseLineaChiamanteKey) obj;
    return Objects.equals(numLinea, other.numLinea) && Objects.equals(testCase, other.testCase);
  }
  
}
