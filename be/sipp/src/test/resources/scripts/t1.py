import sys
import os


from it.reply.genesis.agent import TestRunner
from it.reply.genesis.model import FileSystemScope

class MioTestRunner(TestRunner, object):
  def __init__(self):
  	pass
  	
  def start(self, testResult):
  	test = testResult.testCaseCaricato
  	logger = testResult.serviceManager
  	print "Avvio il test", test.id, test.nome, "nella directory", test.pathInstance
  	sys.path.append(test.pathInstance)
  	print(dir(testResult))
  	print(dir(test))
  	
  	# Scarico tutti i file associati ad un test
  	print(test.folder)
  	if test.folder is not None:
  		for f in test.folder :
  			self.download(f, testResult)
  			pass

  def download(self, f, testResult) :
  	print "Scarico il file", f
  	targetDir = testResult.testCaseCaricato.pathInstance
  	targetFileName = os.path.join(targetDir, f.path)
  	fsService = testResult.serviceManager.fileSystemService
  	pathList = f.url.split('/')
  	scope,folder,fileId = pathList[-3:]
  	scope = FileSystemScope.valueOf(scope)
  	fileContent = fsService.readFile(scope,long(folder),fileId)
  	with open(targetFileName, 'w') as fileStream:
  		written = fileContent.content.transferTo(fileStream)
  		print "File salvato", written, " byte scritti"
  	fileContent.content.close()


if __name__ == '__main__':
  print "Sono partito"
  TEST_RUNNER_CLASS = MioTestRunner
