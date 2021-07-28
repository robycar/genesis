package it.reply.sipp.api.admin.payload;

import java.util.List;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class UtenteSearchResponse extends PayloadResponse {

  private static final long serialVersionUID = -9027647829260446322L;
  
  private List<UserDTO> users;
  
  public UtenteSearchResponse() {
  }

  public List<UserDTO> getUsers() {
    return users;
  }

  public void setUsers(List<UserDTO> users) {
    this.users = users;
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "users", users);
    super.writeFields(sb);
  }

  
  
}
