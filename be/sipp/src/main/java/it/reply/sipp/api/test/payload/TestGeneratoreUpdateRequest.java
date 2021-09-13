package it.reply.sipp.api.test.payload;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import it.reply.sipp.api.generic.payload.PayloadRequest;
import it.reply.sipp.api.linea.payload.LineaGeneratoreDTO;
import it.reply.sipp.api.linea.payload.OutboundProxyDTO;
import it.reply.sipp.model.TestGeneratoreVO;

public class TestGeneratoreUpdateRequest extends PayloadRequest {

  private static final long serialVersionUID = 1L;

  @NotNull
  private Long id;
  
  @NotNull
  private Integer version;
  
  @Size(max = TestGeneratoreVO.NOME_LENGTH)
  private String nome;
  
  @Size(max = TestGeneratoreVO.DESCRIZIONE_LENGTH)
  private String descrizione;
  
  private LineaGeneratoreDTO lineaChiamante;
  
  private LineaGeneratoreDTO lineaChiamato;
  
  private OutboundProxyDTO proxyChiamante;
  
  private OutboundProxyDTO proxyChiamato;
  
  public TestGeneratoreUpdateRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "nome", nome);
    writeField(sb, "lineaChiamante", lineaChiamante);
    writeField(sb, "lineaChiamato", lineaChiamato);
    writeField(sb, "proxyChiamante", proxyChiamante);
    writeField(sb, "proxyChiamato", proxyChiamato);
    writeField(sb, "descrizione", descrizione);
    
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

  public Integer getVersion() {
    return version;
  }

  public void setVersion(Integer version) {
    this.version = version;
  }

}
