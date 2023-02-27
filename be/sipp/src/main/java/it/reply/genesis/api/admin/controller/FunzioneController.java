package it.reply.genesis.api.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.reply.genesis.api.admin.payload.FunzioneDTO;
import it.reply.genesis.api.admin.payload.FunzioneListResponse;
import it.reply.genesis.api.generic.controller.AbstractController;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.service.UserAuthenticationService;

@RestController
@RequestMapping("/api/funzione")
public class FunzioneController extends AbstractController {

	@Autowired
	private UserAuthenticationService userAuthenticationService;
	
	public FunzioneController() {
	}
	
	
	@GetMapping("")
	public ResponseEntity<FunzioneListResponse> list() {
		
		logger.info("enter list()");
		
		FunzioneListResponse response = new FunzioneListResponse();
		
		try {
			List<FunzioneDTO> funzioni = userAuthenticationService.listFunzioni();
			logger.debug("Recuperate {} funzioni", funzioni.size());
			response.setFunzioni(funzioni);
			
			return ResponseEntity.ok(response);
			
		} catch (ApplicationException e) {
			return handleException(e, response);
		}
		
		
	}
	

}
