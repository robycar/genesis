package it.reply.genesis.api.admin.controller;

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

import it.reply.genesis.api.admin.payload.LevelAddRequest;
import it.reply.genesis.api.admin.payload.LevelAddResponse;
import it.reply.genesis.api.admin.payload.LevelDTO;
import it.reply.genesis.api.admin.payload.LevelListResponse;
import it.reply.genesis.api.admin.payload.LevelRemoveRequest;
import it.reply.genesis.api.admin.payload.LevelRetrieveResponse;
import it.reply.genesis.api.admin.payload.LevelUpdateLevelResponse;
import it.reply.genesis.api.admin.payload.LevelUpdateRequest;
import it.reply.genesis.api.generic.controller.AbstractController;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.generic.payload.PayloadResponse;
import it.reply.genesis.service.LevelService;

@RestController
@RequestMapping("/api/level")
public class LevelController extends AbstractController {

	@Autowired
	private LevelService levelService;
	
	public LevelController() {
	}

	@PreAuthorize("hasAuthority('FUN_level.view')")
	@GetMapping("")
	public ResponseEntity<LevelListResponse> list() {
		logger.info("enter list");
		
		List<LevelDTO> livelli = levelService.listLivelli();
		logger.debug("Recuperati {} livelli da db", livelli.size());
			
		LevelListResponse response = new LevelListResponse();
		response.setLivelli(livelli);
		return ResponseEntity.ok(response);
		
	}
	
	@PreAuthorize("hasAuthority('FUN_level.edit')")
	@PutMapping("")
	public ResponseEntity<LevelAddResponse> add(@Valid @RequestBody LevelAddRequest request) {
		logger.info("enter add({})", request);
		LevelAddResponse response = new LevelAddResponse();
				
		try {
			LevelDTO dto = new LevelDTO();
			dto.setNome(request.getNome());
			dto.setDescrizione(request.getDescrizione());
			dto.setFunzioni(request.getFunzioni());
			
			dto = levelService.addLevel(dto);
			response.setLevel(dto);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
			
		} catch (ApplicationException e) {
			return handleException(e, response);
		}
	}
	
	@PreAuthorize("hasAuthority('FUN_level.edit')")
	@PostMapping("")
	public ResponseEntity<LevelUpdateLevelResponse> updateLevel(@Valid @RequestBody LevelUpdateRequest request) {
		
		LevelDTO levelDTO = new LevelDTO();
		levelDTO.setId(request.getId());
		levelDTO.setNome(request.getNome());
		levelDTO.setDescrizione(request.getDescrizione());
		levelDTO.setFunzioni(request.getFunzioni());
		
		LevelUpdateLevelResponse response = new LevelUpdateLevelResponse();
		
		try {
			LevelDTO result = levelService.updateLevel(levelDTO);
			
			response.setLevel(result);
			
			return ResponseEntity.ok().body(response);
		} catch (ApplicationException e) {
			return handleException(e, response);
		}
	}
	
	@PreAuthorize("hasAuthority('FUN_level.delete')")
	@DeleteMapping("")
	public ResponseEntity<PayloadResponse> removeLevel(@Valid @RequestBody LevelRemoveRequest request) {
		PayloadResponse response = new PayloadResponse();
		try {
			levelService.removeLevel(request.getId());
			return ResponseEntity.ok(response);
		} catch (ApplicationException e) {
			return handleException(e, response);
		}
		
	}
	
  @GetMapping("{id}")
  @PreAuthorize("hasAuthority('FUN_level.view')")
  public ResponseEntity<LevelRetrieveResponse> retrieve(@PathVariable(required = true) Long id) {
    logger.info("enter retrieve({})", id);
    LevelRetrieveResponse response = new LevelRetrieveResponse();
    try {
      LevelDTO result = levelService.readLevel(id);
      logger.debug("Letto level con id {}", id);
      response.setLevel(result);
      return ResponseEntity.ok(response);
    } catch (ApplicationException e) {
      return handleException(e, response);
    }
  }
	
}
