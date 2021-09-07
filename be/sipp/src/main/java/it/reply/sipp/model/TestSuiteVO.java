package it.reply.sipp.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="TEST_SUITE")
public class TestSuiteVO extends BaseEntity {

  private static final long serialVersionUID = 543879934117587488L;

  public static final int NOME_LENGTH = 80;
  public static final int DESCRIZIONE_LENGTH = 1000;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(name="NOME", length = NOME_LENGTH)
  private String nome;
  
  @Column(name="DESCRIZIONE", length = DESCRIZIONE_LENGTH)
  private String descrizione;
  
  @ManyToOne
  @JoinColumn(name="ID_GRUPPO", nullable = false)
  private GruppoVO gruppo;
  
  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "TEST_SUITE_TEST",
      joinColumns = @JoinColumn(name="TEST_SUITE_ID"),
      inverseJoinColumns = @JoinColumn(name="TEST_CASE_ID"))
  private Set<TestCaseVO> testCases;
  
  public TestSuiteVO() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getDescrizione() {
    return descrizione;
  }

  public void setDescrizione(String descrizione) {
    this.descrizione = descrizione;
  }

  public GruppoVO getGruppo() {
    return gruppo;
  }

  public void setGruppo(GruppoVO gruppo) {
    this.gruppo = gruppo;
  }

  public Set<TestCaseVO> getTestCases() {
    return testCases;
  }

  public void setTestCases(Set<TestCaseVO> testCases) {
    this.testCases = testCases;
  }

}
