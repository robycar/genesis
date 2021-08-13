package it.reply.sipp.api.linea.controller;

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

import it.reply.sipp.api.generic.controller.AbstractController;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.generic.payload.PayloadResponse;
import it.reply.sipp.api.linea.payload.LineaAddRequest;
import it.reply.sipp.api.linea.payload.LineaAddResponse;
import it.reply.sipp.api.linea.payload.LineaDTO;
import it.reply.sipp.api.linea.payload.LineaListResponse;
import it.reply.sipp.api.linea.payload.LineaRemoveRequest;
import it.reply.sipp.api.linea.payload.LineaRetrieveResponse;
import it.reply.sipp.api.linea.payload.LineaUpdateRequest;
import it.reply.sipp.api.linea.payload.LineaUpdateResponse;
import it.reply.sipp.api.linea.payload.TypeLineaDTO;
import it.reply.sipp.service.LineaService;

@RestController
@RequestMapping("/api/linea")
public class LineaController extends AbstractController {

	@Autowired
	private LineaService lineaService;

	public LineaController() {
	}

	@GetMapping("")
	@PreAuthorize("hasAuthority('FUN_linea.view')")
	public ResponseEntity<LineaListResponse> list() {

		LineaListResponse response = new LineaListResponse();
		try {
			List<LineaDTO> result = lineaService.listLinee();
			logger.debug("Liste recuperate: {}", result.size());
			response.setList(result);
			return ResponseEntity.ok(response);
		} catch (ApplicationException e) {
			return handleException(e, response);
		}
	}

	@PutMapping("")
	@PreAuthorize("hasAuthority('FUN_linea.edit')")
	public ResponseEntity<LineaAddResponse> add(@Valid @RequestBody(required = true) LineaAddRequest request) {
		logger.info("enter add({})", request);

		LineaAddResponse response = new LineaAddResponse();

		try {
			LineaDTO lineaDTO = new LineaDTO();
			lineaDTO.setIp(request.getIp());
			lineaDTO.setNumero(request.getNumero());
			lineaDTO.setPassword(request.getPassword());
			lineaDTO.setPorta(request.getPorta());
			lineaDTO.setTypeLinea(new TypeLineaDTO(request.getTypeLinea().getId()));

			lineaDTO = lineaService.createLinea(lineaDTO);
			logger.debug("Linea creata: {}", lineaDTO);
			response.setLinea(lineaDTO);

			return ResponseEntity.ok(response);
		} catch (ApplicationException e) {
			return handleException(e, response);
		}
	}

	@PostMapping
	@PreAuthorize("hasAuthority('FUN_linea.edit')")
	public ResponseEntity<LineaUpdateResponse> update(@Valid @RequestBody(required=true) LineaUpdateRequest request) {
		logger.info("enter update({})", request);

		LineaUpdateResponse response = new LineaUpdateResponse();

		try {
			LineaDTO lineaDTO = new LineaDTO();
			lineaDTO.setId(request.getId());
			lineaDTO.setIp(request.getIp());
			lineaDTO.setNumero(request.getNumero());
			lineaDTO.setPassword(request.getPassword());
			lineaDTO.setPorta(request.getPorta());
			lineaDTO.setTypeLinea(
					request.getTypeLinea() != null && request.getTypeLinea().getId() != null ? request.getTypeLinea()
							: null);

			lineaDTO = lineaService.updateLinea(lineaDTO);
			logger.debug("Linea modificata: {}", lineaDTO);

			response.setLinea(lineaDTO);
			return ResponseEntity.ok(response);

		} catch (ApplicationException e) {
			return handleException(e, response);
		}

	}
	
	@PreAuthorize("hasAuthority('FUN_linea.delete')")
	@DeleteMapping("")
	public ResponseEntity<PayloadResponse> remove(@Valid @RequestBody(required=true) LineaRemoveRequest request) {
		logger.info("enter remove({})", request);
		
		PayloadResponse response = new PayloadResponse();
		
		try {
			lineaService.removeLinea(request.getId());
			
			logger.debug("Linea {} eliminata dal sistema", request.getId());
			return ResponseEntity.ok(response);
			
		} catch (ApplicationException e) {
			return handleException(e, response);
		}
	}
	
  @GetMapping("{id}")
  public ResponseEntity<LineaRetrieveResponse> retrieveLinea(@PathVariable(required=true) Long id) {
    logger.info("enter retrieveProxy({})", id);
    
    LineaRetrieveResponse response = new LineaRetrieveResponse();
    try {
      LineaDTO result = lineaService.readLinea(id);
      response.setLinea(result);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }

}
