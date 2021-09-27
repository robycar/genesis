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
import it.reply.genesis.api.files.payload.FileContentDTO;
import it.reply.genesis.api.files.payload.FileDTO;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.test.payload.TestCaseCaricatoDTO;
import it.reply.genesis.model.ExecutionResult;
import it.reply.genesis.model.FileSystemScope;
import it.reply.genesis.model.TestCaseCaricatoStato;
import it.reply.genesis.service.FileSystemService;
import it.reply.genesis.service.TestCaseService;

public class TestCaseCaricatoRunner implements Runnable {

  
  private static final Logger logger = LoggerFactory.getLogger(TestCaseCaricatoRunner.class);

  public static final String MAIN_SCRIPT_FILE_NAME = "main.py";
  
  private ServiceManager serviceManager;
  
  private TestCaseCaricatoDTO testCaseCaricato;

  public TestCaseCaricatoRunner(ServiceManager serviceManager, TestCaseCaricatoDTO testCaseCaricato) {
    this.serviceManager = serviceManager;
    this.testCaseCaricato = testCaseCaricato;
  }

  @Override
  public void run() {
    PythonInterpreter interpreter = null;
    try {
      logger.debug("Avvio il test case caricato {}: {}", testCaseCaricato.getId(), testCaseCaricato.getNome());
      // Cerca in testCaseCaricato un file chiamato main.py
      FileDTO mainScriptFile = findMainFile();
      
      FileSystemService fileSystemService = serviceManager.getFileSystemService();

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
          .createTempDirectory(testRunPath, testCaseCaricato.getId().toString());

      logger.debug("Creata directory per il test {}:{}: {}", 
          testCaseCaricato.getId(),
          testCaseCaricato.getNome(),
          testExecutionDir.toAbsolutePath());
      testCaseCaricato.setPathInstance(testExecutionDir.toAbsolutePath().toString());

      
      updateTestCaseToRunningStatus();
      
      logger.debug("Lettura del file {}", mainScriptFile);
      FileContentDTO fileContent = fileSystemService.readFile(FileSystemScope.TEST_CARICATO, testCaseCaricato.getId(), MAIN_SCRIPT_FILE_NAME);
      //download(testExecutionDir, fileContent);
      PySystemState pyState = new PySystemState();
      pyState.setCurrentWorkingDir(testExecutionDir.normalize().toAbsolutePath().toString());
      interpreter = new PythonInterpreter(null, pyState);
      logger.debug("Initializing jython environment with global variables");
      interpreter.set("testCaseCaricato", testCaseCaricato);
      interpreter.set("serviceManager", this.serviceManager);
      interpreter.set("logger", LoggerFactory.getLogger("script_main.py"));

      logger.debug("Executing {}", fileContent.getFileName());
      interpreter.execfile(fileContent.getContent(), fileContent.getFileName());
//      logger.debug("Obtaining TEST_RUNNER_CLASS");
//      PyObject runnerClass = interpreter.get("TEST_RUNNER_CLASS");
//      if (runnerClass == null) {
//        throw new Exception("Lo script " + fileContent.getFileName() + " non definisce la variabile globale TEST_RUNNER_CLASS");
//      }
//      logger.debug("Instantiating {}", runnerClass);
//      PyObject runner = runnerClass.__call__();
//      if (runner == null) {
//       throw new Exception("Impossibile instanziare la classe " + runnerClass); 
//      }
//      logger.debug("Converting TEST_RUNNER_CLASS into TestRunner.class");
//      TestRunner testRunner = (TestRunner) runner.__tojava__(TestRunner.class);
//      TestCaseResultImpl testCaseResult = new TestCaseResultImpl(this.serviceManager, this.testCaseCaricato);
//      logger.debug("calling script.start");
//      testRunner.start(testCaseResult);
      logger.debug("test case completed. Saving OK result");
      markTestCompletedOK();
    } catch (Exception e) {
      logger.error("Errore durante la preparazione e l'esecuzione del test case caricato {}:{}", testCaseCaricato.getId(), testCaseCaricato.getNome(), e);
      markTestAsFailed(e);
    } finally {
      logger.debug("closing interpeter and exit run");
      if (interpreter != null) {
        interpreter.close();
      }
    }
    
  }



  private void updateTestCaseToRunningStatus() throws ApplicationException {
    logger.debug("Imposto il testCaseCaricato {}:{} a RUNNING", 
        testCaseCaricato.getId(), testCaseCaricato.getNome());
    TestCaseService testCaseService = serviceManager.getTestCaseService();
    TestCaseCaricatoDTO testToUpdate = testCaseService.readCaricato(testCaseCaricato.getId());
    TestCaseCaricatoDTO updatedTest = new TestCaseCaricatoDTO();
    updatedTest.setId(testToUpdate.getId());
    updatedTest.setVersion(testToUpdate.getVersion());
    updatedTest.setStato(TestCaseCaricatoStato.RUNNING);
    // Sovrascrivo la data di avvio rispetto a quando l'utente ha premuto start?
    updatedTest.setStartDate(Instant.now());
    updatedTest.setPathInstance(testCaseCaricato.getPathInstance());
    testCaseService.updateTestCaseCaricato(updatedTest);
    
  }

  private void markTestCompletedOK() {
    try {
      TestCaseService testCaseService = serviceManager.getTestCaseService();
      TestCaseCaricatoDTO testToUpdate = testCaseService.readCaricato(testCaseCaricato.getId());
      if (!TestCaseCaricatoStato.COMPLETED.equals(testToUpdate.getStato())) {
        TestCaseCaricatoDTO updatedTest = new TestCaseCaricatoDTO();
        updatedTest.setId(testToUpdate.getId());
        updatedTest.setVersion(testToUpdate.getVersion());
        updatedTest.setEndDate(Instant.now());
        updatedTest.setStato(TestCaseCaricatoStato.COMPLETED);
        updatedTest.setResult(ExecutionResult.OK);
        
        this.testCaseCaricato = testCaseService.updateTestCaseCaricato(updatedTest);
      }
    } catch (ApplicationException ae) {
      logger.error("Errore durante la registrazione OK del test caricato {}", testCaseCaricato.getId());
    }
    
  }

  private void markTestAsFailed(Exception r) {
    try {
      TestCaseService testCaseService = serviceManager.getTestCaseService();
      TestCaseCaricatoDTO testToUpdate = testCaseService.readCaricato(testCaseCaricato.getId());
      TestCaseCaricatoDTO updatedTest = new TestCaseCaricatoDTO();
      updatedTest.setId(testToUpdate.getId());
      updatedTest.setVersion(testToUpdate.getVersion());
      updatedTest.setEndDate(Instant.now());
      updatedTest.setStato(TestCaseCaricatoStato.COMPLETED);
      updatedTest.setResult(ExecutionResult.KO);
      this.testCaseCaricato =  testCaseService.updateTestCaseCaricato(updatedTest);
    } catch (ApplicationException ae) {
      logger.error("Errore durante la registrazione KO del test caricato {}", testCaseCaricato.getId(), ae);
    }
  }

//  private void download(Path targetFolder, FileContentDTO fileContent) throws IOException {
//    Path targetFile = targetFolder.resolve(fileContent.getFileName());
//    logger.debug("Downloading {} into {}", fileContent, targetFile);
//    try (InputStream is = fileContent.getContent()) {
//      long written = Files.copy(fileContent.getContent(), targetFile, StandardCopyOption.REPLACE_EXISTING);
//      logger.debug("Written {} bytes to file {}", written, targetFile);
//    }
//    
//    
//  }

  private FileDTO findMainFile() throws ApplicationException {
    if (testCaseCaricato.getFolder() == null) {
      testCaseCaricato.setFolder(serviceManager.getFileSystemService().listFolder(FileSystemScope.TEST_CARICATO, testCaseCaricato.getId()));
    }
    
    for (FileDTO file: testCaseCaricato.getFolder()) {
      if (MAIN_SCRIPT_FILE_NAME.equals(file.getPath())) {
        return file;
      }
    }
    logger.error("Script file {} non trovato per il test case caricato {}:{}",
        MAIN_SCRIPT_FILE_NAME, testCaseCaricato.getId(), testCaseCaricato.getNome());
    throw new ApplicationException("Script file '" + MAIN_SCRIPT_FILE_NAME + "' non trovato");
    
  }

}
