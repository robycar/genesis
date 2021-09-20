import sys
import os

from it.reply.genesis.agent import TestRunner

class MioTestRunner(TestRunner, object):
  def __init__(self):
  	pass
  	
  def start(self, testResult): 
  	print "Avvio il test",
  	open(self.calcolaNomeFile('pippo.csv'))

  def calcolaNomefile(self, testResult, nomeFile):
    return os.path.join(testResult.testCaseCaricato.workingDirectory, nomeFile)

if __name__ == '__main__':
  print "Sono partito"
  TEST_RUNNER_CLASS = MioTestRunner
