package it.reply.genesis.api.dashboard.controller;

import java.util.Collections;

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
import it.reply.genesis.service.dto.TestListType;

@RestController
@RequestMapping(value=DashboardController.API_PATH)
public class DashboardController extends AbstractController {

  public static final String API_PATH = "/api/dashboard";

  @Autowired
  private TestCaseService testCaseService;
  
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
      
      if (request.getIncludeTestGeneratoreOfType() != null) {
        response.setTestGeneratoList(Collections.emptyList());
      }
      
      if (request.getIncludeTestSuiteOfType() != null) {
        response.setTestSuiteList(Collections.emptyList());
      }
      
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    
  }
}