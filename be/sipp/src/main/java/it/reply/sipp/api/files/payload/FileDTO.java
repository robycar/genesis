package it.reply.sipp.api.files.payload;

import it.reply.sipp.api.files.controller.FileSystemController;
import it.reply.sipp.api.generic.payload.TrackedDTO;
import it.reply.sipp.model.FileSystemVO;

public class FileDTO extends TrackedDTO {

  private static final long serialVersionUID = -5435769889057157452L;

  private Long id;

  private String path;
  
  private String url;
  
  public FileDTO() {
  }

  public FileDTO(FileSystemVO vo) {
    super(vo);
    this.id = vo.getId();
    this.path = vo.getPath();
    this.url = FileSystemController.urlForVO(vo);
        
  }
  
  
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "path", path);
    writeField(sb, "url", url);
    super.writeFields(sb);
  }

  
  
}
