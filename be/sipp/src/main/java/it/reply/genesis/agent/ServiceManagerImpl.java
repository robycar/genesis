package it.reply.genesis.agent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import it.reply.genesis.service.FileSystemService;
import it.reply.genesis.service.GruppoService;
import it.reply.genesis.service.LevelService;
import it.reply.genesis.service.LineaService;
import it.reply.genesis.service.OBPService;
import it.reply.genesis.service.TemplateService;
import it.reply.genesis.service.TestCaseService;
import it.reply.genesis.service.TestGeneratoreService;
import it.reply.genesis.service.TestSuiteService;
import it.reply.genesis.service.UserAuthenticationService;
import it.reply.genesis.service.UserService;

@Component
public class ServiceManagerImpl implements ServiceManager {

  @Autowired
  private FileSystemService fileSystemService;
  
  @Autowired
  private GruppoService gruppoService;
  
  @Autowired
  private LevelService levelService;
  
  @Autowired
  private LineaService lineaService;
  
  @Autowired
  private OBPService oBPService;
  
  @Autowired
  private TemplateService templateService;
  
  @Autowired
  private TestCaseService testCaseService;

  @Autowired
  private TestGeneratoreService testGeneratoreService;

  @Autowired
  private TestSuiteService testSuiteService;

  @Autowired
  private UserService userService;
  
  @Autowired
  private Environment environment;
  
  @Autowired
  private UserAuthenticationService userAuthenticationService;
  
  public ServiceManagerImpl() {
  }

  @Override
  public FileSystemService getFileSystemService() {
    return fileSystemService;
  }

  @Override
  public GruppoService getGruppoService() {
    return gruppoService;
  }

  @Override
  public LevelService getLevelService() {
    return levelService;
  }

  @Override
  public LineaService getLineaService() {
    return lineaService;
  }

  @Override
  public OBPService getOBPService() {
    return oBPService;
  }

  @Override
  public TemplateService getTemplateService() {
    return templateService;
  }

  @Override
  public TestCaseService getTestCaseService() {
    return testCaseService;
  }

  @Override
  public TestGeneratoreService getTestGeneratoreService() {
    return testGeneratoreService;
  }

  @Override
  public TestSuiteService getTestSuiteService() {
    return testSuiteService;
  }

  @Override
  public UserService getUserService() {
    return userService;
  }

  public Environment getEnvironment() {
    return environment;
  }

  @Override
  public UserAuthenticationService getUserAutenticationService() {
    return userAuthenticationService;
  }

}
