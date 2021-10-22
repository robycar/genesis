package it.reply.genesis.api.dashboard.controller;

import java.time.LocalDate;
import java.time.Period;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.reply.genesis.api.dashboard.payload.DashboardInfoRequest;
import it.reply.genesis.api.dashboard.payload.DashboardInfoResponse;
import it.reply.genesis.api.generic.controller.AbstractController;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.service.TestCaseService;
import it.reply.genesis.service.TestGeneratoreService;
import it.reply.genesis.service.TestSuiteService;
import it.reply.genesis.service.dto.TestListType;

@RestController
@RequestMapping(value=DashboardController.API_PATH)
public class DashboardController extends AbstractController {

  public static final String API_PATH = "/api/dashboard";

  @Autowired
  private TestCaseService testCaseService;
  
  @Autowired
  private TestSuiteService testSuiteService;
  
  @Autowired
  private TestGeneratoreService testGeneratoreService;
  
  public DashboardController() {
  }

  @Transactional(readOnly = true)
  @PostMapping("info")
  public ResponseEntity<DashboardInfoResponse> info(@RequestBody(required = true)DashboardInfoRequest request) {
    logger.info("enter info({})", request);
    
    DashboardInfoResponse response = new DashboardInfoResponse();
    try {
      
      TestListType inclusion = request.getIncludeTestCaseOfType();
      if (inclusion != null) {
        response.setTestCaseList(testCaseService.readTestCaricatiOfType(inclusion));
      }
      
      inclusion = request.getIncludeTestGeneratoreOfType();
      if (inclusion != null) {
        response.setTestGeneratoList(testGeneratoreService.readTestCaricatiOfType(inclusion));
      }
      
      inclusion = request.getIncludeTestSuiteOfType();
      if (inclusion != null) {
        response.setTestSuiteList(testSuiteService.readTestSuiteCaricateOfType(inclusion));
      }
      
      if (request.isIncludeRiepilogoTestCase()) {
        LocalDate oggi = LocalDate.now();
        response.setRiepilogoTestCaseGiorni(testCaseService.riepilogoNumerico(oggi, oggi));
        response.setRiepilogoTestCaseSettimana(testCaseService.riepilogoNumerico(oggi.minus(Period.ofWeeks(1)), oggi));
      }
      
      if (request.isIncludeRiepilogoTestSuite()) {
        LocalDate oggi = LocalDate.now();
        response.setRiepilogoTestSuiteGiorno(testSuiteService.riepilogoNumerico(oggi, oggi));
        response.setRiepilogoTestSuiteSettimana(testSuiteService.riepilogoNumerico(oggi.minus(Period.ofWeeks(1)), oggi));
      }
     
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    
  }
}
