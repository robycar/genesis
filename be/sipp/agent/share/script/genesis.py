# -*- coding: utf-8 -*-

__all__ = ['genesis']

import os
import mimetypes

from it.reply.genesis.model import FileSystemScope
from it.reply.genesis.agent.internal.impl import MultipartFileMock

class Genesis(object):
  nome = 'genesis';
  def __init__(self, serviceManager, logger, testCase):
    self.serviceManager = serviceManager;
    self.logger = logger
    self.testCase = testCase
    self.targetDir = self.testCase.pathInstance
    
    self.logger.debug('Genesis help class initialized')

  def downloadTestCaseFolder(self):
    '''Esegue il download di tutti i file associati al test case
    '''
    if self.testCase.folder is not None:
      for f in self.testCase.folder:
        self._downloadTestFile(f)

  def _downloadTestFile(self, f):
    self.logger.debug('Scarico il file %s' % f)
    targetFileName = os.path.join(self.targetDir, f.path)
    fsService = self.serviceManager.fileSystemService
    pathList = f.url.split('/')
    scope,folder,fileId = pathList[-3:]
    scope = FileSystemScope.valueOf(scope)
    fileContent = fsService.readFile(scope,long(folder),fileId)
    with open(targetFileName, 'w') as fileStream:
      written = fileContent.content.transferTo(fileStream)
      self.logger.info( "File salvato, %s byte scritti" % written)
    fileContent.content.close()
  
  def isTestCaseCaricato(self):
    '''Restituisce True se il test memorizzato nel costruttore e' un test case caricato,
    False altrimenti (TestGeneratore)
    '''
    #meglio utilizzare isInstance?
    return type(self.testCase).__name__ == 'TestCaseCaricatoDTO'
  
  def uploadFiles(self, path):
    '''carica uno o piu' file nella directory del test'''
    self.logger.debug('uploading files: {}'.format(path))
    if not path:
      return []
    if not isinstance(path, list):
      path = [path]

    if self.isTestCaseCaricato():
      scope = FileSystemScope.TEST_CARICATO
    else:
      scope = FileSystemScope.TESTGEN_CARICATO
    uploadingFiles = []
    for p in path:
      mimeType = mimetypes.guess_type(p)[0]
      with open(p) as fileToUpload:
        multipartFile = MultipartFileMock('file', os.path.basename(p), mimeType, fileToUpload)
        uploadingFiles.append(multipartFile)
    
    fsService = self.serviceManager.fileSystemService
    uploadedFiles = fsService.upload(scope, self.testCase.id, uploadingFiles)
    self.logger.debug('uploaded %d files: %s' % (len(uploadedFiles), uploadedFiles))
    
    return uploadedFiles

  def registerTestResult(self, exitStatus):
    '''Aggiorna il test sul db memorizzando nel campo result l'exitStatus. 
    Eventuali altri campi modificati saranno propagati. Questo metodo richiama
    self.updateTestCaseCaricato() o self.updateTestGeneratoreCaricato() in base al tipo
    di test che si sta eseguendo
    TODO: Per ora l'updateTestGeneratoreCaricato e' da implementare
    @param exitStatus: deve essere un valore definito in ExecutionResult (OK o KO)
    '''
    from it.reply.genesis.model import ExecutionResult
    from it.reply.genesis.model import LoadedEntityStatus
    from java.time import Instant
    
    self.logger.debug("Registro il test %d come COMPLETED: %s" % (self.testCase.id, exitStatus))
    
    self.testCase.result = ExecutionResult.valueOf(exitStatus)
    self.testCase.stato = LoadedEntityStatus.COMPLETED
    self.testCase.endDate = Instant.now()
    
    # self.updateTestCaricati self.serviceManager.testCaseService.updateTestCaseCaricato(testCaseCaricato.id, ExecutionResult.valueOf(exitStatus))
    if self.isTestCaseCaricato():
      self.updateTestCaseCaricato()
  
  def updateTestCaseCaricato(self):
    self.logger.debug('enter updateTestCaseCaricato')
    self.testCase = self.serviceManager.testCaseService.updateTestCaseCaricato(self.testCase)

  