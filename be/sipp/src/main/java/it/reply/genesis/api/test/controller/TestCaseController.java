package it.reply.genesis.api.test.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.reply.genesis.api.generic.controller.AbstractController;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.generic.payload.PayloadResponse;
import it.reply.genesis.api.test.payload.TestCaseAddRequest;
import it.reply.genesis.api.test.payload.TestCaseAddResponse;
import it.reply.genesis.api.test.payload.TestCaseDTO;
import it.reply.genesis.api.test.payload.TestCaseListResponse;
import it.reply.genesis.api.test.payload.TestCaseRemoveRequest;
import it.reply.genesis.api.test.payload.TestCaseRetrieveResponse;
import it.reply.genesis.api.test.payload.TestCaseUpdateRequest;
import it.reply.genesis.api.test.payload.TestCaseUpdateResponse;
import it.reply.genesis.service.TestCaseService;

@RestController
@RequestMapping(TestCaseController.API_PATH)
public class TestCaseController extends AbstractController {

  public static final String API_PATH = "/api/testcase"; 
  
  @Autowired
  private TestCaseService testCaseService;
  
  public TestCaseController() {
  }

  @GetMapping
  @PreAuthorize("hasAuthority('FUN_test.view')")
  public ResponseEntity<TestCaseListResponse> list() {
    logger.info("enter list()");
    TestCaseListResponse response = new TestCaseListResponse();
    
    try {
      List<TestCaseDTO> result = testCaseService.listTestCase();
      logger.debug("Recuperati {} test case", result.size());
      
      response.setList(result);
      
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
  @PutMapping
  @PreAuthorize("hasAuthority('FUN_test.edit')")
  public ResponseEntity<TestCaseAddResponse> add(@Valid @RequestBody(required=true) TestCaseAddRequest request) {
    logger.info("enter add({})", request);
    TestCaseAddResponse response = new TestCaseAddResponse();
    try {
      TestCaseDTO testCaseDTO = new TestCaseDTO();
      testCaseDTO.setNome(request.getNome());
      testCaseDTO.setDescrizione(request.getDescrizione());
      testCaseDTO.setChiamato(request.getChiamato());
      testCaseDTO.setChiamanti(request.getChiamanti());
      testCaseDTO.setTemplate(request.getTemplate());
      
      testCaseDTO = testCaseService.createTestCase(testCaseDTO);
      logger.debug("Creato test case: {}", testCaseDTO);
      response.setTestCase(testCaseDTO);
      return ResponseEntity.status(HttpStatus.CREATED).body(response);
      
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
  @DeleteMapping
  @PreAuthorize("hasAuthority('FUN_test.delete')")
  public ResponseEntity<PayloadResponse> remove(@Valid @RequestBody TestCaseRemoveRequest request) {
    logger.info("enter remove({})", request);
    PayloadResponse response = new PayloadResponse();
    try {
      testCaseService.removeTestCase(request.getId());
      logger.info("TestCase eliminato");
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    

  }

  @GetMapping("{id}")
  @PreAuthorize("hasAuthority('FUN_test.view')")
  public ResponseEntity<TestCaseRetrieveResponse> retrieve(@PathVariable Long id) {
    logger.info("enter retrieve({})", id);
    TestCaseRetrieveResponse response = new TestCaseRetrieveResponse();
    try {
      TestCaseDTO result = testCaseService.read(id);
      logger.debug("Recuperato testCase {}", result);
      response.setTestCase(result);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    
  }
  
  @PostMapping()
  @PreAuthorize("hasAuthority('FUN_test.edit')")
  public ResponseEntity<TestCaseUpdateResponse> update(@Valid @RequestBody TestCaseUpdateRequest request) {
    logger.info("enter update({})", request);
    TestCaseUpdateResponse response = new TestCaseUpdateResponse();
    try {
      TestCaseDTO dto = new TestCaseDTO();
      dto.setId(request.getId());
      dto.setNome(request.getNome());
      dto.setVersion(request.getVersion());
      dto.setExpectedDuration(request.getExpectedDuration());
      dto.setDescrizione(request.getDescrizione());
      dto.setChiamato(request.getChiamato());
      dto.setChiamanti(request.getChiamanti());
      
      dto = testCaseService.updateTestCase(dto);
      response.setTestCase(dto);
      return ResponseEntity.ok(response);
      
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }

}
