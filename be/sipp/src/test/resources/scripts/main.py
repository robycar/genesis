import os
import sys

if __name__ == '__main__':
  ok = True
  try:
    logger.info("Sono lo script e sono partito")
  except NameError:
    import logging
    logging.basicConfig(level=logging.DEBUG)
    logger = logging.getLogger('main')
    logger.error("variabile logger non definita")
    logger.info("Sono lo script e sono partito ma senza il logger fornito dal be")
  
  logger.info("TestCaseCaricato: %s" % testCaseCaricato)
  
    
