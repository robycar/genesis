package it.reply.genesis.api.test.payload;

import java.util.List;

import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import it.reply.genesis.api.generic.payload.PayloadRequest;
import it.reply.genesis.model.NaturaLinea;
import it.reply.genesis.model.TemplateVO;
import it.reply.genesis.model.TipoTemplateVO;

public class TemplateSearchRequest extends PayloadRequest {

  private static final long serialVersionUID = -8522764346684723848L;

  private Long id;
  
  @Size(max=TemplateVO.NOME_LENGTH)
  private String nome;
  
  @Min(value = 0)
  private Long durata;
  
  @Size(max=TipoTemplateVO.NOME_LENGTH)
  private String typeTemplate;

  @Size(max=TemplateVO.DESCRIZIONE_LENGTH)
  private String descrizione;

  private NaturaLinea naturaChiamato;
  
  private List<NaturaLinea> naturaChiamanti;
  
  public TemplateSearchRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "nome", nome);
    writeField(sb, "durata", durata);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "typeTemplate", typeTemplate);
    writeField(sb, "naturaChiamato", naturaChiamato);
    writeField(sb, "naturaChiamanti", naturaChiamanti);
    
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

  public Long getDurata() {
    return durata;
  }

  public void setDurata(Long durata) {
    this.durata = durata;
  }

  public String getTypeTemplate() {
    return typeTemplate;
  }

  public void setTypeTemplate(String typeTemplate) {
    this.typeTemplate = typeTemplate;
  }

  public String getDescrizione() {
    return descrizione;
  }

  public void setDescrizione(String descrizione) {
    this.descrizione = descrizione;
  }

  public NaturaLinea getNaturaChiamato() {
    return naturaChiamato;
  }

  public void setNaturaChiamato(NaturaLinea naturaChiamato) {
    this.naturaChiamato = naturaChiamato;
  }

  public List<NaturaLinea> getNaturaChiamanti() {
    return naturaChiamanti;
  }

  public void setNaturaChiamanti(List<NaturaLinea> naturaChiamanti) {
    this.naturaChiamanti = naturaChiamanti;
  }
  
}
