package it.reply.sipp.service;

import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.model.LevelVO;

public interface LevelService  {

	/**
	 * Recupera un level dal db a partire dal suo id. Se il level non esiste
	 * &egrave; lanciata un'eccezione.
	 * @param id l'identificatore del level
	 * @return il level letto
	 * @throws ApplicationException in caso di errori
	 */
	LevelVO read(Long id) throws ApplicationException;

}
