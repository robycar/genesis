package it.reply.genesis.model;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

import javax.persistence.CascadeType;
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
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Version;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name="TEST_CASE_CARICATO")
public class TestCaseCaricatoVO implements Serializable {

  private static final long serialVersionUID = 3872224304173267384L;

  public static final int NOME_LENGTH = 80;

  public static final int DESCRIZIONE_LENGTH = 255;

  public static final int PATH_INSTANCE_LENGTH = 4096;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="ID")
  private Long id;
  
  @CreationTimestamp
  @Column(name="LOADED_WHEN")
  private Timestamp loadedWhen;  

  @Column(name="START_DATE")
  private Instant startDate;
  
  @Column(name="END_DATE")
  private Instant endDate;
  
  @Column(name="LOADED_BY")
  private String loadedBy;
  
  @Column(name="STARTED_BY")
  private String startedBy;
  
  @Column(name="EXPECTED_DURATION")
  private Long expectedDuration;
  
  @Version
  private int version;
  
  @Column(name="NOME", length = NOME_LENGTH)
  private String nome;
  
  @Column(name = "DESCRIZIONE", length = DESCRIZIONE_LENGTH)
  private String descrizione;
  
  @Column(name="PATH_INSTANCE", length=PATH_INSTANCE_LENGTH)
  private String pathInstance;

  @ManyToOne
  @JoinColumn(name="ID_LINEA_CHIAMATO")
  private LineaVO lineaChiamato;
  
  @ManyToOne
  @JoinColumn(name="ID_OBP_CHIAMATO")
  private OutboundProxyVO obpChiamato;
  
  @ManyToOne
  @JoinColumn(name="FILE_SYSTEM_ID_CHIAMATO")
  private FileSystemVO fileChiamato;
  
  @Enumerated(EnumType.STRING)
  @Column(name="STATO", nullable = false)
  private TestCaseCaricatoStato stato;
  
  @Enumerated(EnumType.STRING)
  @Column(name="EXECUTION_RESULT")
  private ExecutionResult result;
  
  @ManyToOne
  @JoinColumn(name="ID_GRUPPO")
  private GruppoVO gruppo;
  
  @ManyToOne
  @JoinColumn(name="ID_TEMPLATE")
  private TemplateVO template;
  
  @OneToMany(mappedBy = "testCaseCaricato", orphanRemoval = true)
  private List<TestCaseCaricatoPropertyVO> properties;
  
  @OneToMany(mappedBy = "testCaseCaricato", cascade=CascadeType.REMOVE)
  @OrderBy("numLinea")
  private List<TestCaseCaricatoLineaChiamanteVO> lineeChiamanti;
  
  @ManyToOne
  @JoinColumn(name="ID_TEST_CASE")
  private TestCaseVO testCase;
  
  public TestCaseCaricatoVO() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Timestamp getLoadedWhen() {
    return loadedWhen;
  }

  public void setLoadedWhen(Timestamp loadedWhen) {
    this.loadedWhen = loadedWhen;
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

  public Long getExpectedDuration() {
    return expectedDuration;
  }

  public void setExpectedDuration(Long expectedDuration) {
    this.expectedDuration = expectedDuration;
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

  public LineaVO getLineaChiamato() {
    return lineaChiamato;
  }

  public void setLineaChiamato(LineaVO lineaChiamato) {
    this.lineaChiamato = lineaChiamato;
  }

  public OutboundProxyVO getObpChiamato() {
    return obpChiamato;
  }

  public void setObpChiamato(OutboundProxyVO obpChiamato) {
    this.obpChiamato = obpChiamato;
  }

  public FileSystemVO getFileChiamato() {
    return fileChiamato;
  }

  public void setFileChiamato(FileSystemVO fileChiamato) {
    this.fileChiamato = fileChiamato;
  }

  public TestCaseCaricatoStato getStato() {
    return stato;
  }

  public void setStato(TestCaseCaricatoStato stato) {
    this.stato = stato;
  }

  public String getPathInstance() {
    return pathInstance;
  }

  public void setPathInstance(String pathInstance) {
    this.pathInstance = pathInstance;
  }

  public GruppoVO getGruppo() {
    return gruppo;
  }

  public void setGruppo(GruppoVO gruppo) {
    this.gruppo = gruppo;
  }

  public TemplateVO getTemplate() {
    return template;
  }

  public void setTemplate(TemplateVO template) {
    this.template = template;
  }

  public List<TestCaseCaricatoPropertyVO> getProperties() {
    return properties;
  }

  public void setProperties(List<TestCaseCaricatoPropertyVO> properties) {
    this.properties = properties;
  }

  public List<TestCaseCaricatoLineaChiamanteVO> getLineeChiamanti() {
    return lineeChiamanti;
  }

  public void setLineeChiamanti(List<TestCaseCaricatoLineaChiamanteVO> lineeChiamanti) {
    this.lineeChiamanti = lineeChiamanti;
  }

  public TestCaseVO getTestCase() {
    return testCase;
  }

  public void setTestCase(TestCaseVO testCase) {
    this.testCase = testCase;
  }

  public ExecutionResult getResult() {
    return result;
  }

  public void setResult(ExecutionResult result) {
    this.result = result;
  }

}
