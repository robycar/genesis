package it.reply.sipp.api.test.payload;

import it.reply.sipp.api.files.controller.FileSystemController;
import it.reply.sipp.api.generic.payload.DTO;
import it.reply.sipp.model.FileSystemVO;
import it.reply.sipp.model.TemplateFileVO;

public class TemplateFileDTO extends DTO {

  private static final long serialVersionUID = -1705370928366082424L;

  private Long id;
  
  private String path;
  
  private String url;
  
  public TemplateFileDTO() {
  }

  public TemplateFileDTO(Long id) {
    super();
    this.id = id;
  }



  public TemplateFileDTO(TemplateFileVO fileVO) {
    this.id = fileVO.getFile().getId();
    this.path = fileVO.getFile().getPath();
    
    FileSystemVO fsVO = fileVO.getFile();
    this.url = FileSystemController.FS_API_PATH + "/" + fsVO.getScope() + "/" + fsVO.getIdRef() + "/" + this.id.toString();
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

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "path", path);
    writeField(sb, "url", url);
    super.writeFields(sb);
  }
  
}
