package it.reply.genesis.api.auth.payload;

import it.reply.genesis.api.generic.payload.DTO;

public class ApplicationInfoDTO extends DTO {

  private static final long serialVersionUID = -4997696415937549753L;
  
  private String version = "TODO 1.0";
  
  public ApplicationInfoDTO() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "version", version);
    super.writeFields(sb);
  }

  public String getVersion() {
    return version;
  }

  public void setVersion(String version) {
    this.version = version;
  }

}
