package it.reply.genesis.agent.internal.impl;

import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import it.reply.genesis.AppError;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.generic.exception.ApplicationExceptionFactory;
import it.reply.genesis.model.TestCaseCaricatoVO;

@Component
public class InternalAgent {

  
  private static final Logger logger = LoggerFactory.getLogger(InternalAgent.class);

  private ThreadPoolExecutor executorService = new ThreadPoolExecutor(1, 1,
      0L, TimeUnit.MILLISECONDS,
      new LinkedBlockingQueue<Runnable>());
  
  @Autowired
  private ApplicationExceptionFactory applicationExceptionFactory;
  
  @Autowired
  private TestCaseCaricatoLauncher testCaseCaricatoLauncher;
  
  public InternalAgent() {
    
  }

  public void runTestCaseIfQueueEmpty(TestCaseCaricatoVO vo) throws ApplicationException {
    if (executorService.getActiveCount() > 0 || !executorService.getQueue().isEmpty()) {
      throw applicationExceptionFactory.makeError(logger, HttpStatus.CONFLICT, AppError.AGENT_RUNNING_QUEUE_NOT_EMPTY);
    }

    TestCaseCaricatoRunner runner = testCaseCaricatoLauncher.prepare(vo);
    
    executorService.execute(runner);
    
  }
  

}
