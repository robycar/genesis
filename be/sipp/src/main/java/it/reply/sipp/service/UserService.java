package it.reply.sipp.service;

import java.util.List;

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
	
	List<UserDTO> listUsers(UserDTO criteria) throws ApplicationException;
	
	List<GrantedAuthority> readRolesAndFunctionsForUser(UserVO userId);

	UserDTO readUser(Long id) throws ApplicationException;

	void updateUser(UserDTO user, String password) throws ApplicationException;

	/**
	 * Aggiunge un nuovo utente al sistema
	 * @param userVO i dati dell'utente da aggiungere
	 * @param password la password (in chiaro) dell'utente da aggiungere
	 * @return l'utente creato (con il campo id valorizzato)
	 * @throws ApplicationException in caso di errori
	 */
	UserVO addUser(UserVO userVO, String password) throws ApplicationException;
	
}
