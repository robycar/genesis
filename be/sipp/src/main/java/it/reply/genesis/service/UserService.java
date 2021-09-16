package it.reply.genesis.service;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;

import it.reply.genesis.api.admin.payload.UserDTO;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.model.UserVO;

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

	/**
	 * Rimuove un utente dal sistema
	 * 
	 * @param id l'identificatore dell'utente da rimuovere
	 * @throws ApplicationException
	 */
  void removeUser(Long id) throws ApplicationException;
	
}
