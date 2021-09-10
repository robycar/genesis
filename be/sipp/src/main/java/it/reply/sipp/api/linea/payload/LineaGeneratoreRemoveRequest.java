package it.reply.sipp.api.linea.payload;

import javax.validation.constraints.NotNull;

import it.reply.sipp.api.generic.payload.PayloadRequest;

public class LineaGeneratoreRemoveRequest extends PayloadRequest {

  private static final long serialVersionUID = 3814663991440213253L;
  
  @NotNull
  private Long id;
  
  public LineaGeneratoreRemoveRequest() {
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
