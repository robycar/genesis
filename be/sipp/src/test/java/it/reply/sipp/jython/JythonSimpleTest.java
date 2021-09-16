package it.reply.sipp.jython;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.net.URL;

import org.junit.jupiter.api.Test;
import org.python.core.PyObject;
import org.python.util.PythonInterpreter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import it.reply.sipp.agent.ServiceManager;
import it.reply.sipp.agent.TestCaseResult;
import it.reply.sipp.agent.TestRunner;
import it.reply.sipp.api.test.payload.TestCaseCaricatoDTO;

@SpringBootTest
@ActiveProfiles("test")
public class JythonSimpleTest {

  public static final String testFile1 = "scripts/t1.py";
  
  
  private static final Logger logger = LoggerFactory.getLogger(JythonSimpleTest.class);
  
  public JythonSimpleTest() {
  }

  @Test
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
  
}
