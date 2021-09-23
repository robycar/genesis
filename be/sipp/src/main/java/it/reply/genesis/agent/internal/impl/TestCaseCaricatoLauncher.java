package it.reply.genesis.agent.internal.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import it.reply.genesis.agent.ServiceManager;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.test.payload.TestCaseCaricatoDTO;
import it.reply.genesis.model.FileSystemScope;
import it.reply.genesis.model.TestCaseCaricatoVO;

@Component
public class TestCaseCaricatoLauncher {

  @Autowired
  private ServiceManager serviceManager;
  
  public TestCaseCaricatoLauncher() {
  }

  public TestCaseCaricatoRunner prepare(TestCaseCaricatoVO vo) throws ApplicationException {
    TestCaseCaricatoDTO dto = new TestCaseCaricatoDTO(vo, true, true)
        .assignFolder(serviceManager.getFileSystemService().listFolderVO(FileSystemScope.TEST_CARICATO, vo.getId()));
    TestCaseCaricatoRunner result = new TestCaseCaricatoRunner(serviceManager, dto);
    return result;
  }
  
}
