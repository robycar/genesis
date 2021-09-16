package it.reply.genesis.api.test.payload;

import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import it.reply.genesis.api.generic.payload.PayloadRequest;
import it.reply.genesis.model.TemplateVO;

public class TemplateSearchRequest extends PayloadRequest {

  private static final long serialVersionUID = -8522764346684723848L;

  private Long id;
  
  @Size(max=TemplateVO.NOME_LENGTH)
  private String nome;
  
  @Min(value = 0)
  private Long durata;
  
  @Size(max=TemplateVO.TYPE_TEMPLATE_LENGTH)
  private String typeTemplate;

  @Size(max=TemplateVO.DESCRIZIONE_LENGTH)
  private String descrizione;

  private Long numChiamanti;
  
  private Long numChiamati;
  
  public TemplateSearchRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "nome", nome);
    writeField(sb, "durata", durata);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "typeTemplate", typeTemplate);
    writeField(sb, "numChiamanti", numChiamanti);
    writeField(sb, "numChiamati", numChiamati);
    
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

  public Long getNumChiamanti() {
    return numChiamanti;
  }

  public void setNumChiamanti(Long numChiamanti) {
    this.numChiamanti = numChiamanti;
  }

  public Long getNumChiamati() {
    return numChiamati;
  }

  public void setNumChiamati(Long numChiamati) {
    this.numChiamati = numChiamati;
  }

}
