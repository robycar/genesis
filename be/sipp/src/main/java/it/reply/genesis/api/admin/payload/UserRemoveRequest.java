package it.reply.genesis.api.admin.payload;

import javax.validation.constraints.NotNull;

import it.reply.genesis.api.generic.payload.PayloadRequest;

public class UserRemoveRequest extends PayloadRequest {

  private static final long serialVersionUID = 7731331209684296221L;

  @NotNull(message = "Il campo id &egrave; obbligatorio")
  private Long id;
  
  public UserRemoveRequest() {
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
