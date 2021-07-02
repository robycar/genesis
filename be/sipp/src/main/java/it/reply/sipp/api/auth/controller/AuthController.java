package it.reply.sipp.api.auth.controller;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import it.reply.sipp.api.auth.payload.LoginResponse;
import it.reply.sipp.jwt.JWTComponent;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	
//	@Autowired
//	@Qualifier("jwtAuthenticationService")
//	private UserAuthenticationService authenticationService;
	
	@Autowired
	private JWTComponent jwtComponent;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostMapping("login")
	public ResponseEntity<?> login(
			@RequestParam("username") String username,
			@RequestParam("password") String password) {
		try {
			logger.info("login({},*********)", username);
			
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(username, password)
			);
			
			SecurityContextHolder.getContext().setAuthentication(authentication);
			logger.debug("login. Authentication: {}, Principal: {}", authentication,
					authentication == null ? null : authentication.getPrincipal());

			String token = jwtComponent.createToken(username);
			
						
			LoginResponse response = new LoginResponse();
			UserDetails userDetails = (UserDetails) authentication.getPrincipal();
			ArrayList<String> roles = new ArrayList<>();
			ArrayList<String> functions = new ArrayList<>();
			for (GrantedAuthority auth: userDetails.getAuthorities()) {
				String authName = auth.getAuthority();
				if (authName == null) {
					continue;
				}
				if (authName.startsWith("ROLE_")) {
					roles.add(authName);
				} else if (authName.startsWith("FUN_")) {
					functions.add(authName.substring(4));
				}
			}
			response.setRoles(roles);
			response.setFunctions(functions);
			response.setAccessToken(token);
			response.setUsername(userDetails.getUsername());
			
			return ResponseEntity.ok(response);			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
	}

}
