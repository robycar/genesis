package it.reply.sipp.service;

import java.util.List;

import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.test.payload.TemplateDTO;

public interface TemplateService {

  /**
   * Crea un nuovo template.
   * 
   * @param dto il template da creare
   * @return il template creato
   * @throws ApplicationException in caso di errori
   */
  TemplateDTO createTemplate(TemplateDTO dto) throws ApplicationException;

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

}
