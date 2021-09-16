package it.reply.genesis.api.admin.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class LevelUpdateLevelResponse extends PayloadResponse {

  private static final long serialVersionUID = -5043907811993400577L;
  
  private LevelDTO level;
  
  public LevelUpdateLevelResponse() {
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
