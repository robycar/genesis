package it.reply.genesis.api.test.payload;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import it.reply.genesis.api.generic.payload.PayloadRequest;
import it.reply.genesis.model.TemplateVO;
import it.reply.genesis.model.TipoTemplateVO;

public class TemplateAddRequest extends PayloadRequest {

  private static final long serialVersionUID = -1016285572972054067L;

  @NotEmpty
  @Size(max = TemplateVO.NOME_LENGTH)
  private String nome;
  
  private Long durata;
  
  @NotNull
  @Size(max=TipoTemplateVO.NOME_LENGTH)
  private String typeTemplate;
  
  @Size(max=TemplateVO.DESCRIZIONE_LENGTH)
  private String descrizione;

  public TemplateAddRequest() {
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

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "nome", nome);
    writeField(sb, "durata", durata);
    writeField(sb, "typeTemplate", typeTemplate);
    writeField(sb, "descrizione", descrizione);
    super.writeFields(sb);
  }

  
}
