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
import it.reply.genesis.api.test.payload.TestSuiteAddRequest;
import it.reply.genesis.api.test.payload.TestSuiteAddResponse;
import it.reply.genesis.api.test.payload.TestSuiteCaricataDTO;
import it.reply.genesis.api.test.payload.TestSuiteDTO;
import it.reply.genesis.api.test.payload.TestSuiteListResponse;
import it.reply.genesis.api.test.payload.TestSuiteLoadResponse;
import it.reply.genesis.api.test.payload.TestSuiteRemoveRequest;
import it.reply.genesis.api.test.payload.TestSuiteRetrieveLoadedResponse;
import it.reply.genesis.api.test.payload.TestSuiteRetrieveResponse;
import it.reply.genesis.api.test.payload.TestSuiteUpdateRequest;
import it.reply.genesis.api.test.payload.TestSuiteUpdateResponse;
import it.reply.genesis.service.TestSuiteService;

@RestController
@RequestMapping(TestSuiteController.API_PATH)
public class TestSuiteController extends AbstractController {

  public static final String API_PATH = "/api/testsuite";
  
  @Autowired
  private TestSuiteService testSuiteService;
  
  public TestSuiteController() {
  }

  @GetMapping
  @PreAuthorize("hasAuthority('FUN_testsuite.view')")
  public ResponseEntity<TestSuiteListResponse> list() {
    logger.info("enter list()");
    TestSuiteListResponse response = new TestSuiteListResponse();
    try {
      List<TestSuiteDTO> result = testSuiteService.list();
      logger.debug("Recuperati {} testSuite", result.size());
      response.setList(result);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
  @PutMapping
  @PreAuthorize("hasAuthority('FUN_testsuite.create')")
  public ResponseEntity<TestSuiteAddResponse> add(@Valid @RequestBody(required = true) TestSuiteAddRequest request) {
    logger.info("enter add({})", request);
    TestSuiteAddResponse response = new TestSuiteAddResponse();
    try {
        TestSuiteDTO dto = new TestSuiteDTO();
        dto.setNome(request.getNome());
        dto.setDescrizione(request.getDescrizione());
        dto.setTestCases(request.getTestCases());
        
        dto = testSuiteService.createTestSuite(dto);
        logger.debug("Creata nuova test suite: {}", dto);
        response.setTestSuite(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
        
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
  @PostMapping
  @PreAuthorize("hasAuthority('FUN_testsuite.edit')")
  public ResponseEntity<TestSuiteUpdateResponse> update(@Valid @RequestBody(required=true) TestSuiteUpdateRequest request) {
    logger.info("enter update({})", request);
    TestSuiteUpdateResponse response = new TestSuiteUpdateResponse();
    try {
      TestSuiteDTO dto = new TestSuiteDTO();
      dto.setId(request.getId());
      dto.setNome(request.getNome());
      dto.setDescrizione(request.getDescrizione());
      dto.setTestCases(request.getTestCases());
      dto.setVersion(request.getVersion());
      
      dto = testSuiteService.update(dto);
      logger.debug("TestSuite {}:{} modificata", dto.getId(), dto.getNome());
      response.setTestSuite(dto);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    
  }
  
  @GetMapping("{id}")
  @PreAuthorize("hasAuthority('FUN_testsuite.view')")
  public ResponseEntity<TestSuiteRetrieveResponse> retrieve(@PathVariable Long id) {
    logger.info("enter retrieve({})", id);
    TestSuiteRetrieveResponse response = new TestSuiteRetrieveResponse();
    try {
     TestSuiteDTO dto = testSuiteService.retrieve(id);
     response.setTestSuite(dto);
     return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
  @GetMapping("loaded/{id}")
  @PreAuthorize("hasAuthority('FUN_testsuite.view')")
  public ResponseEntity<TestSuiteRetrieveLoadedResponse> retrieveLoaded(@PathVariable Long id) {
    logger.info("enter retrieveLoaded({})", id);
    TestSuiteRetrieveLoadedResponse response = new TestSuiteRetrieveLoadedResponse();
    try {
      TestSuiteCaricataDTO testSuite = testSuiteService.retrieveCaricata(id, true);
      response.setTestSuite(testSuite);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    
  }
  
  @GetMapping("load/{id}")
  @PreAuthorize("hasAuthority('FUN_testsuite.run')")
  public ResponseEntity<TestSuiteLoadResponse>load(@PathVariable(required=true) Long id) {
    logger.info("enter load({})", id);
    TestSuiteLoadResponse response = new TestSuiteLoadResponse();
    try {
      TestSuiteCaricataDTO result = testSuiteService.loadTestSuite(id);
      logger.info("test suite caricata con id {}", result.getId());
      response.setTestSuiteCaricata(result);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    
  }
  
  @GetMapping("loaded/run/{id}")
  @PreAuthorize("hasAuthority('FUN_testsuite.run')")
  public ResponseEntity<PayloadResponse> run(@PathVariable(required=true) Long id) {
    logger.info("enter run({})");
    PayloadResponse response = new PayloadResponse();
    try {
      testSuiteService.runLoaded(id);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
  @DeleteMapping()
  @PreAuthorize("hasAuthority('FUN_testsuite.delete')")
  public ResponseEntity<PayloadResponse> remove(@Valid @RequestBody(required=true) TestSuiteRemoveRequest request) {
    logger.info("enter remove({})", request);
    PayloadResponse response = new PayloadResponse();
    try {
      testSuiteService.remove(request.getId());
      logger.debug("TestSuite eliminata: {}", request.getId());
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
}
