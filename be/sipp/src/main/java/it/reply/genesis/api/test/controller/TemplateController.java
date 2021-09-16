package it.reply.genesis.api.test.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.reply.genesis.api.generic.controller.AbstractController;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.generic.payload.PayloadResponse;
import it.reply.genesis.api.test.payload.TemplateAddRequest;
import it.reply.genesis.api.test.payload.TemplateAddResponse;
import it.reply.genesis.api.test.payload.TemplateCreateFullRequest;
import it.reply.genesis.api.test.payload.TemplateCreateFullResponse;
import it.reply.genesis.api.test.payload.TemplateDTO;
import it.reply.genesis.api.test.payload.TemplateListResponse;
import it.reply.genesis.api.test.payload.TemplateRemoveRequest;
import it.reply.genesis.api.test.payload.TemplateRetrieveResponse;
import it.reply.genesis.api.test.payload.TemplateSearchRequest;
import it.reply.genesis.api.test.payload.TemplateSearchResponse;
import it.reply.genesis.api.test.payload.TemplateUpdateRequest;
import it.reply.genesis.api.test.payload.TemplateUpdateResponse;
import it.reply.genesis.service.TemplateService;

@RestController
@RequestMapping("/api/template")
public class TemplateController extends AbstractController {

  @Autowired
  private TemplateService templateService;

  @GetMapping
  @PreAuthorize("hasAuthority('FUN_template.view')")
  public ResponseEntity<TemplateListResponse> list() {
    logger.info("enter list()");
    
    TemplateListResponse response = new TemplateListResponse();
    
    List<TemplateDTO> result;
    try {
      result = templateService.listTemplate();
      response.setList(result);
      return ResponseEntity.ok(response);
      
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    
  }
  @GetMapping("{id}")
  @PreAuthorize("hasAuthority('FUN_template.view')")
  public ResponseEntity<TemplateRetrieveResponse> retrieveTemplate(@PathVariable Long id) {
    logger.info("enter retrieveTemplate({})", id);
    
    TemplateRetrieveResponse response = new TemplateRetrieveResponse();
    try {
      TemplateDTO result = templateService.read(id);
      logger.debug("Recuperato template {}", result);
      response.setTemplate(result);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    
  }

  
  @PutMapping
  @PreAuthorize("hasAuthority('FUN_template.create')")
  public ResponseEntity<TemplateCreateFullResponse> createFull(@Valid @ModelAttribute TemplateCreateFullRequest request) {
    logger.info("enter createFull({})", request);
    TemplateCreateFullResponse response = new TemplateCreateFullResponse();
    try {
      TemplateDTO templateDTO = templateService.createAndPopulateTemplate(request);
      response.setTemplate(templateDTO);
      return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    
  }
  
  @PutMapping("/api/templatesingolo")
  @PreAuthorize("hasAuthority('FUN_template.create')")
  public ResponseEntity<TemplateAddResponse> add(@Valid @RequestBody(required=true) TemplateAddRequest request) {
    logger.info("enter add({})", request);
    
    TemplateAddResponse response = new TemplateAddResponse();
    
    try {
      TemplateDTO templateDTO = new TemplateDTO();
      templateDTO.setNome(request.getNome());
      templateDTO.setDurata(request.getDurata());
      templateDTO.setTypeTemplate(request.getTypeTemplate());
      templateDTO.setDescrizione(request.getDescrizione());
      
      templateDTO = templateService.createTemplate(templateDTO);
      logger.info("Template creato: {}", templateDTO);
      
      response.setTemplate(templateDTO);
      
      return ResponseEntity.status(HttpStatus.CREATED).body(response);
      
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    
  }
  
  @PostMapping
  @PreAuthorize("hasAuthority('FUN_template.edit')")
  public ResponseEntity<TemplateUpdateResponse> update(@Valid @RequestBody(required=true) TemplateUpdateRequest request) {
    logger.info("enter update({})", request);
    
    TemplateUpdateResponse response = new TemplateUpdateResponse();
    
    try {
      TemplateDTO templateDTO = new TemplateDTO();
      templateDTO.setId(request.getId());
      templateDTO.setVersion(request.getVersion());
      templateDTO.setNome(request.getNome());
      templateDTO.setDurata(request.getDurata());
      templateDTO.setTypeTemplate(request.getTypeTemplate());
      templateDTO.setDescrizione(request.getDescrizione());
      templateDTO.setFileLinks(request.getFileLinks());
      
      templateDTO = templateService.updateTemplate(templateDTO);
      
      logger.info("Template modificato: {}", templateDTO);
      response.setTemplate(templateDTO);
      
      return ResponseEntity.ok(response);
      
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    
  }
  
  @DeleteMapping
  @PreAuthorize("hasAuthority('FUN_template.delete')")
  public ResponseEntity<PayloadResponse> remove(@Valid @RequestBody TemplateRemoveRequest request) {
    logger.info("enter remove({})", request);
    PayloadResponse response = new PayloadResponse();
    try {
      templateService.removeTemplate(request.getId());
      logger.info("Template eliminato");
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    
    
  }
  
  @PostMapping("search")
  @PreAuthorize("hasAuthority('FUN_template.view')")
  public ResponseEntity<TemplateSearchResponse> search(@Valid @RequestBody TemplateSearchRequest request) {
    logger.info("enter search({})", request);
    TemplateSearchResponse response = new TemplateSearchResponse();
    try {
      List<TemplateDTO> result = templateService.search(request);
      response.setList(result);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
}
