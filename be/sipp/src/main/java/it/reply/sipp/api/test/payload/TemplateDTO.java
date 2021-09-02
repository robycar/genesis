package it.reply.sipp.api.test.payload;

import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.util.LinkedMultiValueMap;

import it.reply.sipp.api.admin.payload.GruppoDTO;
import it.reply.sipp.api.files.payload.FileDTO;
import it.reply.sipp.api.generic.payload.TrackedDTO;
import it.reply.sipp.model.TemplateVO;

public class TemplateDTO extends TrackedDTO {

  private static final long serialVersionUID = -6369149600591821164L;

  @NotNull
  private Long id;
  
  private String nome;
  
  private Long durata;
  
  @Size(max=TemplateVO.TYPE_TEMPLATE_LENGTH)
  private String typeTemplate;

  @Size(max=TemplateVO.DESCRIZIONE_LENGTH)
  private String descrizione;

  private GruppoDTO gruppo;
  
  List<FileDTO> folder;
  
  LinkedMultiValueMap<String, TemplateFileDTO> fileLinks;
  
  public TemplateDTO() {
  }

  public TemplateDTO(long id) {
    this.id = id;
  }

  public TemplateDTO(TemplateVO vo) {
    super(vo);
    this.id = vo.getId();
    this.nome = vo.getNome();
    this.durata = vo.getDurata();
    this.typeTemplate = vo.getTypeTemplate();
    this.descrizione = vo.getDescrizione();
    this.gruppo = vo.getGruppo() == null ? null : new GruppoDTO(vo.getGruppo());
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

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "nome", nome);
    writeField(sb, "durata", durata);
    writeField(sb, "typeTemplate", typeTemplate);
    writeField(sb, "folder", folder);
    writeField(sb, "fileLinks", fileLinks);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "gruppo", gruppo);
    super.writeFields(sb);
  }
  
  
  
}
