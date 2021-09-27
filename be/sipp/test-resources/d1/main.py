import os

logger.info("Directory di lavoro: %s" % testCaseCaricato.pathInstance)

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
  
  esitiLogName = os.path.join(dirName, fname)
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
  
def registerTestResult(exitStatus):
  from it.reply.genesis.model import ExecutionResult
  
  logger.debug("Registro il test %d come COMPLETED: %s" % (testCaseCaricato.id, exitStatus))
  serviceManager.testCaseService.markTestCompleted(testCaseCaricato.id, ExecutionResult.valueOf(exitStatus))
  
  
if __name__ == '__main__':
  if checkTestFolderForErrors(testCaseCaricato.pathInstance):
    registerTestResult('KO')

