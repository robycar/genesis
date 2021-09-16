package it.reply.sipp.agent;

import it.reply.sipp.service.FileSystemService;
import it.reply.sipp.service.GruppoService;
import it.reply.sipp.service.LevelService;
import it.reply.sipp.service.LineaService;
import it.reply.sipp.service.OBPService;
import it.reply.sipp.service.TemplateService;
import it.reply.sipp.service.TestCaseService;
import it.reply.sipp.service.TestGeneratoreService;
import it.reply.sipp.service.TestSuiteService;
import it.reply.sipp.service.UserAuthenticationService;
import it.reply.sipp.service.UserService;

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
