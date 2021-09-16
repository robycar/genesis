package it.reply.genesis.api.files.payload;

import java.util.List;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class FileSystemListFilesResponse extends PayloadResponse {

  private static final long serialVersionUID = 7969031644252463750L;
  
  private List<FileDTO> list;
  
  public FileSystemListFilesResponse() {
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
