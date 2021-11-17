package it.reply.genesis.api.test.payload;

import java.util.List;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.util.LinkedMultiValueMap;

import it.reply.genesis.api.generic.payload.PayloadRequest;
import it.reply.genesis.model.TemplateVO;
import it.reply.genesis.model.TipoTemplateVO;

public class TemplateUpdateRequest extends PayloadRequest {

  private static final long serialVersionUID = 1631401952687051494L;

  @NotNull
  private Long id;
  
  @Size(max=TemplateVO.NOME_LENGTH)
  private String nome;
  
  @Min(value = 0)
  private Long durata;
  
  @Size(max=TipoTemplateVO.NOME_LENGTH)
  private String typeTemplate;

  @NotNull
  private Integer version;
  
  @Size(max=TemplateVO.DESCRIZIONE_LENGTH)
  private String descrizione;
  
  private LinkedMultiValueMap<String, TemplateFileDTO> fileLinks;
  
  private TemplateFileDTO chiamato;
  
  private List<TemplateFileDTO> chiamanti;

  public TemplateUpdateRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "nome", nome);
    writeField(sb, "durata", durata);
    writeField(sb, "typeTemplate", typeTemplate);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "version", version);
    writeField(sb, "chiamato", chiamato);
    writeField(sb, "chiamanti", chiamanti);
    writeField(sb, "fileLinks", fileLinks);
    
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

  public Integer getVersion() {
    return version;
  }

  public void setVersione(Integer version) {
    this.version = version;
  }

  public String getDescrizione() {
    return descrizione;
  }

  public void setDescrizione(String descrizione) {
    this.descrizione = descrizione;
  }

  public void setVersion(Integer version) {
    this.version = version;
  }

  public LinkedMultiValueMap<String, TemplateFileDTO> getFileLinks() {
    return fileLinks;
  }

  public void setFileLinks(LinkedMultiValueMap<String, TemplateFileDTO> fileLinks) {
    this.fileLinks = fileLinks;
  }

  public TemplateFileDTO getChiamato() {
    return chiamato;
  }

  public void setChiamato(TemplateFileDTO chiamato) {
    this.chiamato = chiamato;
  }

  public List<TemplateFileDTO> getChiamanti() {
    return chiamanti;
  }

  public void setChiamanti(List<TemplateFileDTO> chiamanti) {
    this.chiamanti = chiamanti;
  }
  
}
