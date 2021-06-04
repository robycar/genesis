package it.reply.sipp.api.auth.controller;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import it.reply.sipp.api.auth.payload.LoginResponse;
import it.reply.sipp.service.UserAuthenticationService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	
	@Autowired
	@Qualifier("jwtAuthenticationService")
	private UserAuthenticationService authenticationService;
	
	@PostMapping("login")
	public ResponseEntity<?> login(
			@RequestParam("username") String username,
			@RequestParam("password") String password) {
		try {
			logger.info("login({},*********)", username);
			String token = authenticationService.login(username, password);
						
			LoginResponse response = new LoginResponse();
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			logger.debug("authentication: {}, Principal: {}", authentication,
					Optional.ofNullable(authentication)
					.map(a -> authentication.getPrincipal())
					.orElse(null));
			response.setToken(token);
			return ResponseEntity.ok(response);			
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
	}

}
