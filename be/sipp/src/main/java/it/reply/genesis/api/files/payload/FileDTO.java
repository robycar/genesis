package it.reply.genesis.api.files.payload;

import javax.validation.constraints.NotNull;

import it.reply.genesis.api.files.controller.FileSystemController;
import it.reply.genesis.api.generic.payload.TrackedDTO;
import it.reply.genesis.model.FileSystemVO;

public class FileDTO extends TrackedDTO {

  private static final long serialVersionUID = -5435769889057157452L;

  @NotNull
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
