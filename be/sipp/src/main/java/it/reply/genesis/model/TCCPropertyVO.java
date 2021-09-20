package it.reply.genesis.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import it.reply.genesis.api.test.payload.PropertyDTO;

@Entity
@Table(name="TEST_CASE_CARICATO_PROPERTY")
public class TCCPropertyVO implements Serializable {

  private static final long serialVersionUID = -367619550280925702L;

  public static final int CHIAVE_LENGTH = 80;

  public static final int VALORE_LENGTH = 1024;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @ManyToOne
  @JoinColumn(name="TCC_ID")
  private TestCaseCaricatoVO testCaseCaricato;

  @Column(name="CHIAVE", length=CHIAVE_LENGTH)
  private String key;
  
  @Column(name="VALORE", length=VALORE_LENGTH)
  private String value;
  
  public TCCPropertyVO() {
  }

  public PropertyDTO toPropertyDTO() {
    PropertyDTO result = new PropertyDTO(this.id);
    result.setKey(this.key);
    result.setValue(value);
    
    return result;
  }
  
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public TestCaseCaricatoVO getTestCaseCaricato() {
    return testCaseCaricato;
  }

  public void setTestCaseCaricato(TestCaseCaricatoVO testCaseCaricato) {
    this.testCaseCaricato = testCaseCaricato;
  }

  public String getKey() {
    return key;
  }

  public void setKey(String key) {
    this.key = key;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

}
