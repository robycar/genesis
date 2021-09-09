package it.reply.sipp.service;

import java.util.List;

import org.springframework.lang.Nullable;

import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.linea.payload.OutboundProxyDTO;
import it.reply.sipp.model.OutboundProxyVO;

public interface OBPService {

  /**
   * Recupera l'elenco dei proxy definiti a sistema. Se {@code criteria} e' valorizzato,
   * i proxy restituiti saranno quelli che soddisfano tutti i parametri di ricerca (valori non nulli)
   * definiti in {@code criteria}
   * @param criteria i parametri di ricerca. Pu&ograve; essere nullo
   * @return L'elenco dei proxy trovati
   * @throws ApplicationException in caso di errori
   */
  List<OutboundProxyDTO> find(@Nullable OutboundProxyDTO criteria) throws ApplicationException;

  /**
   * Crea un nuovo Outbound proxy.
   * @param proxyDTO il proxy da creare
   * @return il proxy creato (con il campo {@code id} valorizzato)
   * @throws ApplicationException in caso di errori
   */
  OutboundProxyDTO createProxy(OutboundProxyDTO proxyDTO) throws ApplicationException;

  /**
   * Modifica un Outbound Proxy esistente. Il campo {@code id} &egrave; obbligatorio per
   * identificare il proxy. I campi nulli resteranno invariati.
   * 
   * @param proxyDTO il proxy da modificare.
   * @return il proxy modificato
   * @throws ApplicationException in caso di errori
   */
  OutboundProxyDTO updateProxy(OutboundProxyDTO proxyDTO) throws ApplicationException;

  /**
   * Ottiene un proxy memorizzato nel sistema, a partire dal suo id.
   * Se il proxy non &egrave; trovato, viene lanciata una {@link ApplicationException}
   * @param id l'identificatore del proxy
   * @return il proxy trovato
   * @throws ApplicationException in caso di errori
   */
  OutboundProxyDTO readProxy(Long id) throws ApplicationException;

  /**
   * Elimina un OutboundProxy esistente.
   * @param id l'identificatore del proxy da rimuovere
   * @throws ApplicationException in caso di errori.
   */
  void removProxy(Long id) throws ApplicationException;

  OutboundProxyVO readProxyVO(long id) throws ApplicationException;

  List<OutboundProxyDTO> searchProxy(OutboundProxyDTO proxyDTO) throws ApplicationException;
  
}
