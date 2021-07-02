package it.reply.sipp.service;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;

import it.reply.sipp.model.UserVO;

public interface UserAuthenticationService {

	String login(String username, String password) throws BadCredentialsException;
	
	UserVO authenticateByToken(String token) throws AuthenticationException;
	
	void logout(String username);
	
	
}
