package it.reply.genesis.jython;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.junit.jupiter.api.Test;
import org.python.util.PythonInterpreter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;

import it.reply.genesis.agent.ServiceManager;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.test.payload.TestCaseCaricatoDTO;
import it.reply.genesis.api.test.payload.TestCaseLineaDTO;

@SpringBootTest
@ActiveProfiles("test")
public class JythonSimpleTest {

  public static final String testFile1 = "scripts/t1.py";
  
  public static final String testFile2 = "scripts/t2.py";
  
  @Autowired
  private ServiceManager serviceManager;
  
  private static final Logger logger = LoggerFactory.getLogger(JythonSimpleTest.class);
  
  public JythonSimpleTest() {
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
      interpreter.set("logger", LoggerFactory.getLogger("jython.main_py"));
      interpreter.set("serviceManager", serviceManager);
      
      interpreter.execfile(testDir.resolve("main.py").toString());
    }
    
  }
  
  @Autowired
  private JdbcTemplate jdbcTemplate;
  
  @Test
  public void testSalvataggioEsitoTest() throws ApplicationException {
    logger.debug("enter testSalvataggioEsitoTest");
    Path testDir = Paths.get("test-resources", "d2");
    logger.info("Test dir: {}", testDir);
    assertTrue(testDir.toFile().isDirectory());
    Long idTest = jdbcTemplate.queryForObject("SELECT MIN(id) FROM TEST_CASE_CARICATO", Long.class);
    assertNotNull(idTest);

    TestCaseCaricatoDTO testCaseCaricato = serviceManager.getTestCaseService().readCaricato(idTest, true, true);
    testCaseCaricato.setPathInstance(testDir.toAbsolutePath().toString());
    try (PythonInterpreter interpreter = new PythonInterpreter()) {
      interpreter.set("testCaseCaricato", testCaseCaricato);
      interpreter.set("logger", "jython.d2.main_py");
      interpreter.set("serviceManager", serviceManager);
      interpreter.execfile(testDir.resolve("main.py").toString());
    }
    
  }
  
}
