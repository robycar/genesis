import os

logger.info("Directory di lavoro: %s" % testCaseCaricato.pathInstance)

def registerTestResult(exitStatus):
  from it.reply.genesis.model import ExecutionResult
  
  logger.debug("Registro il test %d come COMPLETED: %s" % (testCaseCaricato.id, exitStatus))
  serviceManager.testCaseService.markTestCompleted(testCaseCaricato.id, ExecutionResult.valueOf(exitStatus))
  
  
if __name__ == '__main__':
  filesToUpload = ['InputOutput.log']
  registerTestResult(testCaseCaricato.id, 'KO', pcap = filesToUpload)

