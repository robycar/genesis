package it.reply.sipp.service;

import java.util.List;

import it.reply.sipp.api.admin.payload.LevelDTO;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.model.LevelVO;

public interface LevelService  {

	/**
	 * Recupera un level dal db a partire dal suo id. Se il level non esiste
	 * &egrave; lanciata un'eccezione.
	 * @param id l'identificatore del level
	 * @return il level letto
	 * @throws ApplicationException in caso di errori, o se il livello non esiste
	 */
	LevelVO readVO(Long id) throws ApplicationException;

	/**
	 * Recupera un level esistente nel sistema a partre dal suo identificatore.
	 * Se il level non esiste &egrave; lancia una {@link ApplicationException}.
	 * 
	 * @param id l'identificatore del level da leggere
	 * @return il level recuperato
	 * @throws ApplicationException in caso di errori
	 */
	LevelDTO readLevel(long id) throws ApplicationException;
	
	/**
	 * Aggiunge un nuovo livello al sistema. Il nome del livello deve essere unico.
	 * @param dto il livello da aggiungere
	 * @return il livello aggiunto
	 * @throws ApplicationException in caso di errori
	 */
	LevelVO addLevel(LevelDTO dto) throws ApplicationException;

	/**
	 * Recupera l'elenco dei livelli presenti nel sistema.
	 * @return la lista dei livelli recuperati
	 */
	List<LevelVO> listLivelli();

	/**
	 * Modifica i dati di un livello. Il livello &egrave; identificato
	 * da {@link LevelDTO#getId() levelDTO.getId()}, e solo i campi non nulli
	 * di levelDTO saranno aggiornati.
	 * @param levelDto il livello da aggiornare
	 * @return il livello modificato
	 * @throws ApplicationException in caso di errori
	 */
	LevelVO updateLevel(LevelDTO levelDto) throws ApplicationException;

	/**
	 * Rimuove un livello dal sistema
	 * @param id l'identificatore del livello da rimuovere
	 * @throws ApplicationException in caso di errori
	 */
	void removeLevel(Long id) throws ApplicationException;

}
