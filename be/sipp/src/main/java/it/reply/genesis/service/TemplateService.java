package it.reply.genesis.service;

import java.util.List;

import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.test.payload.TemplateCreateFullRequest;
import it.reply.genesis.api.test.payload.TemplateDTO;
import it.reply.genesis.api.test.payload.TemplateSearchRequest;
import it.reply.genesis.model.TemplateVO;

public interface TemplateService {

  /**
   * Crea un nuovo template.
   * 
   * @param dto il template da creare
   * @return il template creato
   * @throws ApplicationException in caso di errori
   */
  @Deprecated(forRemoval = true)
  TemplateDTO createTemplate(TemplateDTO dto) throws ApplicationException;

  /**
   * Crea un nuovo template e lo popola con i file contenuti nel dto di richiesta
   * @param request il DTO di richiesta
   * 
   * @return il template creato
   * @throws ApplicationException in caso di errori
   */
  TemplateDTO createAndPopulateTemplate(TemplateCreateFullRequest requestDTO) throws ApplicationException;
  
  /**
   * Recupera l'elenco dei template definiti nel sistema
   * @return l'elenco dei template
   * @throws ApplicationException in caso di errori
   */
  List<TemplateDTO> listTemplate() throws ApplicationException;

  /**
   * Modifica un template esistente.
   * @param templateDTO il template da modificare
   * @return il template modificati
   * @throws ApplicationException in caso di errori
   */
  TemplateDTO updateTemplate(TemplateDTO templateDTO) throws ApplicationException;

  /**
   * Recupera i dati relativi ad un template.
   * Se il template non esiste viene lanciata una {@link ApplicationException} 
   * @param id l'identificatore del template da cercare.
   * @return il template trovato
   * @throws ApplicationException in caso di errori.
   */
  TemplateDTO read(long id) throws ApplicationException;

  /**
   * Rimuove un template dal sistema, identificato dal suo {@code id}
   * Se il template non esiste viene lanciata una {@link ApplicationException}.
   * @param id l'identificatore del template da eliminare
   * @throws ApplicationException in caso di errori
   */
  void removeTemplate(long id) throws ApplicationException;

  TemplateVO readVO(long id) throws ApplicationException;

  List<TemplateDTO> search(TemplateSearchRequest request) throws ApplicationException;

  List<String> typeList() throws ApplicationException;

  

}
