package it.reply.sipp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;

import it.reply.sipp.api.admin.payload.UserDTO;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.model.UserVO;

public interface UserService {

	/**
	 * Recupera tutti gli utenti registrati nel sistema.
	 * 
	 * @return una lista di utenti
	 */
	List<UserVO> listUsers();
	
	List<GrantedAuthority> readRolesAndFunctionsForUser(UserVO userId);

	Optional<UserVO> readUser(Long id);

	void updateUser(String userIdOrUsername, UserDTO user, String password, boolean updateRoles) throws ApplicationException;
	
}
