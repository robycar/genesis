package it.reply.genesis.agent.internal.impl;

import java.util.concurrent.Executor;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import it.reply.genesis.AppError;
import it.reply.genesis.SippApplication;
import it.reply.genesis.agent.ServiceManager;
import it.reply.genesis.agent.TestRunner;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.generic.exception.ApplicationExceptionFactory;
import it.reply.genesis.api.test.payload.TestCaseCaricatoDTO;
import it.reply.genesis.api.test.payload.TestGeneratoreCaricatoDTO;
import it.reply.genesis.api.test.payload.TestSuiteCaricataDTO;
import it.reply.genesis.model.FileSystemScope;
import it.reply.genesis.model.LoadedEntityStatus;
import it.reply.genesis.model.TestCaseCaricatoVO;
import it.reply.genesis.model.TestSuiteCaricataVO;

@Component
public class SingleThreadSingleTestExecutor implements DisposableBean, Runnable {

  
  private static final Logger logger = LoggerFactory.getLogger(SingleThreadSingleTestExecutor.class);

  private boolean closed = false;

  private TestRunner currentTask = null;
  
  private ReentrantLock lock;
  
  private Condition notEmpty;
  
  @Autowired
  private ServiceManager serviceManager;
  
  @Autowired
  private ApplicationExceptionFactory applicationExceptionFactory;

  
  public SingleThreadSingleTestExecutor() {
    this.lock = new ReentrantLock();
    this.notEmpty = this.lock.newCondition();
  }

  @Override
  public void destroy() throws Exception {
    logger.info("Closing test launching task executor");
    closed = true;
  }

  @EventListener
  public void onApplicationStartedEvent(ApplicationStartedEvent event) {
    logger.info("Captured applicationStartedEvent");
    Executor executor = event.getApplicationContext().getBean(SippApplication.GENESIS_EXECUTOR_BEAN_NAME, Executor.class);
    logger.debug("Retrieved executor bean");
    executor.execute(this);
  }

  @Override
  public void run() {
    while(!closed) {
      logger.debug("Waiting for next test to run...");
      TestRunner nextTask = null;
      try {
        nextTask = waitForTask();
      } catch (InterruptedException e) {
        closed = true;
        logger.debug("Catched interruptedException. Exit from testExecutorLoop");
        return;
      }
      if (nextTask != null && !closed) {
        try {
          nextTask.run();
        } catch (Throwable e) {
          logger.info("Ignoring exception launched by TestRunner {}: {}", nextTask, e);
        } finally {
          this.currentTask = null;
        }
      } 
    }
    
  }
  
  /**
   * Avvia un TestCaseCaricato se non ci sono altri task in esecuzione.
   * Questo metodo lancia una {@link ApplicationException} nel caso in cui
   * sia presente qualche altro task in esecuzione.
   * &lt;strike&gt;Il {@code testCaseVO} verrà modificato con la data di avvio impostata alla data
   * di sistema corrente e lo stato a {@link LoadedEntityStatus#RUNNING}, prima 
   * di verificare se sia effettivamente possibile avviare il test&lt;/strike&gt;. Quindi in caso
   * di errore, l'applicazione dovrà evitare di salvare l'entiy, eventualmente
   * effettuando una rollback sul db.
   * @param testCaseVO il test case da avviare
   * 
   * @throws ApplicationException in caso di errore
   */
  public void startTestCase(TestCaseCaricatoVO testCaseVO) throws ApplicationException {
    logger.info("enter startTestCase ({}: {})", testCaseVO.getId(), testCaseVO.getNome());
    TestCaseCaricatoDTO dto = new TestCaseCaricatoDTO(testCaseVO, true, true)
        .assignFolder(serviceManager.getFileSystemService().listFolderVO(FileSystemScope.TEST_CARICATO, testCaseVO.getId()));
    TestCaseCaricatoRunner runner = new TestCaseCaricatoRunner(serviceManager, dto);
    if (!offer(runner)) {
      throw applicationExceptionFactory.makeError(logger, HttpStatus.CONFLICT, AppError.AGENT_RUNNING_QUEUE_NOT_EMPTY);
    }
  }

  /**
   * Avvia una {@link TestSuiteCaricataDTO TestSuiteCaricata} se non ci sono altri task
   * in esecuzione. Questo metodo lancia una {@link ApplicationException} nel caso in cui
   * sia presente qualche altro task in esecuzione.
   * La {@code testSuite} dovr&agrave; preventivamente essere messa in stato 
   * {@link LoadedEntityStatus#RUNNING RUNNING}, impostando anche il campo 
   * {@link TestSuiteCaricataVO#setStartedBy(String) startedBy}.
   * 
   * @param testSuite la test suite da avviare
   * @throws ApplicationException se la test suite non puo' essere avviata
   */
  public void startTestSuite(TestSuiteCaricataDTO testSuite) throws ApplicationException {
    TestSuiteCaricataRunner runner = new TestSuiteCaricataRunner(serviceManager, testSuite);
    if (!offer(runner)) {
      throw applicationExceptionFactory.makeError(logger, HttpStatus.CONFLICT, AppError.AGENT_RUNNING_QUEUE_NOT_EMPTY);
    }
  }
  
  public void startTestGeneratore(TestGeneratoreCaricatoDTO testGeneratoreCaricatoDTO) throws ApplicationException {
    TestGeneratoreCaricatoRunner runner = new TestGeneratoreCaricatoRunner(serviceManager, testGeneratoreCaricatoDTO);
    if (!offer(runner)) {
      throw applicationExceptionFactory.makeError(logger, HttpStatus.CONFLICT, AppError.AGENT_RUNNING_QUEUE_NOT_EMPTY);
    }
  }

  /**
   * 
   * @return true se c'è almeno un task in esecuzione, false altrimenti
   */
  public boolean isWorking() {
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
      return currentTask != null;
    } finally {
      lock.unlock();
    }
  }
  
  private boolean offer(TestRunner task) {
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
      if (currentTask != null) {
        return false;
      }
      
      currentTask = task;
      notEmpty.signal();
      return true;
    } finally {
      lock.unlock();
    }
  }
  
  private TestRunner waitForTask() throws InterruptedException {
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();
    try {
      while (currentTask == null) {
        notEmpty.await();
      }
      return currentTask;
    } finally {
      lock.unlock();
    }
  }



}
