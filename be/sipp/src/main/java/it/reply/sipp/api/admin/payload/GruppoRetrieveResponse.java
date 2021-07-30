package it.reply.sipp.api.admin.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class GruppoRetrieveResponse extends PayloadResponse {

  private static final long serialVersionUID = 2903788085367238686L;
  
  private GruppoDTO gruppo;
  
  public GruppoRetrieveResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "gruppo", gruppo);
    super.writeFields(sb);
  }

  public GruppoDTO getGruppo() {
    return gruppo;
  }

  public void setGruppo(GruppoDTO gruppo) {
    this.gruppo = gruppo;
  }
  
  

}
