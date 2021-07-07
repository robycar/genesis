package it.reply.sipp.api.admin.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.reply.sipp.api.admin.payload.UtenteListResponse;
import it.reply.sipp.api.admin.payload.RetrieveUserResponse;
import it.reply.sipp.api.admin.payload.UpdateUserRequest;
import it.reply.sipp.api.admin.payload.UpdateUserResponse;
import it.reply.sipp.api.admin.payload.UserDTO;
import it.reply.sipp.api.generic.controller.AbstractController;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.model.UserVO;
import it.reply.sipp.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController extends AbstractController {

	
	@Autowired
	private UserService userService;
	
	public UserController() {
	}

	/**
	 * Elenco di utenti e relativi ruoli
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
	
	@GetMapping("{id}")
	public ResponseEntity<RetrieveUserResponse> retrieveUser(@PathVariable Long id) {
		logger.info("retrieveUser({})", id);
		Optional<UserVO> o = userService.readUser(id);
		
		return o.map(vo -> ResponseEntity.ok(new RetrieveUserResponse(new UserDTO(vo))))
				.orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new RetrieveUserResponse()));

	}
	
	@PostMapping("")
	public ResponseEntity<UpdateUserResponse> updateUser(@Valid @RequestBody(required=true) UpdateUserRequest request) {
		logger.info("enter updateUser {}", request);
		boolean updateRoles = false;
		if (request.isUpdateRoles() != null) {
			updateRoles = request.isUpdateRoles().booleanValue();
		}
		if (updateRoles && request.getUser().getRoles() == null) {
			logger.error(null);
		}
		
		UpdateUserResponse response = new UpdateUserResponse();
		
		try {
			userService.updateUser(request.getUserId(), request.getUser(), request.getPassword(), updateRoles);
			return ResponseEntity.ok(response);
						
		} catch (ApplicationException e) {
			return handleException(e, response);
		}
			
	}
	
}
