package it.reply.genesis.service;

import java.util.List;

import it.reply.genesis.api.admin.payload.GruppoDTO;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.model.GruppoVO;

public interface GruppoService {

	List<GruppoVO> listGroups();

	/**
	 * Aggiunge un gruppo nel sistema.
	 * 
	 * @param vo il gruppo da aggiungere
	 * @return il gruppo aggiunto, con l'identificatore autogenerato
	 * @throws ApplicationException 
	 */
	GruppoVO addGruppo(GruppoVO vo) throws ApplicationException;
	
	/**
	 * Recupera un gruppo dal db a partire dal suo identificatore
	 * @param id l'identificatore del gruppo
	 * @return il gruppo trovato
	 * @throws ApplicationException in caso di errore o se il gruppo non pu&ograve; essere trovato
	 */
	GruppoVO readVO(long id) throws ApplicationException;
	
	/**
	 * Modifica i campi del gruppo identificato da {@link GruppoVO#getId()}.
	 * @param vo il gruppo da modificare
	 * @return il gruppo modificato
	 * @throws ApplicationException in caso di errori
	 */
	GruppoVO updateGruppo(GruppoVO vo) throws ApplicationException;

	/**
	 * Rimuove un gruppo dal db
	 * @param id l'identificatore del gruppo
	 * @throws ApplicationException in caso di errori
	 */
	void removeGruppo(long id) throws ApplicationException;

	/**
	 * Recupera un gruppo dal sistema a partire dal suo identificatore.
	 * @param id l'identificatore del gruppo
	 * @return il gruppo recuperato
	 * @throws ApplicationException in caso di errori.
	 */
  GruppoDTO readGruppo(long id) throws ApplicationException;

}
