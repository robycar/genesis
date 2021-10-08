package it.reply.genesis.agent.internal.impl;

import java.time.temporal.ChronoUnit;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import it.reply.genesis.AppError;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.test.payload.TestCaseCaricatoDTO;
import it.reply.genesis.api.test.payload.TestSuiteCaricataDTO;
import it.reply.genesis.service.TestCaseService;
import it.reply.genesis.service.TestSuiteService;

@Component
public class SearchScheduledTestTask {

  
  private static final Logger logger = LoggerFactory.getLogger(SearchScheduledTestTask.class);

  @Autowired
  private SingleThreadSingleTestExecutor testExecutor;
  
  @Autowired
  private TestCaseService testCaseService;
  
  @Autowired
  private TestSuiteService testSuiteService;
  
  public SearchScheduledTestTask() {
  }

  @Scheduled(initialDelay = 120000, fixedDelay = 60000)
  public void searchScheduledEntities() throws ApplicationException {
    logger.info("Search for scheduled test case to start");
    if (testExecutor.isWorking()) {
      logger.debug("Aleno un test case in esecuzione. Evito di cercare altri test");
      return;
    }
    // cerca per test schedulati con schedule_datetime >= oggi
    Optional<Long> idTestCase = Optional.empty();
    try {
      idTestCase = testCaseService.findNextScheduledTestCaseToExecute();
    } catch (RuntimeException e) {
      logger.error("Unable to fine next scheduled testcase to start", e);
    }
    if (idTestCase.isPresent()) {
      logger.info("Founded test case {}", idTestCase.get());
      try {
        testCaseService.runScheduled(idTestCase.get());
        return;
      } catch (ApplicationException e) {
        if (AppError.AGENT_RUNNING_QUEUE_NOT_EMPTY.getErrorCode().equals(e.getErrorCode())) {
          TestCaseCaricatoDTO dto = testCaseService.readCaricato(idTestCase.get());
          //
          dto.setScheduleDateTime(dto.getScheduleDateTime().plus(dto.getDelay(), ChronoUnit.MINUTES));
          testCaseService.updateTestCaseCaricato(dto);
        }
      }
    }

    logger.info("Search for scheduled test suite to start");
    Optional<Long> idTestSuite = Optional.empty();
    try {
      idTestSuite = testSuiteService.findNextScheduledTestSuiteToExecute();
    } catch (RuntimeException e) {
      logger.error("Unable to find next scheduled testsuite to execute", e);
    }
    if (idTestSuite.isPresent()) {
      logger.info("Founded test suite {}", idTestSuite);
      try {
        testSuiteService.runScheduled(idTestSuite.get());
      } catch (ApplicationException e) {
        if (AppError.AGENT_RUNNING_QUEUE_NOT_EMPTY.getErrorCode().equals(e.getErrorCode())) {
          TestSuiteCaricataDTO testSuite = testSuiteService.retrieveCaricata(idTestSuite.get(), false);
          testSuite.setScheduleDateTime(testSuite.getScheduleDateTime().plus(testSuite.getDelay(), ChronoUnit.MINUTES));
          testSuiteService.updateCaricata(testSuite);
        }
      }
    }
    
    
  }
  
}
