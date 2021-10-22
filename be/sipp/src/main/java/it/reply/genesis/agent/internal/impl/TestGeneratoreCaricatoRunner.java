package it.reply.genesis.agent.internal.impl;

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;

import org.python.core.PySystemState;
import org.python.util.PythonInterpreter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;

import it.reply.genesis.agent.ServiceManager;
import it.reply.genesis.agent.TestRunner;
import it.reply.genesis.api.files.payload.FileContentDTO;
import it.reply.genesis.api.files.payload.FileDTO;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.test.payload.TestGeneratoreCaricatoDTO;
import it.reply.genesis.model.FileSystemScope;
import it.reply.genesis.model.LoadedEntityStatus;
import it.reply.genesis.service.TestGeneratoreService;

public class TestGeneratoreCaricatoRunner implements TestRunner {

  public static final String MAIN_SCRIPT_FILE_NAME = "main.py";
  
  private static final Logger logger = LoggerFactory.getLogger(TestGeneratoreCaricatoRunner.class);

  private ServiceManager serviceManager;

  private TestGeneratoreCaricatoDTO testGeneratoreCaricato;

  public TestGeneratoreCaricatoRunner(ServiceManager serviceManager, TestGeneratoreCaricatoDTO testGeneratoreCaricato) {
    this.serviceManager = serviceManager;
    this.testGeneratoreCaricato = testGeneratoreCaricato;
  }

  @Override
  public void run() {
    String testRef = testGeneratoreCaricato.getId() + ":" + testGeneratoreCaricato.getNome();
    logger.debug("Avvio il test generatore caricato: {}", testRef);
    PythonInterpreter interpreter = null;
    try {
      FileDTO mainScriptFile = findMainFile();
      
      Environment env = serviceManager.getEnvironment();
      String agentRootDir = env.getProperty("genesis.agent.internal.workdir");
      Path testRunPath;
      if (agentRootDir != null) {
        logger.debug("Configured agent root work dir: {}", agentRootDir);        
        testRunPath = Path.of(agentRootDir, "run", "test");
      } else {
        testRunPath = Path.of("run", "test");
      }
      
      if (!testRunPath.toFile().isDirectory()) {
        Files.createDirectories(testRunPath);
      }
      
      Path testExecutionDir = Files
          .createTempDirectory(testRunPath, testGeneratoreCaricato.getId().toString());

      logger.debug("Creata directory per il test {}: {}",
          testRef,
          testExecutionDir.toAbsolutePath());
      testGeneratoreCaricato.setPathInstance(testExecutionDir.toAbsolutePath().toString());

      updateTestToRunningStatus();
      
      logger.debug("Lettura del file {}", mainScriptFile);
      FileContentDTO fileContent = serviceManager.getFileSystemService().readFile(FileSystemScope.TESTGEN_CARICATO, testGeneratoreCaricato.getId(), MAIN_SCRIPT_FILE_NAME);
      PySystemState pyState = new PySystemState();
      pyState.setCurrentWorkingDir(testExecutionDir.normalize().toAbsolutePath().toString());
      
      interpreter = new PythonInterpreter(null, pyState);
      logger.debug("Initializing jython environment with global variables");
      interpreter.set("testGeneratoreCaricato", testGeneratoreCaricato);
      interpreter.set("serviceManager", this.serviceManager);
      interpreter.set("logger", LoggerFactory.getLogger("script_main.py"));

      logger.debug("Executing {}", fileContent.getFileName());
      interpreter.execfile(fileContent.getContent(), fileContent.getFileName());
      
      logger.debug("test generatore terminato. Salvo il test come completato");
      markTestCompleted(null);

      
    } catch (Exception e) {
      logger.error("Errore durante la preparazione e l'esecuzione del test case caricato {}", testRef, e);
      markTestCompleted(e);
    }

  }

  private void updateTestToRunningStatus() throws ApplicationException {
    logger.debug("Aggiorno startDate e pathInstance del testGeneratoreCaricato {}:{} => {}", 
        testGeneratoreCaricato.getId(), testGeneratoreCaricato.getNome(), testGeneratoreCaricato.getPathInstance());
      TestGeneratoreService testGeneratoreService = serviceManager.getTestGeneratoreService();
      TestGeneratoreCaricatoDTO testToUpdate = testGeneratoreService.retrieveCaricato(testGeneratoreCaricato.getId(), true, false);
      
      // Sovrascrivo la data di avvio rispetto a quando l'utente ha premuto start?
      testToUpdate.setStartDate(Instant.now());
      testToUpdate.setPathInstance(testGeneratoreCaricato.getPathInstance());
      testToUpdate.setStato(LoadedEntityStatus.RUNNING);
      testToUpdate = testGeneratoreService.updateTestGeneratoreCaricato(testToUpdate);
      testToUpdate.setFolder(testGeneratoreCaricato.getFolder());
      // Se lanciato dalla test suite test case non e' aggiornato
      if (testToUpdate.getStartedBy() == null) {
        testToUpdate.setStartedBy(testGeneratoreCaricato.getStartedBy());
      }
      testGeneratoreCaricato = testToUpdate;
      
    
  }

  private FileDTO findMainFile() throws ApplicationException {
    if (testGeneratoreCaricato.getFolder() == null) {
      testGeneratoreCaricato.setFolder(serviceManager.getFileSystemService().listFolder(FileSystemScope.TESTGEN_CARICATO, testGeneratoreCaricato.getId()));
    }
    
    for (FileDTO file: testGeneratoreCaricato.getFolder()) {
      if (MAIN_SCRIPT_FILE_NAME.equals(file.getPath())) {
        return file;
      }
    }
    logger.error("Script file {} non trovato per il test generatore caricato {}:{}",
        MAIN_SCRIPT_FILE_NAME, testGeneratoreCaricato.getId(), testGeneratoreCaricato.getNome());
    throw new ApplicationException("Script file '" + MAIN_SCRIPT_FILE_NAME + "' non trovato");

  }

  private void markTestCompleted(Exception e) {
    logger.debug("enter markTestCompleted({})", e);
    try {
      TestGeneratoreService testGeneratoreService = serviceManager.getTestGeneratoreService();
      TestGeneratoreCaricatoDTO testToUpdate = testGeneratoreService.retrieveCaricato(testGeneratoreCaricato.getId(), false, false);
      if (!LoadedEntityStatus.COMPLETED.equals(testToUpdate.getStato())) {
        TestGeneratoreCaricatoDTO updatedTest = new TestGeneratoreCaricatoDTO(testToUpdate.getId());
        updatedTest.setStato(LoadedEntityStatus.COMPLETED);
        updatedTest.setEndDate(Instant.now());
        updatedTest.setVersion(testToUpdate.getVersion());
        this.testGeneratoreCaricato = testGeneratoreService.updateTestGeneratoreCaricato(updatedTest);
      }
    } catch (ApplicationException ae) {
      logger.error("Errore durante la registrazione KO del test generatore caricato {}", testGeneratoreCaricato.getId(), ae);
    }
    
  }

}
