package it.reply.genesis.service;

import java.time.LocalDate;
import java.util.List;

import javax.validation.Valid;

import it.reply.genesis.api.dashboard.payload.RiepilogoNumericoTestGeneratoreDTO;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.test.payload.TestGeneratoreCaricatoDTO;
import it.reply.genesis.api.test.payload.TestGeneratoreDTO;
import it.reply.genesis.model.OutboundProxyVO;
import it.reply.genesis.service.dto.ScheduleInfo;
import it.reply.genesis.service.dto.TestListType;

public interface TestGeneratoreService {

  List<TestGeneratoreDTO> listTestGeneratore() throws ApplicationException;

  TestGeneratoreDTO createTestGeneratore(TestGeneratoreDTO testDTO) throws ApplicationException;

  TestGeneratoreDTO readTestGeneratore(long id) throws ApplicationException;

  TestGeneratoreDTO updateTestGeneratore(TestGeneratoreDTO testDto) throws ApplicationException;

  void deleteTestGeneratore(long id) throws ApplicationException;

  List<Long> findTestIdUsingProxy(OutboundProxyVO proxy) throws ApplicationException;

  /**
   * Carica un test generatore. 
   * In testDTO i campi, OBBLIGATORI, presi in considerazione sono
   * <ul>
   *   <li>{@link TestGeneratoreCaricatoDTO#getId() id} che deve corrispondere all'id del test generatore da caricare</li>
   *   <li>{@link TestGeneratoreCaricatoDTO#getDurataTraffico() durataTraffico}</li>
   *   <li>{@link TestGeneratoreCaricatoDTO#getRate() rate}</li>
   * </ul>
   * {@code scheduleInfo} &egrave; un parametro opzionale.
   * Se diverso da null il test sar&egrave; schedulato con le informazioni contenute 
   * in {@code scheduleInfo}.
   * @param testDTO dati del test da caricare.
   * @param scheduleInfo dati della schedulazione 
   * @return il test generatore caticato
   * @throws ApplicationException in caso di errori
   */
  TestGeneratoreCaricatoDTO loadTestGeneratore(TestGeneratoreCaricatoDTO testDTO, ScheduleInfo scheduleInfo) throws ApplicationException;

  List<TestGeneratoreCaricatoDTO> readTestCaricatiOfType(TestListType inclusion);

  void runLoaded(long id) throws ApplicationException;

  TestGeneratoreCaricatoDTO retrieveCaricato(long id, boolean includeDetails, boolean locking) throws ApplicationException;

  TestGeneratoreCaricatoDTO updateTestGeneratoreCaricato(TestGeneratoreCaricatoDTO testDTO) throws ApplicationException;

  void removeCaricati(@Valid List<Long> ids) throws ApplicationException;

  RiepilogoNumericoTestGeneratoreDTO riepilogoNumerico(LocalDate fromDay, LocalDate toDay) throws ApplicationException;

}
