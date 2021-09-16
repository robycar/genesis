package it.reply.genesis.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.linea.payload.LineaDTO;
import it.reply.genesis.api.linea.payload.LineaGeneratoreDTO;
import it.reply.genesis.api.linea.payload.TypeLineaDTO;
import it.reply.genesis.model.LineaGeneratoreVO;
import it.reply.genesis.model.LineaVO;
import it.reply.genesis.model.TypeLineaVO;
import it.reply.genesis.service.dto.LineaReadLineaResponse;

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

  /**
   * Ottiene i dati relativi ad una linea a partire dal suo identificatore.
   * @param id l'identificatore della linea
   * @return la linea letta e l'elenco delle connessioni
   * @throws ApplicationException in caso di errori
   */
  LineaReadLineaResponse readLinea(long id) throws ApplicationException;
  
  LineaVO readLineaVO(long id) throws ApplicationException;

  /**
   * Legge i dati relativi ad un TypeLinea
   * @param id l'identificatore del TypeLinea da leggere
   * @return Il TypeLinea letto
   * @throws ApplicationException in caso di errori
   */
  TypeLineaDTO readTypeLinea(long id) throws ApplicationException;

  /**
   * Modifica un TypeLinea con tutti i campi non nulli presenti in {@code typeLineaDTO}
   * @param typeLineaDTO il typeLinea da modifica 
   * @return Il TypeLinea modificato
   * @throws ApplicationException in caso di errori
   */
  TypeLineaDTO updateTypeLinea(TypeLineaDTO typeLineaDTO) throws ApplicationException;

  /**
   * Elimina un TypeLinea esistente dal sistema.
   * @param id l'identificatore del type linea da rimuovere
   * @throws ApplicationException in caso di errori
   */
  void removeTypeLinea(long id) throws ApplicationException;

  List<LineaGeneratoreDTO> listLineeGeneratore() throws ApplicationException;

  LineaGeneratoreDTO createAndPopulateLineaGeneratore(LineaGeneratoreDTO lineaDTO, MultipartFile pathCSV) throws ApplicationException;

  LineaGeneratoreDTO updateLineaGeneratore(LineaGeneratoreDTO lineaDTO) throws ApplicationException;

  void removeLineaGeneratore(long id) throws ApplicationException;

  LineaGeneratoreDTO readLineaGeneratore(long id) throws ApplicationException;

  LineaGeneratoreVO readLineaGeneratoreVO(long id) throws ApplicationException;
}
