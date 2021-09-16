package it.reply.genesis.agent;

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

public interface ServiceManager {

  public FileSystemService getFileSystemService();
  
  public GruppoService getGruppoService();
  
  public LevelService getLevelService();
  
  public LineaService getLineaService();
  
  public OBPService getOBPService();
  
  public TemplateService getTemplateService();
  
  public TestCaseService getTestCaseService();
  
  public TestGeneratoreService getTestGeneratoreService();
  
  public TestSuiteService getTestSuiteService();
  
  public UserAuthenticationService getUserAuthenticationService();
  
  public UserService getUserService();
}
