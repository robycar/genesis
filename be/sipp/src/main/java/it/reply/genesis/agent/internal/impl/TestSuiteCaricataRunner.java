package it.reply.genesis.agent.internal.impl;

import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import it.reply.genesis.agent.ServiceManager;
import it.reply.genesis.agent.TestRunner;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.test.payload.TestCaseCaricatoDTO;
import it.reply.genesis.api.test.payload.TestSuiteCaricataDTO;
import it.reply.genesis.model.ExecutionResult;
import it.reply.genesis.model.LoadedEntityStatus;
import it.reply.genesis.service.TestCaseService;
import it.reply.genesis.service.TestSuiteService;

public class TestSuiteCaricataRunner implements TestRunner {

  
  private static final Logger logger = LoggerFactory.getLogger(TestSuiteCaricataRunner.class);

  
  private ServiceManager serviceManager;
  
  private TestSuiteCaricataDTO testSuiteCaricata;
  
  public TestSuiteCaricataRunner(ServiceManager serviceManager, TestSuiteCaricataDTO testSuiteCaricata) {
    this.serviceManager = serviceManager;
    this.testSuiteCaricata = testSuiteCaricata;
  }

  @Override
  public void run() {
    logger.debug("Avvio la testSuiteCaricata {}:{}", testSuiteCaricata.getId(), testSuiteCaricata.getNome());
    TestSuiteService testSuiteService = serviceManager.getTestSuiteService();
    while (true) {
      try {
        TestSuiteCaricataDTO testSuite = testSuiteService.retrieveCaricata(testSuiteCaricata.getId(), true, true);
        if (!LoadedEntityStatus.RUNNING.equals(testSuite.getStato())) {
          logger.info("La test suite {}:{} si trova nello stato {} e non RUNNING. Termino l'esecuzione della test suite senza aggiornare lo stato",
              testSuite.getId(), testSuite.getNome(), testSuite.getStato());
          return;
        }
        
        TestCaseCaricatoDTO nextTestCase = null;
        // Scorri l'elenco dei test in cerca del prossimo test da eseguire
        if (testSuite.getTestCases() != null) {
          for (TestCaseCaricatoDTO testCase: testSuite.getTestCases()) {
            if (LoadedEntityStatus.READY.equals(testCase.getStato())) {
              nextTestCase = testCase;
              break;
            }
          }
        }
        
        if (nextTestCase == null) {
          logger.debug("Nessun altro test da eseguire trovato per la test suite {}:{}", 
              testSuiteCaricata.getId(), testSuiteCaricata.getNome());
          break;
        }
        logger.debug("Prossimo test da eseguire per la test suite {}:{} => {}", 
            testSuiteCaricata.getId(), testSuiteCaricata.getNome(), nextTestCase);
        nextTestCase.setStartedBy(testSuiteCaricata.getStartedBy());
        TestCaseCaricatoRunner testTask = new TestCaseCaricatoRunner(serviceManager, nextTestCase);
        try {
          testTask.run();
        } catch (Exception e) {
          logger.error("L'esecuzione del test case {}:{} e' terminata inaspettatamente con un errore", 
              nextTestCase.getId(), nextTestCase.getNome(), e);
          markTestAsFailed(nextTestCase.getId(), e);
        }
        
      } catch (ApplicationException e) {
        logger.error("Errore durante l'esecuzione della test suite {}:{}", 
            testSuiteCaricata.getId(), testSuiteCaricata.getNome(), e);
      } 
    }
    logger.debug("Test suite terminata ... imposto lo stato a COMPLETED");
    markTestSuiteCompleted(testSuiteCaricata);
    
  }

  private TestSuiteCaricataDTO markTestSuiteCompleted(TestSuiteCaricataDTO ts) {
    logger.debug("enter markTestSuiteCompleted");
    ts.setStato(LoadedEntityStatus.COMPLETED);
    ts.setEndDate(Instant.now());
    try {
      return serviceManager.getTestSuiteService().updateCaricata(ts);
    } catch (ApplicationException e) {
      logger.error("Non e' stato possibile aggiornare la test suite {}:{}",
          ts.getId(), ts.getNome());
      return null;
    }
  }

  protected TestCaseCaricatoDTO markTestAsFailed(long testId, Exception r) {
    try {
      TestCaseService testCaseService = serviceManager.getTestCaseService();
      TestCaseCaricatoDTO testToUpdate = testCaseService.readCaricato(testId);
      if (LoadedEntityStatus.RUNNING.equals(testToUpdate.getStato())) {
        testToUpdate.setId(testToUpdate.getId());
        testToUpdate.setEndDate(Instant.now());
        testToUpdate.setStato(LoadedEntityStatus.COMPLETED);
        testToUpdate.setResult(ExecutionResult.KO);
        testToUpdate = testCaseService.updateTestCaseCaricato(testToUpdate);
      }
      return testToUpdate;
    } catch (ApplicationException ae) {
      logger.error("Errore durante la registrazione KO del test caricato {}", testId, ae);
      return null;
    }
  }

  
}
