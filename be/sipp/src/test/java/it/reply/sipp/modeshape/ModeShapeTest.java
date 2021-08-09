package it.reply.sipp.modeshape;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.modeshape.common.collection.Problems;
import org.modeshape.jcr.JcrRepository;
import org.modeshape.jcr.ModeShapeEngine;
import org.modeshape.jcr.RepositoryConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ModeShapeTest {

  private static final String MODESHAPE_RESOURCE_FILE = "genesis-modeshape-test.json";
  
  
  private static final Logger logger = LoggerFactory.getLogger(ModeShapeTest.class);

  
  public ModeShapeTest() {
  }

  @Test
  public void deployRepo() throws Exception {
    ModeShapeEngine engine = new ModeShapeEngine();
    engine.start();
    
    logger.debug("Reading configuration");
    RepositoryConfiguration config = RepositoryConfiguration.read(MODESHAPE_RESOURCE_FILE);
    assertNotNull(config);
    logger.debug("Modeshape configuration readed");
    
    
    Problems problems = config.validate();
    assertFalse(problems.hasErrors(), "Problems in configuration " + problems.toString());
    
    logger.debug("Deploying repository");
    JcrRepository repository = engine.deploy(config);
    
    assertNotNull(repository);
    logger.debug("Repository deployed");
    problems = repository.getStartupProblems();
    logger.debug("Has Errors: " + problems.hasErrors());
    logger.debug("Has Warnings: " + problems.hasWarnings());
    assertFalse(problems.hasErrors() || problems.hasWarnings(), "Problems deploying repository " + problems);
    
    engine.shutdown().get();
    
  }
  
}
