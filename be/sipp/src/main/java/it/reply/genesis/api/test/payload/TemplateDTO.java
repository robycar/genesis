package it.reply.genesis.api.test.payload;

import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.util.LinkedMultiValueMap;

import it.reply.genesis.api.admin.payload.GruppoDTO;
import it.reply.genesis.api.files.payload.FileDTO;
import it.reply.genesis.api.generic.payload.TrackedDTO;
import it.reply.genesis.model.TemplateVO;
import it.reply.genesis.model.TipoTemplateVO;

public class TemplateDTO extends TrackedDTO {

  private static final long serialVersionUID = -6369149600591821164L;

  @NotNull
  private Long id;
  
  private String nome;
  
  private Long durata;
  
  @Size(max=TipoTemplateVO.NOME_LENGTH)
  private String typeTemplate;

  @Size(max=TemplateVO.DESCRIZIONE_LENGTH)
  private String descrizione;

  private GruppoDTO gruppo;
  
  private List<FileDTO> folder;
  
  private TemplateFileDTO chiamato;
  
  private List<TemplateFileDTO> chiamanti;
  
  LinkedMultiValueMap<String, TemplateFileDTO> fileLinks;
  
  public TemplateDTO() {
  }

  public TemplateDTO(long id) {
    this.id = id;
  }

  public TemplateDTO(TemplateVO vo) {
    this(vo, false);
  }
  
  public TemplateDTO(TemplateVO vo, boolean includeLinee) {
    super(vo);
    this.id = vo.getId();
    this.nome = vo.getNome();
    this.durata = vo.getDurata();
    this.typeTemplate = vo.getTypeTemplate() == null ? null : vo.getTypeTemplate().getNome();
    this.descrizione = vo.getDescrizione();
    this.gruppo = vo.getGruppo() == null ? null : new GruppoDTO(vo.getGruppo());
    if (includeLinee) {
      fileLinks = new LinkedMultiValueMap<>();
    }
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

  public List<FileDTO> getFolder() {
    return folder;
  }

  public void setFolder(List<FileDTO> folder) {
    this.folder = folder;
  }

  public LinkedMultiValueMap<String, TemplateFileDTO> getFileLinks() {
    return fileLinks;
  }

  public void setFileLinks(LinkedMultiValueMap<String, TemplateFileDTO> fileLinks) {
    this.fileLinks = fileLinks;
  }

  public GruppoDTO getGruppo() {
    return gruppo;
  }

  public void setGruppo(GruppoDTO gruppo) {
    this.gruppo = gruppo;
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

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "nome", nome);
    writeField(sb, "durata", durata);
    writeField(sb, "typeTemplate", typeTemplate);
    writeField(sb, "chiamato", chiamato);
    writeField(sb, "chiamanti", chiamanti);

    writeField(sb, "folder", folder);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "gruppo", gruppo);
    writeField(sb, "fileLinks", fileLinks);
    super.writeFields(sb);
  }
  
  
  
}
