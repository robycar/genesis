package it.reply.genesis.api.test.payload;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import it.reply.genesis.api.admin.payload.GruppoDTO;
import it.reply.genesis.api.generic.payload.DTO;
import it.reply.genesis.model.LoadedEntityStatus;
import it.reply.genesis.model.TestCaseCaricatoVO;
import it.reply.genesis.model.TestSuiteCaricataVO;

public class TestSuiteCaricataDTO extends DTO {

  private static final long serialVersionUID = -173111758011074746L;

  private Long id;
  
  private Integer version;

  private String nome;
  
  private String descrizione;
  
  private LoadedEntityStatus stato;
  
  private GruppoDTO gruppo;
  
  private Timestamp loadedWhen;
  
  private TestSuiteDTO testSuite;
  
  private Instant startDate;
  
  private Instant endDate;
  
  private String loadedBy;
  
  private String startedBy;
  
  private List<TestCaseCaricatoDTO> testCases;
  
  public TestSuiteCaricataDTO() {
  }

  public TestSuiteCaricataDTO(TestSuiteCaricataVO vo) {
    this(vo, false);
  }
  
  public TestSuiteCaricataDTO(TestSuiteCaricataVO vo, boolean includeTestCases) {
    this.id = vo.getId();
    this.version = vo.getVersion();
    this.nome = vo.getNome();
    this.descrizione = vo.getDescrizione();
    this.stato = vo.getStato();
    this.loadedWhen = vo.getLoadedWhen();
    this.startDate = vo.getStartDate();
    this.endDate = vo.getEndDate();
    this.loadedBy = vo.getLoadedBy();
    this.loadedWhen = vo.getLoadedWhen();
    this.gruppo = new GruppoDTO(vo.getGruppo());
    this.testSuite = new TestSuiteDTO(vo.getTestSuite());
    
    if (includeTestCases) {
      assignTestCases(vo.getTestCases());
    }

  }
  
  public void assignTestCases(List<TestCaseCaricatoVO> testCases) {
    if (testCases == null) {
      this.testCases = null;
    } else {
      this.testCases = testCases.stream()
          .map(TestCaseCaricatoDTO::new)
          .collect(Collectors.toList());
    }
    
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "nome", nome);
    writeField(sb, "version", version);
    writeField(sb, "stato", stato);
    writeField(sb, "loadedWhen", loadedWhen);
    writeField(sb, "loadedBy", loadedBy);
    writeField(sb, "startDate", startDate);
    writeField(sb, "startedBy", startedBy);
    writeField(sb, "endDate", endDate);
    writeField(sb, "testSuite", testSuite);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "testCases", testCases);
    super.writeFields(sb);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getVersion() {
    return version;
  }

  public void setVersion(Integer version) {
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

  public GruppoDTO getGruppo() {
    return gruppo;
  }

  public void setGruppo(GruppoDTO gruppo) {
    this.gruppo = gruppo;
  }

  public Timestamp getLoadedWhen() {
    return loadedWhen;
  }

  public void setLoadedWhen(Timestamp loadedWhen) {
    this.loadedWhen = loadedWhen;
  }

  public TestSuiteDTO getTestSuite() {
    return testSuite;
  }

  public void setTestSuite(TestSuiteDTO testSuite) {
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

  public List<TestCaseCaricatoDTO> getTestCases() {
    return testCases;
  }

  public void setTestCases(List<TestCaseCaricatoDTO> testCases) {
    this.testCases = testCases;
  }

}
