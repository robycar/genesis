package it.reply.genesis.api.test.payload;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

import javax.validation.constraints.NotNull;

import it.reply.genesis.api.admin.payload.GruppoDTO;
import it.reply.genesis.api.files.payload.FileDTO;
import it.reply.genesis.api.generic.payload.DTO;
import it.reply.genesis.api.linea.payload.LineaGeneratoreDTO;
import it.reply.genesis.api.linea.payload.OutboundProxyDTO;
import it.reply.genesis.model.LoadedEntityStatus;
import it.reply.genesis.model.TestGeneratoreCaricatoVO;

public class TestGeneratoreCaricatoDTO extends DTO {

  private static final long serialVersionUID = 4697186673054929869L;

  @NotNull
  private Long id;
  
  private String nome;
  
  private String descrizione;
  
  private LineaGeneratoreDTO lineaChiamante;
  
  private LineaGeneratoreDTO lineaChiamato;
  
  private OutboundProxyDTO proxyChiamante;
  
  private OutboundProxyDTO proxyChiamato;
  
  private TemplateDTO template;
  
  private LoadedEntityStatus stato;

  private GruppoDTO gruppo;

  private Timestamp loadedWhen;

  private LocalDateTime scheduleDateTime;
  
  private Long delay;

  private Instant startDate;
  
  private Instant endDate;
  
  private String loadedBy;
  
  private String startedBy;
  
  private Long rate;
  
  private Long durataTraffico;
  
  private Integer version;
  
  private String pathInstance;
  
  private TestGeneratoreDTO testGeneratore;
  
  private List<FileDTO> folder;
  

  public TestGeneratoreCaricatoDTO() {
  }

  public TestGeneratoreCaricatoDTO(@NotNull Long id) {
    this.id = id;
  }

  public TestGeneratoreCaricatoDTO(TestGeneratoreCaricatoVO vo) {
    this(vo, false);
  }
  
  public TestGeneratoreCaricatoDTO(TestGeneratoreCaricatoVO vo, 
      boolean includeLinee) {
    this.id = vo.getId();
    this.version = vo.getVersion();
    this.endDate = vo.getEndDate();
    this.startDate = vo.getStartDate();
    this.loadedBy = vo.getCreatedBy();
    this.loadedWhen = vo.getCreationDate();
    this.nome = vo.getNome();
    this.descrizione = vo.getDescrizione();
    this.rate = vo.getRate();
    this.durataTraffico = vo.getDurataTraffico();
    this.scheduleDateTime = vo.getScheduleDateTime();
    this.delay = vo.getDelay();
    this.pathInstance = vo.getPathInstance();
    if (vo.getTemplate() != null) {
      this.template = new TemplateDTO(vo.getTemplate());
    }
    if (vo.getTestGeneratore() != null) {
      this.testGeneratore = new TestGeneratoreDTO(vo.getTestGeneratore());
    }
    if (vo.getGruppo() != null) {
      this.gruppo = new GruppoDTO(vo.getGruppo());
    }
    this.stato = vo.getStato();
    if (includeLinee) {
      this.lineaChiamante = new LineaGeneratoreDTO(vo.getLineaChiamante());
      this.lineaChiamato = new LineaGeneratoreDTO(vo.getLineaChiamato());
      this.proxyChiamante = new OutboundProxyDTO(vo.getProxyChiamante());
      this.proxyChiamato = new OutboundProxyDTO(vo.getProxyChiamato());
    }
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "nome", nome);
    writeField(sb, "stato", stato);
    writeField(sb, "rate", rate);
    writeField(sb, "version", version);
    
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "loadedBy", loadedBy);
    writeField(sb, "loadedWhen", loadedWhen);
    writeField(sb, "scheduleDateTime", scheduleDateTime);
    writeField(sb, "delay", delay);
    writeField(sb, "durataTraffico", durataTraffico);
    writeField(sb, "startDate", startDate);
    writeField(sb, "endDate", endDate);
    writeField(sb, "pathInstance", pathInstance);
    writeField(sb, "gruppo", gruppo);
    writeField(sb, "lineaChiamante", lineaChiamante);
    writeField(sb, "lineaChiamato", lineaChiamato);
    writeField(sb, "proxyChiamante", proxyChiamante);
    writeField(sb, "proxyChiamato", proxyChiamato);
    writeField(sb, "template", template);
    writeField(sb, "testGeneratore", testGeneratore);
    writeField(sb, "folder", folder);

    
    super.writeFields(sb);
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

  public LineaGeneratoreDTO getLineaChiamante() {
    return lineaChiamante;
  }

  public void setLineaChiamante(LineaGeneratoreDTO lineaChiamante) {
    this.lineaChiamante = lineaChiamante;
  }

  public LineaGeneratoreDTO getLineaChiamato() {
    return lineaChiamato;
  }

  public void setLineaChiamato(LineaGeneratoreDTO lineaChiamato) {
    this.lineaChiamato = lineaChiamato;
  }

  public OutboundProxyDTO getProxyChiamante() {
    return proxyChiamante;
  }

  public void setProxyChiamante(OutboundProxyDTO proxyChiamante) {
    this.proxyChiamante = proxyChiamante;
  }

  public OutboundProxyDTO getProxyChiamato() {
    return proxyChiamato;
  }

  public void setProxyChiamato(OutboundProxyDTO proxyChiamato) {
    this.proxyChiamato = proxyChiamato;
  }

  public TemplateDTO getTemplate() {
    return template;
  }

  public void setTemplate(TemplateDTO template) {
    this.template = template;
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

  public LocalDateTime getScheduleDateTime() {
    return scheduleDateTime;
  }

  public void setScheduleDateTime(LocalDateTime scheduleDateTime) {
    this.scheduleDateTime = scheduleDateTime;
  }

  public Long getDelay() {
    return delay;
  }

  public void setDelay(Long delay) {
    this.delay = delay;
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

  public Long getRate() {
    return rate;
  }

  public void setRate(Long rate) {
    this.rate = rate;
  }

  public TestGeneratoreDTO getTestGeneratore() {
    return testGeneratore;
  }

  public void setTestGeneratore(TestGeneratoreDTO testGeneratore) {
    this.testGeneratore = testGeneratore;
  }

  public Long getDurataTraffico() {
    return durataTraffico;
  }

  public void setDurataTraffico(Long durataTraffico) {
    this.durataTraffico = durataTraffico;
  }

  public Integer getVersion() {
    return version;
  }

  public void setVersion(Integer version) {
    this.version = version;
  }

  public List<FileDTO> getFolder() {
    return folder;
  }

  public TestGeneratoreCaricatoDTO setFolder(List<FileDTO> folder) {
    this.folder = folder;
    return this;
  }

  public String getPathInstance() {
    return pathInstance;
  }

  public void setPathInstance(String pathInstance) {
    this.pathInstance = pathInstance;
  }

}
