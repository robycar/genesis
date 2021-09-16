package it.reply.genesis.api.admin.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class LevelRetrieveResponse extends PayloadResponse {

  private static final long serialVersionUID = -3438921721823351191L;
  
  private LevelDTO level;
  
  public LevelRetrieveResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "level", level);
    super.writeFields(sb);
  }

  public LevelDTO getLevel() {
    return level;
  }

  public void setLevel(LevelDTO level) {
    this.level = level;
  }

  
}
