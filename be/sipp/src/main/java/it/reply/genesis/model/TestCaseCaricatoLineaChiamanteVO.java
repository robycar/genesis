package it.reply.genesis.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="TEST_CASE_CARICATO_LINEA_CHIAMANTE")
@IdClass(TestCaseCaricatoLineaChiamanteKey.class)
public class TestCaseCaricatoLineaChiamanteVO extends LineaChiamanteMappedVO {

  private static final long serialVersionUID = 8858519118863222431L;
  
  @Id
  @ManyToOne
  @JoinColumn(name="TCC_ID")
  private TestCaseCaricatoVO testCaseCaricato;
  
  public TestCaseCaricatoLineaChiamanteVO() {
  }

  public TestCaseCaricatoVO getTestCaseCaricato() {
    return testCaseCaricato;
  }

  public void setTestCaseCaricato(TestCaseCaricatoVO testCaseCaricato) {
    this.testCaseCaricato = testCaseCaricato;
  }

}
