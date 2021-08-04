package it.reply.sipp.service;

import java.util.List;

import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.linea.payload.LineaDTO;
import it.reply.sipp.api.linea.payload.TypeLineaDTO;
import it.reply.sipp.model.TypeLineaVO;

public interface LineaService {

	/**
	 * Recupera l'elenco dei tipi linea esistenti nel sistema.
	 * 
	 * @return la lista dei tipo linea
	 * @throws ApplicationException in caso di errori
	 */
	List<TypeLineaDTO> listTypeLinee() throws ApplicationException;

	/**
	 * Crea una nuova linea nel sistema
	 * @param lineaDTO la linea da creare
	 * @return la linea creata
	 * @throws ApplicationException in caso di errori
	 */
	LineaDTO createLinea(LineaDTO lineaDTO) throws ApplicationException;

	/**
	 * Questo metodo restituisce una lista contenente le linee presenti nel sistema
	 * @return l'elenco delle linee esistenti
	 * @throws ApplicationException in caso di errori
	 */
	List<LineaDTO> listLinee() throws ApplicationException;

	/**
	 * Modifica una linea esistente. Il numero ed il tipo linea dovranno essere univoci.
	 * I campi modificati saranno tutti i campi non nulli presenti in lineaDTO
	 * @param lineaDTO la linea da modificare
	 * @return la linea aggiornata
	 * @throws ApplicationException in caso di errori
	 */
	LineaDTO updateLinea(LineaDTO lineaDTO) throws ApplicationException;

	/**
	 * Elimina una linea esistente.
	 * 
	 * @param id l'identificatore della linea da eliminare
	 * @throws ApplicationException in caso di errori
	 */
	void removeLinea(Long id) throws ApplicationException;

	/**
	 * Ricerca le typeLinee a partire dall'id. Se almeno uno degli id non e' presente
	 * nel db, viene lanciata una {@link ApplicationException}
	 * @param ids gli identificatori delle type linee da cercare
	 * @return le TypeLineaVO trovate
	 * @throws ApplicationException in caso di errori.
	 */
	List<TypeLineaVO> readTypeLineeVO(Iterable<Long> ids) throws ApplicationException;

	/**
	 * Aggiunge una nuova TypeLinea al sistema.
	 * @param typeLineaDTO la typeLinea da creare
	 * 
	 * @return la typeLinea creata
	 * @throws ApplicationException in caso di errori
	 */
  TypeLineaDTO createTypeLinea(TypeLineaDTO typeLineaDTO) throws ApplicationException;
	
}
