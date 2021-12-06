import os
import sys
import traceback

logger.info("Directory di lavoro: %s" % testCaseCaricato.pathInstance)
logger.info("Test case: %s" % testCaseCaricato)

#def registerTestResult(exitStatus):
#  from it.reply.genesis.model import ExecutionResult
#  
#  logger.debug("Registro il test %d come COMPLETED: %s" % (testCaseCaricato.id, exitStatus))
#  serviceManager.testCaseService.markTestCompleted(testCaseCaricato.id, ExecutionResult.valueOf(exitStatus))
  
def initGenesis():
  logger.debug('searcing drop folder')
  dropFolder = serviceManager.getEnvironment().getProperty('genesis.agent.internal.dropfolder')
  logger.info('Drop folder: %s' % dropFolder)
  if not os.path.isdir(dropFolder):
    raise Exception("La directory %s non esiste o non e' una directory" % dropFolder)
  
  sys.path.append(os.path.join(dropFolder, 'script'))
  
  from genesis import Genesis
  genesis = Genesis(serviceManager, logger, testCaseCaricato);
  
  return genesis

def checkTestFolderForErrors(dirName):
  '''Verifica la presenza di file chiamati '*errors.*.log' 
  oppure se all'interno del file esiti.log siano presenti dei '#KO#'
  In caso affermativo la funzione restituisce True.
  @param dirName: la directory dove cercare i file di errore
  '''

  logger.debug("Cerco la presenza di file di errore nella directory %s" % dirName)

  folderContent = os.listdir(dirName)
  for fname in folderContent:
    # Cerco i file *_errors.*.log all'interno della directory del test
    if '_errors.' in fname and fname.endswith('.log') and os.path.isfile(os.path.join(dirName, fname)):
      logger.warn('Trovato file di errore %s.' % fname)
      return True
  
  esitiLogName = os.path.join(dirName, 'Esiti.log')
  if os.path.isfile(esitiLogName):
    with open(esitiLogName) as esitiFile:
      currentLine = 0
      for line in esitiFile:
        ++currentLine
        if '#KO#' in line:
          logger.warn("Trovato #KO# nel file %s:%d: %s" % esitiLogName, currentLine, line.strip())
          return False
  else:
    logger.info("Il file esiti.log non e' stato trovato all'interno della directory " + dirName)

if __name__ == '__main__':
  try:
    genesis = initGenesis()
    genesis.downloadTestCaseFolder()
    
    #fai tutto quello che devi fare
    uploadedFiles = genesis.uploadFiles([os.path.join(genesis.targetDir,'InputOutput.log'), os.path.join(genesis.targetDir, 'M00.pcap')])
    
    # Salva il test case. Mettilo in OK e registra pcap e callid
    props = genesis.testCase.properties
    if props is None:
      genesis.testCase.properties = props = dict()
    props['call-id'] = 'callid impostato dal test'
    props['pcap'] = uploadedFiles[1].url
    genesis.registerTestResult('OK')
    
    
    logger.debug('genesis creato')
  except Exception as error:
    logger.error(traceback.format_exc())
    raise error

  
