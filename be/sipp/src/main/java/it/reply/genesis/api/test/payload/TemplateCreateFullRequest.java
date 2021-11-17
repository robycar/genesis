package it.reply.genesis.api.test.payload;

import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

import it.reply.genesis.api.generic.payload.PayloadRequest;
import it.reply.genesis.model.NaturaLinea;
import it.reply.genesis.model.TemplateVO;
import it.reply.genesis.model.TipoTemplateVO;

public class TemplateCreateFullRequest extends PayloadRequest {

  private static final long serialVersionUID = 8686703249705557802L;

  @NotEmpty
  @Size(max = TemplateVO.NOME_LENGTH)
  private String nome;
  
  @PositiveOrZero
  private Long durata;
  
  @NotNull
  @Size(max=TipoTemplateVO.NOME_LENGTH)
  private String typeTemplate;
  
  @Size(max=TemplateVO.DESCRIZIONE_LENGTH)
  private String descrizione;

  private List<MultipartFile> file;
  
  private String chiamato;
  
  private NaturaLinea naturaChiamato;
  
  private List<String> chiamanti;
  
  private List<NaturaLinea> naturaChiamanti;

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "nome", nome);
    writeField(sb, "durata", durata);
    writeField(sb, "typeTemplate", typeTemplate);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "file", file == null ? 0 : file.size());
    writeField(sb, "chiamato", chiamato);
    writeField(sb, "naturaChiamato", naturaChiamato);
    writeField(sb, "chiamanti", chiamanti);
    writeField(sb, "naturaChiamanti", naturaChiamanti);
    
    super.writeFields(sb);
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

  public String getChiamato() {
    return chiamato;
  }

  public void setChiamato(String chiamato) {
    this.chiamato = chiamato;
  }

  public List<String> getChiamanti() {
    return chiamanti;
  }

  public void setChiamanti(List<String> chiamanti) {
    this.chiamanti = chiamanti;
  }

  public List<MultipartFile> getFile() {
    return file;
  }

  public void setFile(List<MultipartFile> file) {
    this.file = file;
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
