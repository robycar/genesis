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

import it.reply.genesis.api.admin.payload.RetrieveUserResponse;
import it.reply.genesis.api.admin.payload.UpdateUserRequest;
import it.reply.genesis.api.admin.payload.UpdateUserResponse;
import it.reply.genesis.api.admin.payload.UserAddRequest;
import it.reply.genesis.api.admin.payload.UserAddResponse;
import it.reply.genesis.api.admin.payload.UserDTO;
import it.reply.genesis.api.admin.payload.UserRemoveRequest;
import it.reply.genesis.api.admin.payload.UtenteListResponse;
import it.reply.genesis.api.admin.payload.UtenteSearchRequest;
import it.reply.genesis.api.admin.payload.UtenteSearchResponse;
import it.reply.genesis.api.generic.controller.AbstractController;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.generic.payload.PayloadResponse;
import it.reply.genesis.model.GruppoVO;
import it.reply.genesis.model.LevelVO;
import it.reply.genesis.model.UserVO;
import it.reply.genesis.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController extends AbstractController {

	
	@Autowired
	private UserService userService;
	
	public UserController() {
	}

	/**
	 * Elenco di utenti e relativi ruoli
	 * @return response con l'elenco degli utenti recuperati.
	 */
	@GetMapping("")
	public UtenteListResponse list() {
		logger.info("list");
		List<UserVO> usersVO = userService.listUsers();
		
		List<UserDTO> userDTOList = usersVO.stream().map(vo -> new UserDTO(vo))
			.collect(Collectors.toList());
		
		UtenteListResponse response = new UtenteListResponse();
		response.setUsers(userDTOList);
		
		return response;
		
	}
	
	@PostMapping("search")
	@PreAuthorize("hasAuthority('FUN_user.view')")
	public ResponseEntity<UtenteSearchResponse> search(@Valid @RequestBody UtenteSearchRequest request) {
	  logger.info("search({})", request);
	  
	  UtenteSearchResponse response = new UtenteSearchResponse();
	  
	  try {
	    List<UserDTO> result = userService.listUsers(request.getUser());
	    logger.debug("Recuperati {} utenti per i criteria di ricerca forniti", result.size());
	    response.setUsers(result);
	    return ResponseEntity.ok(response);
	    
	  } catch (ApplicationException e) {
	    return handleException(e, response);
	  }
	  
	}
	
	
	@GetMapping("{id}")
	public ResponseEntity<RetrieveUserResponse> retrieveUser(@PathVariable Long id) {
		logger.info("retrieveUser({})", id);
		RetrieveUserResponse response = new RetrieveUserResponse();
		try {
      UserDTO userDTO = userService.readUser(id);
      response.setUser(userDTO);
      return ResponseEntity.ok(response);
      
    } catch (ApplicationException e) {
      return handleException(e, response);
    }


	}
	
	@PutMapping("")
	public ResponseEntity<UserAddResponse> add(@Valid @RequestBody(required=true) UserAddRequest request) {
		logger.debug("enter add({}", request);
		
		UserAddResponse response = new UserAddResponse();

		try {
			UserVO userVO = new UserVO();
			userVO.setGruppo(new GruppoVO(request.getGruppo().getId()));
			userVO.setLevel(new LevelVO(request.getLevel().getId()));
			userVO.setAzienda(request.getAzienda());
			userVO.setCognome(request.getCognome());
			userVO.setNome(request.getNome());
			userVO.setUsername(request.getUsername());
			userVO.setEmail(request.getEmail());
		
			userVO = userService.addUser(userVO, request.getPassword());
			response.setUser(new UserDTO(userVO));
			
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (ApplicationException e) {
			return handleException(e, response);
		}
	}
	
	@PostMapping("")
	public ResponseEntity<UpdateUserResponse> updateUser(@Valid @RequestBody(required=true) UpdateUserRequest request) {
		logger.info("enter updateUser {}", request);
		
		UpdateUserResponse response = new UpdateUserResponse();
		
		try {
			userService.updateUser(request.getUser(), request.getPassword());
			return ResponseEntity.ok(response);
						
		} catch (ApplicationException e) {
			return handleException(e, response);
		}
			
	}
	
	@DeleteMapping("")
	public ResponseEntity<PayloadResponse> removeUser(@Valid @RequestBody(required=true) UserRemoveRequest request) {
	  logger.info("enter removeUser({})", request);
	  PayloadResponse response = new PayloadResponse();
	  try {
	    userService.removeUser(request.getId());
	    logger.info("Utente eliminato: {}", request.getId());
	    return ResponseEntity.ok(response);
	  } catch (ApplicationException e) {
	    return handleException(e, response);
	  }
	  
	}
	
}
