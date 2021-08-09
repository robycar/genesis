package it.reply.sipp.api.test.payload;

import javax.validation.constraints.NotNull;

import it.reply.sipp.api.generic.payload.PayloadRequest;

public class TemplateRemoveRequest extends PayloadRequest {

  private static final long serialVersionUID = 5131868156362575765L;
  
  @NotNull
  private Long id;
  
  public TemplateRemoveRequest() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    super.writeFields(sb);
  }

  
}
