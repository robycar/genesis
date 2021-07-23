package it.reply.sipp.service;

import java.util.List;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;

import it.reply.sipp.api.admin.payload.FunzioneDTO;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.model.UserVO;

public interface UserAuthenticationService {

	String login(String username, String password) throws BadCredentialsException;
	
	UserVO authenticateByToken(String token) throws AuthenticationException;
	
	void logout(String username);

	List<FunzioneDTO> listFunzioni() throws ApplicationException;
	
}
