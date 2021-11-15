package it.reply.genesis.api.linea.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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
import it.reply.genesis.api.linea.payload.TypeLineaAddRequest;
import it.reply.genesis.api.linea.payload.TypeLineaAddResponse;
import it.reply.genesis.api.linea.payload.TypeLineaDTO;
import it.reply.genesis.api.linea.payload.TypeLineaListResponse;
import it.reply.genesis.api.linea.payload.TypeLineaRemoveRequest;
import it.reply.genesis.api.linea.payload.TypeLineaRetrieveResponse;
import it.reply.genesis.api.linea.payload.TypeLineaUpdateRequest;
import it.reply.genesis.api.linea.payload.TypeLineaUpdateResponse;
import it.reply.genesis.service.LineaService;

@RestController
@RequestMapping("/api/typeLinea")
public class TypeLineaController extends AbstractController {

	@Autowired
	private LineaService lineaService;

	@GetMapping("")
	@PreAuthorize("hasAuthority('FUN_linea.view')")
	public ResponseEntity<TypeLineaListResponse> list() {
		logger.debug("enter list()");
		
		TypeLineaListResponse response = new TypeLineaListResponse();
		try {
			List<TypeLineaDTO> result = lineaService.listTypeLinee();
			
			logger.debug("TypeLinea recuperati: {}", result.size());
			
			response.setList(result);
			return ResponseEntity.ok(response);
			
		} catch (ApplicationException e) {
			return handleException(e, response);
		}
		
		
	}
	
  @PutMapping("")
  @PreAuthorize("hasAuthority('FUN_linea.edit')")
  public ResponseEntity<TypeLineaAddResponse> add(@Valid @RequestBody(required = true)TypeLineaAddRequest request) {
    logger.info("enter add({})", request);
    
    TypeLineaAddResponse response = new TypeLineaAddResponse();
    try {
      
      TypeLineaDTO typeLineaDTO = new TypeLineaDTO();
      typeLineaDTO.setDescrizione(request.getDescrizione());
      typeLineaDTO.setNatura(request.getNatura());
      
      typeLineaDTO = lineaService.createTypeLinea(typeLineaDTO);
      
      logger.info("Creata nuova type linea: {}", typeLineaDTO);
      response.setTypeLinea(typeLineaDTO);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    
    
  }
  
  @GetMapping("{id}")
  @PreAuthorize("hasAuthority('FUN_linea.view')")
  public ResponseEntity<TypeLineaRetrieveResponse> retrieve(@PathVariable(name = "id", required=true)Long id) {
    logger.info("enter retrieve({})", id);
    
    TypeLineaRetrieveResponse response = new TypeLineaRetrieveResponse();
    
    try {
      TypeLineaDTO typeLineaDTO = lineaService.readTypeLinea(id);
      response.setTypeLinea(typeLineaDTO);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
  
  @PostMapping("")
  @PreAuthorize("hasAuthority('FUN_linea.edit')") 
  public ResponseEntity<TypeLineaUpdateResponse> update(@Valid @RequestBody(required = true) TypeLineaUpdateRequest request) {
    logger.info("enter update({})", request);
    
    TypeLineaUpdateResponse response = new TypeLineaUpdateResponse();
    try {
      TypeLineaDTO dto = new TypeLineaDTO();
      dto.setId(request.getId());
      dto.setDescrizione(request.getDescrizione());
      dto.setNatura(request.getNatura());
      dto.setVersion(request.getVersion());
      
      dto = lineaService.updateTypeLinea(dto);
      logger.debug("TypeLinea {} modificata", dto.getId());
      response.setTypeLinea(dto);
      return ResponseEntity.ok(response);
      
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }

  @PreAuthorize("hasAuthority('FUN_linea.delete')")
  @DeleteMapping("")
  public ResponseEntity<PayloadResponse> removeTypeLinea(@Valid @RequestBody(required=true) TypeLineaRemoveRequest request) {
    logger.info("enter removeTypeLinea({})", request);
    
    PayloadResponse response = new PayloadResponse();
    try {
      lineaService.removeTypeLinea(request.getId());
      
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    
  }
	
}
