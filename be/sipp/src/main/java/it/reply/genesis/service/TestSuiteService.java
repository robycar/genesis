package it.reply.genesis.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import it.reply.genesis.api.dashboard.payload.RiepilogoNumericoTestSuiteDTO;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.test.payload.TestSuiteCaricataDTO;
import it.reply.genesis.api.test.payload.TestSuiteDTO;
import it.reply.genesis.service.dto.ScheduleInfo;
import it.reply.genesis.service.dto.TestListType;

public interface TestSuiteService {

  List<TestSuiteDTO> list() throws ApplicationException;

  TestSuiteDTO createTestSuite(TestSuiteDTO testSuiteDTO) throws ApplicationException;

  TestSuiteDTO update(TestSuiteDTO testSuiteDTO) throws ApplicationException;

  void remove(long id) throws ApplicationException;

  TestSuiteDTO retrieve(long id) throws ApplicationException;

  TestSuiteCaricataDTO loadTestSuite(long id, ScheduleInfo scheduleInfo) throws ApplicationException;

  void runLoaded(long id) throws ApplicationException;

  void runScheduled(long id) throws ApplicationException;

  @Transactional(rollbackFor = ApplicationException.class)
  default TestSuiteCaricataDTO retrieveCaricata(long id, boolean includeDetails) throws ApplicationException {
    return retrieveCaricata(id, includeDetails, false);
  }
  
  TestSuiteCaricataDTO retrieveCaricata(long id, boolean includeDetails, boolean locking) throws ApplicationException;

  TestSuiteCaricataDTO updateCaricata(TestSuiteCaricataDTO testSuite) throws ApplicationException;

  List<TestSuiteCaricataDTO> readTestSuiteCaricateOfType(TestListType inclusion) throws ApplicationException;

  void removeCaricate(List<Long> ids) throws ApplicationException;

  RiepilogoNumericoTestSuiteDTO riepilogoNumerico(LocalDate fromDay, LocalDate toDay);

  Optional<Long> findNextScheduledTestSuiteToExecute();


}
