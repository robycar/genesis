package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.files.controller.FileSystemController;
import it.reply.genesis.api.generic.payload.DTO;
import it.reply.genesis.model.FileSystemVO;
import it.reply.genesis.model.NaturaLinea;
import it.reply.genesis.model.TemplateLineaChiamanteVO;


public class TemplateFileDTO extends DTO {

  private static final long serialVersionUID = -1705370928366082424L;

  private Long id;
  
  private String path;
  
  private String url;
  
  private NaturaLinea natura;
  
  public TemplateFileDTO() {
  }

  public TemplateFileDTO(Long id) {
    super();
    this.id = id;
  }

  public TemplateFileDTO(TemplateLineaChiamanteVO lineaChiamanteVO) {
    this(lineaChiamanteVO.getFile(), lineaChiamanteVO.getNatura());
  }
  
  public TemplateFileDTO(FileSystemVO fsVO, NaturaLinea natura) {
    this.id = fsVO.getId();
    this.path = fsVO.getPath();
    this.url = FileSystemController.FS_API_PATH + "/" + fsVO.getScope() + "/" + fsVO.getIdRef() + "/" + this.id.toString();
    this.natura = natura;
  }
  

  public String getPath() {
    return path;
  }

  public void setPath(String path) {
    this.path = path;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public NaturaLinea getNatura() {
    return natura;
  }

  public void setNatura(NaturaLinea natura) {
    this.natura = natura;
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "natura", natura);
    writeField(sb, "path", path);
    writeField(sb, "url", url);
    super.writeFields(sb);
  }
  
}
