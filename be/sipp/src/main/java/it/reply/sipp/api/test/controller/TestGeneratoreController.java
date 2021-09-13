package it.reply.sipp.api.test.controller;

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

import it.reply.sipp.api.generic.controller.AbstractController;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.generic.payload.PayloadResponse;
import it.reply.sipp.api.test.payload.TestGeneratoreAddRequest;
import it.reply.sipp.api.test.payload.TestGeneratoreAddResponse;
import it.reply.sipp.api.test.payload.TestGeneratoreDTO;
import it.reply.sipp.api.test.payload.TestGeneratoreListResponse;
import it.reply.sipp.api.test.payload.TestGeneratoreRemoveRequet;
import it.reply.sipp.api.test.payload.TestGeneratoreRetrieveResponse;
import it.reply.sipp.api.test.payload.TestGeneratoreUpdateRequest;
import it.reply.sipp.api.test.payload.TestGeneratoreUpdateResponse;
import it.reply.sipp.service.TestGeneratoreService;

@RestController
@RequestMapping(TestGeneratoreController.API_PATH)
public class TestGeneratoreController extends AbstractController {

  public static final String API_PATH = "/api/testgen"; 
  
  @Autowired
  private TestGeneratoreService testGeneratoreService;

  public TestGeneratoreController() {
  }

  @GetMapping
  @PreAuthorize("hasAuthority('FUN_testgen.view')")
  public ResponseEntity<TestGeneratoreListResponse> list() {
    logger.info("enter list()");
    TestGeneratoreListResponse response = new TestGeneratoreListResponse();
    
    try {
      List<TestGeneratoreDTO> result = testGeneratoreService.listTestGeneratore();
      logger.debug("Recuperati {} test generatore", result.size());
      
      response.setList(result);
      
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
  @PutMapping
  @PreAuthorize("hasAuthority('FUN_testgen.create')")
  public ResponseEntity<TestGeneratoreAddResponse> add(@Valid @RequestBody(required=true) TestGeneratoreAddRequest request) {
    logger.info("enter add({})", request);
    TestGeneratoreAddResponse response = new TestGeneratoreAddResponse();
    try {
      TestGeneratoreDTO testDTO = new TestGeneratoreDTO();
      testDTO.setNome(request.getNome());
      testDTO.setDescrizione(request.getDescrizione());
      testDTO.setLineaChiamante(request.getLineaChiamante());
      testDTO.setLineaChiamato(request.getLineaChiamato());
      testDTO.setProxyChiamante(request.getProxyChiamante());
      testDTO.setProxyChiamato(request.getProxyChiamato());
      testDTO.setTemplate(request.getTemplate());
    
      testDTO = testGeneratoreService.createTestGeneratore(testDTO);
      logger.debug("Creato test generatore: {}", testDTO);
      response.setTestGeneratore(testDTO);
      return ResponseEntity.status(HttpStatus.CREATED).body(response);
      
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
  @GetMapping("{id}")
  @PreAuthorize("hasAuthority('FUN_testgen.view')")
  public ResponseEntity<TestGeneratoreRetrieveResponse> retrieve(@PathVariable(required=true) Long id) {
    logger.info("enter retrieve({})", id);
    TestGeneratoreRetrieveResponse response = new TestGeneratoreRetrieveResponse();
    try {
      TestGeneratoreDTO dto = testGeneratoreService.readTestGeneratore(id);
      response.setTestGeneratore(dto);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
  @PostMapping
  @PreAuthorize("hasAuthority('FUN_testgen.edit')")
  public ResponseEntity<TestGeneratoreUpdateResponse> update(@Valid @RequestBody(required=true)TestGeneratoreUpdateRequest request) {
    logger.info("enter update({})", request);
    TestGeneratoreUpdateResponse response = new TestGeneratoreUpdateResponse();
    try {
     TestGeneratoreDTO dto = new TestGeneratoreDTO();
     dto.setId(request.getId());
     dto.setLineaChiamante(request.getLineaChiamante());
     dto.setLineaChiamato(request.getLineaChiamato());
     dto.setNome(request.getNome());
     dto.setProxyChiamante(request.getProxyChiamante());
     dto.setProxyChiamato(request.getProxyChiamato());
     dto.setDescrizione(request.getDescrizione());
     dto.setVersion(request.getVersion());
     
     dto = testGeneratoreService.updateTestGeneratore(dto);
     response.setTestGeneratore(dto);
     return ResponseEntity.ok(response);
     
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
  @DeleteMapping
  @PreAuthorize("hasAuthority('FUN_testgen.delete')")
  public ResponseEntity<PayloadResponse> remove(@Valid @RequestBody(required=true)TestGeneratoreRemoveRequet request) {
    logger.info("enter remove({})", request);
    PayloadResponse response = new PayloadResponse();
    try {
      testGeneratoreService.deleteTestGeneratore(request.getId());
      logger.info("Test generatore {} eliminato", request.getId());
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }

}
