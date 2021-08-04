package it.reply.sipp.api.linea.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.reply.sipp.api.generic.controller.AbstractController;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.linea.payload.TypeLineaAddRequest;
import it.reply.sipp.api.linea.payload.TypeLineaAddResponse;
import it.reply.sipp.api.linea.payload.TypeLineaDTO;
import it.reply.sipp.api.linea.payload.TypeLineaListResponse;
import it.reply.sipp.service.LineaService;

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
      
      typeLineaDTO = lineaService.createTypeLinea(typeLineaDTO);
      
      logger.info("Creata nuova type linea: {}", typeLineaDTO);
      response.setTypeLinea(typeLineaDTO);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
    
    
  }

	
}
