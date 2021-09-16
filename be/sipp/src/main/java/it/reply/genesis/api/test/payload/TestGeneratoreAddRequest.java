package it.reply.genesis.api.test.payload;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import it.reply.genesis.api.generic.payload.PayloadRequest;
import it.reply.genesis.api.linea.payload.LineaGeneratoreDTO;
import it.reply.genesis.api.linea.payload.OutboundProxyDTO;
import it.reply.genesis.model.TestGeneratoreVO;

public class TestGeneratoreAddRequest extends PayloadRequest {

  private static final long serialVersionUID = -5226013050401988908L;

  @NotEmpty
  @Size(max = TestGeneratoreVO.NOME_LENGTH)
  private String nome;
  
  @Size(max = TestGeneratoreVO.DESCRIZIONE_LENGTH)
  private String descrizione;
  
  @NotNull
  private LineaGeneratoreDTO lineaChiamante;
  
  @NotNull
  private LineaGeneratoreDTO lineaChiamato;
  
  @NotNull
  private OutboundProxyDTO proxyChiamante;
  
  @NotNull
  private OutboundProxyDTO proxyChiamato;
  
  @NotNull
  private TemplateDTO template;
  
  public TestGeneratoreAddRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "nome", nome);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "lineaChiamante", lineaChiamante);
    writeField(sb, "lineaChiamato", lineaChiamato);
    writeField(sb, "proxyChiamante", proxyChiamante);
    writeField(sb, "proxyChiamato", proxyChiamato);
    writeField(sb, "template", template);
    
    super.writeFields(sb);
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
