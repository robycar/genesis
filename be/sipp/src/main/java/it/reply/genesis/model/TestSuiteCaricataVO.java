package it.reply.genesis.model;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Version;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name="TEST_SUITE_CARICATA")
public class TestSuiteCaricataVO implements Serializable {

  private static final long serialVersionUID = -7465162127406480031L;

  public static final int NOME_LENGTH = TestSuiteVO.NOME_LENGTH;

  public static final int DESCRIZIONE_LENGTH = TestSuiteVO.DESCRIZIONE_LENGTH;

  public static final int LOADED_BY_LENGTH = UserVO.NOME_LENGTH;

  public static final int STARTED_BY_LENGTH = UserVO.NOME_LENGTH;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Version
  private int version;

  @Column(name="NOME", length = NOME_LENGTH)
  private String nome;
  
  @Column(name="DESCRIZIONE", length = DESCRIZIONE_LENGTH)
  private String descrizione;
  
  @Column(name="STATO")
  @Enumerated(EnumType.STRING)
  private LoadedEntityStatus stato;
  
  @ManyToOne(optional = false)
  @JoinColumn(name = "ID_GRUPPO")
  private GruppoVO gruppo;
  
  @CreationTimestamp
  @Column(name="LOADED_WHEN")
  private Timestamp loadedWhen;
  
  @ManyToOne
  @JoinColumn(name="ID_TEST_SUITE")
  private TestSuiteVO testSuite;
  
  @Column(name="START_DATE")
  private Instant startDate;
  
  @Column(name="END_DATE")
  private Instant endDate;
  
  @Column(name="LOADED_BY", length = LOADED_BY_LENGTH)
  private String loadedBy;
  
  @Column(name="STARTED_BY", length = STARTED_BY_LENGTH)
  private String startedBy;
  
  @OneToMany(mappedBy = "testSuite")
  private List<TestCaseCaricatoVO> testCases;
  
  public TestSuiteCaricataVO() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public int getVersion() {
    return version;
  }

  public void setVersion(int version) {
    this.version = version;
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

  public LoadedEntityStatus getStato() {
    return stato;
  }

  public void setStato(LoadedEntityStatus stato) {
    this.stato = stato;
  }

  public GruppoVO getGruppo() {
    return gruppo;
  }

  public void setGruppo(GruppoVO gruppo) {
    this.gruppo = gruppo;
  }

  public Timestamp getLoadedWhen() {
    return loadedWhen;
  }

  public void setLoadedWhen(Timestamp loadedWhen) {
    this.loadedWhen = loadedWhen;
  }

  public TestSuiteVO getTestSuite() {
    return testSuite;
  }

  public void setTestSuite(TestSuiteVO testSuite) {
    this.testSuite = testSuite;
  }

  public Instant getStartDate() {
    return startDate;
  }

  public void setStartDate(Instant startDate) {
    this.startDate = startDate;
  }

  public Instant getEndDate() {
    return endDate;
  }

  public void setEndDate(Instant endDate) {
    this.endDate = endDate;
  }

  public String getLoadedBy() {
    return loadedBy;
  }

  public void setLoadedBy(String loadedBy) {
    this.loadedBy = loadedBy;
  }

  public String getStartedBy() {
    return startedBy;
  }

  public void setStartedBy(String startedBy) {
    this.startedBy = startedBy;
  }

  public List<TestCaseCaricatoVO> getTestCases() {
    return testCases;
  }

  public void setTestCases(List<TestCaseCaricatoVO> testCases) {
    this.testCases = testCases;
  }

}
