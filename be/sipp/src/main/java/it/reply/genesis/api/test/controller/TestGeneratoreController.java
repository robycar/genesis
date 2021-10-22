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
import it.reply.genesis.api.test.payload.TeseGeneratoreRetrieveCaricatoResponse;
import it.reply.genesis.api.test.payload.TestGeneratoreAddRequest;
import it.reply.genesis.api.test.payload.TestGeneratoreAddResponse;
import it.reply.genesis.api.test.payload.TestGeneratoreCaricatoDTO;
import it.reply.genesis.api.test.payload.TestGeneratoreDTO;
import it.reply.genesis.api.test.payload.TestGeneratoreListResponse;
import it.reply.genesis.api.test.payload.TestGeneratoreLoadRequest;
import it.reply.genesis.api.test.payload.TestGeneratoreLoadResponse;
import it.reply.genesis.api.test.payload.TestGeneratoreRemoveRequet;
import it.reply.genesis.api.test.payload.TestGeneratoreRetrieveResponse;
import it.reply.genesis.api.test.payload.TestGeneratoreScheduleRequest;
import it.reply.genesis.api.test.payload.TestGeneratoreScheduleResponse;
import it.reply.genesis.api.test.payload.TestGeneratoreUpdateRequest;
import it.reply.genesis.api.test.payload.TestGeneratoreUpdateResponse;
import it.reply.genesis.service.TestGeneratoreService;
import it.reply.genesis.service.dto.ScheduleInfo;

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
  
  @PostMapping("load")
  @PreAuthorize("hasAuthority('FUN_testgen.run')")
  public ResponseEntity<TestGeneratoreLoadResponse> load(@Valid @RequestBody(required=true) TestGeneratoreLoadRequest request) {
    logger.info("enter load");
    TestGeneratoreLoadResponse response = new TestGeneratoreLoadResponse();
    try {
      TestGeneratoreCaricatoDTO dto = new TestGeneratoreCaricatoDTO();
      dto.setId(request.getId());
      dto.setRate(request.getRate());
      dto.setDurataTraffico(request.getDurataTraffico());
      TestGeneratoreCaricatoDTO result = testGeneratoreService.loadTestGeneratore(dto, null);
      response.setTestGeneratoreCaricato(result);
      return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
  @PostMapping("schedule")
  @PreAuthorize("hasAuthority('FUN_testgen.run')")
  public ResponseEntity<TestGeneratoreScheduleResponse> schedule(@Valid @RequestBody(required=true) TestGeneratoreScheduleRequest request) {
    logger.info("enter load");
    TestGeneratoreScheduleResponse response = new TestGeneratoreScheduleResponse();
    try {
      TestGeneratoreCaricatoDTO dto = new TestGeneratoreCaricatoDTO();
      dto.setId(request.getId());
      dto.setRate(request.getRate());
      dto.setDurataTraffico(request.getDurataTraffico());
      ScheduleInfo scheduleInfo = new ScheduleInfo(request.getScheduleDateTime(), request.getDelay());
      
      TestGeneratoreCaricatoDTO result = testGeneratoreService.loadTestGeneratore(dto, scheduleInfo);
      response.setTestGeneratoreCaricato(result);
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

  @GetMapping("loaded/run/{id}")
  @PreAuthorize("hasAuthority('FUN_testgen.run')")
  public ResponseEntity<PayloadResponse> run(@PathVariable(required=true) Long id) {
    logger.info("enter run({})", id);
    PayloadResponse response = new PayloadResponse();
    try {
      testGeneratoreService.runLoaded(id);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }

  @GetMapping("loaded/{id}")
  @PreAuthorize("hasAuthority('FUN_testgen.run')")
  public ResponseEntity<TeseGeneratoreRetrieveCaricatoResponse> retrieveCaricato(@PathVariable(required=true) Long id) {
    logger.info("enter retrieveCaricato({})", id);
    TeseGeneratoreRetrieveCaricatoResponse response = new TeseGeneratoreRetrieveCaricatoResponse();
    try {
      TestGeneratoreCaricatoDTO result = testGeneratoreService.retrieveCaricato(id, true, false);
      response.setTestGeneratoreCaricato(result);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }

  @DeleteMapping("loaded/{ids}")
  @PreAuthorize("hasAuthority('FUN_testgen.run')")
  public ResponseEntity<PayloadResponse>removeLoaded(@Valid @PathVariable(required=true)List<Long> ids) {
    logger.info("enter removeLoaded({})", ids);
    PayloadResponse response = new PayloadResponse();
    try {
      if (ids.isEmpty()) {
        logger.info("Chiamata la funzione removeLoaded senza indicare gli id delle test suite da eliminare");
      } else {
        testGeneratoreService.removeCaricati(ids);
      }
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }

  }
  
}
