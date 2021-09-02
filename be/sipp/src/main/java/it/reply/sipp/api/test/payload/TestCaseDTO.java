package it.reply.sipp.api.test.payload;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import it.reply.sipp.api.admin.payload.GruppoDTO;
import it.reply.sipp.api.files.payload.FileDTO;
import it.reply.sipp.api.generic.payload.TrackedDTO;
import it.reply.sipp.api.linea.payload.LineaDTO;
import it.reply.sipp.api.linea.payload.OutboundProxyDTO;
import it.reply.sipp.model.TestCaseVO;

public class TestCaseDTO extends TrackedDTO {

  private static final long serialVersionUID = 122065288335585218L;

  @NotNull
  private Long id;

  @Min(0)
  private Long expectedDuration;
  
  @Size(max = TestCaseVO.NOME_LENGTH)
  private String nome;
  
  @Size(max = TestCaseVO.DESCRIZIONE_LENGTH)
  private String descrizione;
  
  private TestCaseLineaDTO chiamato;
  
  private List<TestCaseLineaDTO> chiamanti;
  
  private TemplateDTO template;
  
  private GruppoDTO gruppo;

  public TestCaseDTO() {
  }

  public TestCaseDTO(Long id) {
    this.id = id;
  }
  
  public TestCaseDTO(TestCaseVO vo) {
    this(vo, false);
  }
  
  public TestCaseDTO(TestCaseVO vo, boolean includeLinee) {
    super(vo);
    this.id = vo.getId();
    this.nome = vo.getNome();
    this.descrizione = vo.getDescrizione();
    this.expectedDuration = vo.getExpectedDuration();
    this.gruppo = vo.getGruppo() == null ? null : new GruppoDTO(vo.getGruppo());
    if (includeLinee) {
      
      this.chiamato = new TestCaseLineaDTO();
      if (vo.getLineaChiamato() != null) {
        this.chiamato.setLinea(new LineaDTO(vo.getLineaChiamato()));
      }
      if (vo.getObpChiamato() != null) {
        this.chiamato.setProxy(new OutboundProxyDTO(vo.getObpChiamato()));
      }
      if (vo.getFileChiamato() != null) {
        this.chiamato.setFile(new FileDTO(vo.getFileChiamato()));
      }
      
      if (vo.getLineeChiamanti() != null) {
        this.chiamanti = vo.getLineeChiamanti()
            .stream().map(lvo -> new TestCaseLineaDTO(lvo))
            .collect(Collectors.toList());
      }
    }
    
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "nome", nome);
    writeField(sb, "template", template);
    writeField(sb, "expectedDuration", expectedDuration);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "chiamato", chiamato);
    writeField(sb, "chiamanti", chiamanti);
    writeField(sb, "gruppo", gruppo);
    super.writeFields(sb);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getExpectedDuration() {
    return expectedDuration;
  }

  public void setExpectedDuration(Long expectedDuration) {
    this.expectedDuration = expectedDuration;
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

  public TemplateDTO getTemplate() {
    return template;
  }

  public void setTemplate(TemplateDTO template) {
    this.template = template;
  }

  public GruppoDTO getGruppo() {
    return gruppo;
  }

  public void setGruppo(GruppoDTO gruppo) {
    this.gruppo = gruppo;
  }
  
}
