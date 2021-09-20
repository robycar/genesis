package it.reply.genesis.api.test.payload;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import it.reply.genesis.api.admin.payload.GruppoDTO;
import it.reply.genesis.api.files.payload.FileDTO;
import it.reply.genesis.api.generic.payload.DTO;
import it.reply.genesis.api.linea.payload.LineaDTO;
import it.reply.genesis.api.linea.payload.OutboundProxyDTO;
import it.reply.genesis.model.FileSystemVO;
import it.reply.genesis.model.TCCPropertyVO;
import it.reply.genesis.model.TestCaseCaricatoStato;
import it.reply.genesis.model.TestCaseCaricatoVO;

public class TestCaseCaricatoDTO extends DTO {

  private static final long serialVersionUID = 5319137074629513311L;

  private Long id;
  
  private Timestamp loadedWhen;  

  private Instant startDate;
  
  private Instant endDate;
  
  private String loadedBy;
  
  private String startedBy;
  
  private Long expectedDuration;
  
  private Integer version;
  
  private String nome;
  
  private String descrizione;
  
  private TestCaseCaricatoStato stato;
  
  private String pathInstance;
  
  private GruppoDTO gruppo;
  
  private TemplateDTO template;
  
  private TestCaseDTO testCase;
  
  private List<PropertyDTO> properties;
  
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
    this.startDate = vo.getStartDate();
    this.endDate = vo.getEndDate();
    this.expectedDuration = vo.getExpectedDuration();
    this.version = vo.getVersion();
    this.nome = vo.getNome();
    this.descrizione = vo.getDescrizione();
    this.stato = vo.getStato();
    this.pathInstance = vo.getPathInstance();
    this.gruppo = new GruppoDTO(vo.getGruppo());
    this.template = new TemplateDTO(vo.getTemplate());
    this.testCase = new TestCaseDTO(vo.getTestCase());
    
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
  
  public TestCaseCaricatoDTO assignProperties(Collection<? extends TCCPropertyVO> props) {
    if (props != null) {
      if (this.properties == null) {
        this.properties = props.stream()
            .map(TCCPropertyVO::toPropertyDTO)
            .collect(Collectors.toList());
      } else {
        props.forEach(pvo -> this.properties.add(pvo.toPropertyDTO()));
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
    writeField(sb, "expectedDuration", expectedDuration);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "stato", stato);
    writeField(sb, "pathInstance", pathInstance);
    writeField(sb, "gruppo", gruppo);
    writeField(sb, "chiamato", chiamato);
    writeField(sb, "chiamanti", chiamanti);
    writeField(sb, "template", template);
    writeField(sb, "testCase", testCase);
    writeField(sb, "properties", properties);
    
    
    super.writeFields(sb);
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

  public List<PropertyDTO> getProperties() {
    return properties;
  }

  public void setProperties(List<PropertyDTO> properties) {
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

}
