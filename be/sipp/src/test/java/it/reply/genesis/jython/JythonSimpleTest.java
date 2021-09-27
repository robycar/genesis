package it.reply.genesis.jython;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.junit.jupiter.api.Test;
import org.python.core.PyObject;
import org.python.util.PythonInterpreter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import it.reply.genesis.agent.ServiceManager;
import it.reply.genesis.agent.TestCaseResult;
import it.reply.genesis.agent.TestRunner;
import it.reply.genesis.api.test.payload.TestCaseCaricatoDTO;
import it.reply.genesis.api.test.payload.TestCaseLineaDTO;

@SpringBootTest
@ActiveProfiles("test")
public class JythonSimpleTest {

  public static final String testFile1 = "scripts/t1.py";
  
  public static final String testFile2 = "scripts/t2.py";
  
  
  private static final Logger logger = LoggerFactory.getLogger(JythonSimpleTest.class);
  
  public JythonSimpleTest() {
  }

  //@Test
  public void testPythonInterpreter() throws URISyntaxException, IOException {
    logger.debug("enter testPythonInterpreter" );
    try (PythonInterpreter interpreter = new PythonInterpreter()) {
      logger.debug("Interpreter creato");
      URL test1Url = getClass().getClassLoader().getResource(testFile1);
      assertNotNull(test1Url);
      try (InputStream testInputStream = test1Url.openStream()) {
        logger.debug("Compiling " + testFile1);
        interpreter.execfile(testInputStream, testFile1);
        logger.debug("Obtaining TEST_RUNNER_CLASS");
        PyObject runnerClass = interpreter.get("TEST_RUNNER_CLASS");
        assertNotNull(runnerClass);
        logger.debug("Instantiating {}", runnerClass);
        PyObject runner = runnerClass.__call__();
        assertNotNull(runner);
        logger.debug("Converting TEST_RUNNER_CLASS into TestRunner.class");
        TestRunner testRunner = (TestRunner) runner.__tojava__(TestRunner.class);
        TestCaseResult testCaseResult = new TestCaseResult() {

          @Override
          public ServiceManager getServiceManager() {
            return null;
          }

          @Override
          public TestCaseCaricatoDTO getTestCaseCaricato() {
            TestCaseCaricatoDTO result = new TestCaseCaricatoDTO(123L);
            return result;
          }
          
        };
        logger.debug("Calling {}.start({})", testRunner, testCaseResult);
        testRunner.start(testCaseResult);
      }
    }
    
  }
  
  //@Test
  public void testJythonGlobalInit() throws IOException {
    logger.debug("enter testJythonGlobalInit");
    
    try (PythonInterpreter interpreter = new PythonInterpreter()) {
      interpreter.set("variabile1", "valore della variabile 1");
      TestCaseCaricatoDTO dto = new TestCaseCaricatoDTO(10L);
      dto.setChiamato(new TestCaseLineaDTO());
      interpreter.set("testCaseCaricato", dto);
      //interpreter.set("logger", LoggerFactory.getLogger(testFile2));
      URL fileUrl = getClass().getClassLoader().getResource(testFile2);
      assertNotNull(fileUrl);
      try (InputStream is = fileUrl.openStream()) {
        interpreter.execfile(is, testFile2);
      }

    }
    
  }
  
  @Autowired
  private ServiceManager serviceManager;
  
  @Test
  public void testDirectoryResult() {
    logger.debug("enter testDirectoryResult");
    Path testDir = Paths.get("test-resources", "d1");
    logger.info("Test dir: {}", testDir);
    assertTrue(testDir.toFile().isDirectory());
    try (PythonInterpreter interpreter = new PythonInterpreter()) {
      TestCaseCaricatoDTO testCaseCaricato = new TestCaseCaricatoDTO();
      testCaseCaricato.setPathInstance(testDir.toAbsolutePath().toString());
      testCaseCaricato.setId(9L);
      
      interpreter.set("testCaseCaricato", testCaseCaricato);
      interpreter.set("logger", LoggerFactory.getLogger("main_py"));
      interpreter.set("serviceManager", serviceManager);
      
      interpreter.execfile(testDir.resolve("main.py").toString());
    }
    
  }
  
}
