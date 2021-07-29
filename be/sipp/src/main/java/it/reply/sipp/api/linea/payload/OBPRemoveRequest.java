package it.reply.sipp.api.linea.payload;

import javax.validation.constraints.NotNull;

import it.reply.sipp.api.generic.payload.PayloadRequest;

public class OBPRemoveRequest extends PayloadRequest {

  private static final long serialVersionUID = 3191837850856070300L;
  
  @NotNull
  private Long id;
  
  public OBPRemoveRequest() {
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
