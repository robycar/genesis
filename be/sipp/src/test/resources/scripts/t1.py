import sys
import os

from it.reply.sipp.agent import TestRunner

class MioTestRunner(TestRunner, object):
  def __init__(self):
  	pass
  	
  def start(self, testResult): 
  	print "Avvio il test", testResult.testCaseCaricato.id

if __name__ == '__main__':
  print "Sono partito"
  TEST_RUNNER_CLASS = MioTestRunner
