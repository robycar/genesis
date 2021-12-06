package it.reply.genesis.api.test.payload;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import it.reply.genesis.api.admin.payload.GruppoDTO;
import it.reply.genesis.api.files.payload.FileDTO;
import it.reply.genesis.api.generic.payload.DTO;
import it.reply.genesis.api.linea.payload.LineaDTO;
import it.reply.genesis.api.linea.payload.OutboundProxyDTO;
import it.reply.genesis.model.ExecutionResult;
import it.reply.genesis.model.FileSystemVO;
import it.reply.genesis.model.LoadedEntityStatus;
import it.reply.genesis.model.TestCaseCaricatoPropertyVO;
import it.reply.genesis.model.TestCaseCaricatoVO;

public class TestCaseCaricatoDTO extends DTO {

  private static final long serialVersionUID = 5319137074629513311L;
  
  public static final String PROPERTY_CALL_ID = "call-id";
  
  public static final String PROPERTY_PCAP = "pcap";
  
  public static final String CALL_ID_VALUE_IF_MISSING = "Non disponibile";

  private Long id;
  
  private Timestamp loadedWhen;
  
  private LocalDateTime scheduleDateTime;
  
  private Long delay;

  private Instant startDate;
  
  private Instant endDate;
  
  private String loadedBy;
  
  private String startedBy;
  
  private Long expectedDuration;
  
  private Integer version;
  
  private String nome;
  
  private String descrizione;
  
  private LoadedEntityStatus stato;
  
  private ExecutionResult result;
  
  private String pathInstance;
  
  private GruppoDTO gruppo;
  
  private TemplateDTO template;
  
  private TestCaseDTO testCase;
  
  private Map<String,String> properties;
  
  private TestCaseLineaDTO chiamato;
  
  private List<TestCaseLineaDTO> chiamanti;
  
  private List<FileDTO> folder;
  
  public TestCaseCaricatoDTO() {
  }

  public TestCaseCaricatoDTO(Long id) {
    this.id = id;
  }

  public TestCaseCaricatoDTO(TestCaseCaricatoVO vo) {
    this(vo, false, false);
  }
  
  public TestCaseCaricatoDTO(TestCaseCaricatoVO vo, 
      boolean includeProperties, boolean includeLinee) {
    this.id = vo.getId();
    this.loadedBy = vo.getLoadedBy();
    this.loadedWhen = vo.getLoadedWhen();
    this.scheduleDateTime = vo.getScheduleDateTime();
    this.delay = vo.getDelay();
    this.startDate = vo.getStartDate();
    this.endDate = vo.getEndDate();
    this.expectedDuration = vo.getExpectedDuration();
    this.version = vo.getVersion();
    this.nome = vo.getNome();
    this.descrizione = vo.getDescrizione();
    this.stato = vo.getStato();
    this.result = vo.getResult();
    this.pathInstance = vo.getPathInstance();
    this.gruppo = new GruppoDTO(vo.getGruppo());
    if (vo.getTemplate() != null) {
      this.template = new TemplateDTO(vo.getTemplate());
    }
    if (vo.getTestCase() != null) {
      this.testCase = new TestCaseDTO(vo.getTestCase());
    }
    
    if (includeProperties) {
      assignProperties(vo.getProperties());
    }
    
    if (includeLinee) {
      TestCaseLineaDTO lineaDTO = new TestCaseLineaDTO();
      if (vo.getLineaChiamato() != null) {
        lineaDTO.setLinea(new LineaDTO(vo.getLineaChiamato()));
      }
      
      if (vo.getObpChiamato() != null) {
        lineaDTO.setProxy(new OutboundProxyDTO(vo.getObpChiamato()));
      }
      
      if (vo.getFileChiamato() != null) {
        lineaDTO.setFile(new FileDTO(vo.getFileChiamato()));
      }
      this.chiamato = lineaDTO;
      
      if (vo.getLineeChiamanti() != null) {
        this.chiamanti = vo.getLineeChiamanti()
          .stream()
          .map(lcvl -> {
            TestCaseLineaDTO tcl = new TestCaseLineaDTO();
            if (lcvl.getLinea() != null) {
              tcl.setLinea(new LineaDTO(lcvl.getLinea()));
            }
            if (lcvl.getOutboundProxy() != null) {
              tcl.setProxy(new OutboundProxyDTO(lcvl.getOutboundProxy()));
            }
            if (lcvl.getFile() != null) {
              tcl.setFile(new FileDTO(lcvl.getFile()));
            }
            return tcl;
          }).collect(Collectors.toList());
      }
      
    }
    
  }

  public TestCaseCaricatoDTO assignFolder(Collection<FileSystemVO> folderVO) {
    if (folderVO != null) {
      if (this.folder == null) {
        this.folder = folderVO.stream()
            .map(FileDTO::new)
            .collect(Collectors.toList());
      } else {
        folderVO.forEach(vo -> this.folder.add(new FileDTO(vo)));
      }
    }
    return this;
  }
  
  public TestCaseCaricatoDTO assignProperties(Collection<? extends TestCaseCaricatoPropertyVO> props) {
    if (props != null) {
      if (this.properties == null) {
        this.properties = props.stream()
            .collect(Collectors.toMap(TestCaseCaricatoPropertyVO::getKey, TestCaseCaricatoPropertyVO::getValue));
      } else {
        props.forEach(pvo -> this.properties.putIfAbsent(pvo.getKey(), pvo.getValue()));
      }
    }
    return this;
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "nome", nome);
    writeField(sb, "version", version);
    writeField(sb, "loadedBy", loadedBy);
    writeField(sb, "loadedWhen", loadedWhen);
    writeField(sb, "scheduleDateTime", scheduleDateTime);
    writeField(sb, "delay", delay);
    writeField(sb, "expectedDuration", expectedDuration);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "stato", stato);
    writeField(sb, "result", result);
    writeField(sb, "pathInstance", pathInstance);
    writeField(sb, "gruppo", gruppo);
    writeField(sb, "chiamato", chiamato);
    writeField(sb, "chiamanti", chiamanti);
    writeField(sb, "template", template);
    writeField(sb, "testCase", testCase);
    writeField(sb, "properties", properties);
    writeField(sb, "folder", folder);
    
    super.writeFields(sb);
  }

  // Campi virtuali:
  public String getCallId() {
    if (properties != null) {
      return properties.getOrDefault(PROPERTY_CALL_ID, CALL_ID_VALUE_IF_MISSING);
    }
    return CALL_ID_VALUE_IF_MISSING;
  }
  
  public String getPcap() {
    if (properties != null) {
      return properties.get(PROPERTY_PCAP);
    }
    return null;
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

  public TestCaseLineaDTO getChiamato() {
    return chiamato;
  }

  public void setChiamato(TestCaseLineaDTO chiamato) {
    this.chiamato = chiamato;
  }

  public List<TestCaseLineaDTO> getChiamanti() {
    return chiamanti;
  }

  public void setChiamanti(List<TestCaseLineaDTO> chiamanti) {
    this.chiamanti = chiamanti;
  }

  public LoadedEntityStatus getStato() {
    return stato;
  }

  public void setStato(LoadedEntityStatus stato) {
    this.stato = stato;
  }

  public String getPathInstance() {
    return pathInstance;
  }

  public void setPathInstance(String pathInstance) {
    this.pathInstance = pathInstance;
  }

  public GruppoDTO getGruppo() {
    return gruppo;
  }

  public void setGruppo(GruppoDTO gruppo) {
    this.gruppo = gruppo;
  }

  public TemplateDTO getTemplate() {
    return template;
  }

  public void setTemplate(TemplateDTO template) {
    this.template = template;
  }

  public Map<String, String> getProperties() {
    return properties;
  }

  public void setProperties(Map<String, String> properties) {
    this.properties = properties;
  }

  public List<FileDTO> getFolder() {
    return folder;
  }

  public void setFolder(List<FileDTO> folder) {
    this.folder = folder;
  }

  public TestCaseDTO getTestCase() {
    return testCase;
  }

  public void setTestCase(TestCaseDTO testCase) {
    this.testCase = testCase;
  }

  public ExecutionResult getResult() {
    return result;
  }

  public void setResult(ExecutionResult result) {
    this.result = result;
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

}
