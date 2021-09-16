package it.reply.genesis.service;

import java.util.List;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;

import it.reply.genesis.api.admin.payload.FunzioneDTO;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.model.UserVO;

public interface UserAuthenticationService {

	String login(String username, String password) throws BadCredentialsException;
	
	UserVO authenticateByToken(String token) throws AuthenticationException;
	
	void logout(String username);

	List<FunzioneDTO> listFunzioni() throws ApplicationException;
	
}
