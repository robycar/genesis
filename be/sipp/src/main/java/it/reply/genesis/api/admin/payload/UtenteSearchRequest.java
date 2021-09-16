package it.reply.genesis.api.admin.payload;

import javax.validation.constraints.NotNull;

import it.reply.genesis.api.generic.payload.PayloadRequest;

public class UtenteSearchRequest extends PayloadRequest {

  private static final long serialVersionUID = 1316843901202859424L;

  @NotNull(message = "Il campo user &egrave; obbligatorio")
  private UserDTO user;
  
  public UtenteSearchRequest() {
  }

  public UserDTO getUser() {
    return user;
  }

  public void setUser(UserDTO user) {
    this.user = user;
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "user", user);
    super.writeFields(sb);
  }

  
}
