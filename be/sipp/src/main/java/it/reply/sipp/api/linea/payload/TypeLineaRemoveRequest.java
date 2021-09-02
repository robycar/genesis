package it.reply.sipp.api.linea.payload;

import it.reply.sipp.api.generic.payload.PayloadRequest;

public class TypeLineaRemoveRequest extends PayloadRequest {

  private static final long serialVersionUID = -2722236365084460258L;
  
  private Long id;
  
  public TypeLineaRemoveRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    super.writeFields(sb);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  
}
