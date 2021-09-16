package it.reply.genesis.api.admin.controller;

import java.util.List;
import java.util.stream.Collectors;

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

import it.reply.genesis.api.admin.payload.GruppoAddRequest;
import it.reply.genesis.api.admin.payload.GruppoAddResponse;
import it.reply.genesis.api.admin.payload.GruppoDTO;
import it.reply.genesis.api.admin.payload.GruppoListResponse;
import it.reply.genesis.api.admin.payload.GruppoRemoveRequest;
import it.reply.genesis.api.admin.payload.GruppoRetrieveResponse;
import it.reply.genesis.api.admin.payload.GruppoUpdateRequest;
import it.reply.genesis.api.admin.payload.GruppoUpdateResponse;
import it.reply.genesis.api.generic.controller.AbstractController;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.generic.payload.PayloadResponse;
import it.reply.genesis.model.GruppoVO;
import it.reply.genesis.service.GruppoService;

@RestController
@RequestMapping("/api/group")
public class GruppoController extends AbstractController {

	@Autowired
	private GruppoService gruppoService;
	
	public GruppoController() {
	}

	@GetMapping("")
	@PreAuthorize("hasAuthority('FUN_group.view')")
	public GruppoListResponse list() {
		
		List<GruppoVO> gruppi = gruppoService.listGroups();
		
		GruppoListResponse response = new GruppoListResponse();
		response.setGruppi(gruppi.stream()
				.map(vo -> new GruppoDTO(vo))
				.collect(Collectors.toList()));
		return response;
	}
	
	@GetMapping("{id}")
	@PreAuthorize("hasAuthority('FUN_group.view')")
	public ResponseEntity<GruppoRetrieveResponse> retrieve(@PathVariable(required=true) Long id) {
	  logger.info("enter retrieve({})", id);
	  GruppoRetrieveResponse response = new GruppoRetrieveResponse();
	  try {
	    GruppoDTO gruppo = gruppoService.readGruppo(id);
	    response.setGruppo(gruppo);
	    logger.debug("Recuperato gruppo: {}", gruppo);
	    return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
	  
	}
	
	@PutMapping("")
	@PreAuthorize("hasAuthority('FUN_group.edit')")
	public ResponseEntity<? extends GruppoAddResponse> add(@Valid @RequestBody(required=true) GruppoAddRequest request) {
		GruppoVO vo = new GruppoVO();
		vo.setNome(request.getNome());
		vo.setDescrizione(request.getDescrizione());
		
		GruppoAddResponse response = new GruppoAddResponse();
		try {
			vo = gruppoService.addGruppo(vo);
			response.setGruppo(new GruppoDTO(vo));
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (ApplicationException e) {
			return handleException(e, response);
		}
	}
	
	@PostMapping("")
	@PreAuthorize("hasAuthority('FUN_group.edit')")
	public ResponseEntity<? extends GruppoUpdateResponse> update(
			@Valid @RequestBody(required=true) GruppoUpdateRequest request) {
		
		GruppoVO gruppoVO = new GruppoVO();
		gruppoVO.setId(request.getId());
		gruppoVO.setNome(request.getNome());
		gruppoVO.setDescrizione(request.getDescrizione());
		gruppoVO.setVersion(request.getVersion() == null ? 0 : request.getVersion());
		
		GruppoUpdateResponse response = new GruppoUpdateResponse();
		
		try {
			gruppoVO = gruppoService.updateGruppo(gruppoVO);
			response.setGruppo(new GruppoDTO(gruppoVO));
			return ResponseEntity.ok(response);
		} catch (ApplicationException e) {
			return handleException(e, response);
		}
		
	}
	
	@DeleteMapping
	@PreAuthorize("hasAuthority('FUN_group.delete')")
	public ResponseEntity<PayloadResponse> remove(
			@Valid @RequestBody(required=true) GruppoRemoveRequest request) {
		logger.info("enter remove");
		PayloadResponse response = new PayloadResponse();
		
		try {
			gruppoService.removeGruppo(request.getId());
			logger.info("Gruppo {} eliminato", request.getId());
			return ResponseEntity.ok(response);
		} catch (ApplicationException e) {
			return handleException(e, response);
		}
	}
	
}
