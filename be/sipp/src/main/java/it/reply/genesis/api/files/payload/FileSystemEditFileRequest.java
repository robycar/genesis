package it.reply.genesis.api.files.payload;

import javax.validation.constraints.NotEmpty;

import it.reply.genesis.api.generic.payload.PayloadRequest;

public class FileSystemEditFileRequest extends PayloadRequest {

  private static final long serialVersionUID = -2686982546401585349L;
  
  @NotEmpty
  private byte[] content;
  
  public FileSystemEditFileRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "content", content);
    super.writeFields(sb);
  }

  public byte[] getContent() {
    return content;
  }

  public void setContent(byte[] content) {
    this.content = content;
  }

}
