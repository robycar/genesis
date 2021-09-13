package it.reply.sipp.api.test.payload;

import javax.validation.constraints.NotNull;

import it.reply.sipp.api.generic.payload.TrackedDTO;
import it.reply.sipp.api.linea.payload.LineaGeneratoreDTO;
import it.reply.sipp.api.linea.payload.OutboundProxyDTO;
import it.reply.sipp.model.TestGeneratoreVO;

public class TestGeneratoreDTO extends TrackedDTO {

  private static final long serialVersionUID = 5678991733781777512L;

  @NotNull
  private Long id;
  
  private String nome;
  
  private String descrizione;
  
  private LineaGeneratoreDTO lineaChiamante;
  
  private LineaGeneratoreDTO lineaChiamato;
  
  private OutboundProxyDTO proxyChiamante;
  
  private OutboundProxyDTO proxyChiamato;
  
  private TemplateDTO template;
    
  public TestGeneratoreDTO() {
  }

  public TestGeneratoreDTO(@NotNull Long id) {
    super();
    this.id = id;
  }

  public TestGeneratoreDTO(TestGeneratoreVO vo) {
    super(vo);
    this.id = vo.getId();
    this.nome = vo.getNome();
    this.descrizione = vo.getDescrizione();
    this.lineaChiamante = new LineaGeneratoreDTO(vo.getLineaChiamante());
    this.lineaChiamato = new LineaGeneratoreDTO(vo.getLineaChiamato());
    this.proxyChiamante = new OutboundProxyDTO(vo.getProxyChiamante());
    this.proxyChiamato = new OutboundProxyDTO(vo.getProxyChiamato());
    this.template = new TemplateDTO(vo.getTemplate());
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "nome", nome);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "lineaChiamante", lineaChiamante);
    writeField(sb, "lineaChiamato", lineaChiamato);
    writeField(sb, "proxyChiamante", proxyChiamante);
    writeField(sb, "proxyChiamato", proxyChiamato);
    writeField(sb, "template", template);
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

  
}
