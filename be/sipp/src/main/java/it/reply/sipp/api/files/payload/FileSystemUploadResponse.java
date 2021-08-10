package it.reply.sipp.api.files.payload;

import java.util.List;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class FileSystemUploadResponse extends PayloadResponse {

  private static final long serialVersionUID = 738706295462903929L;
  
  private List<FileDTO> list;
  
  public FileSystemUploadResponse() {
  }

  public List<FileDTO> getList() {
    return list;
  }

  public void setList(List<FileDTO> list) {
    this.list = list;
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "list", list);
    super.writeFields(sb);
  }


  
  
}
