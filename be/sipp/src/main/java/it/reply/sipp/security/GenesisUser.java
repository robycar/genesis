package it.reply.sipp.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import it.reply.sipp.api.admin.payload.UserDTO;

public class GenesisUser extends User {

  private static final long serialVersionUID = 8255706303267024912L;
  
  private UserDTO originalUser;

  public GenesisUser(String username, String password, Collection<? extends GrantedAuthority> authorities, UserDTO originalUser) {
    super(username, password, authorities);
    this.originalUser = originalUser;
  }

  public UserDTO getOriginalUser() {
    return originalUser;
  }

}
