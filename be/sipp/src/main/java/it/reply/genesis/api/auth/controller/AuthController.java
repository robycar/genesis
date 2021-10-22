package it.reply.genesis.api.auth.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.impl.PublicClaims;

import it.reply.genesis.AppError;
import it.reply.genesis.api.admin.payload.UserDTO;
import it.reply.genesis.api.auth.payload.LoginResponse;
import it.reply.genesis.api.generic.payload.ErrorInfo;
import it.reply.genesis.jwt.JWTComponent;
import it.reply.genesis.security.GenesisUser;

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
	
  @Autowired
  private MessageSource messageSource;
	 
	@PostMapping("login")
	public ResponseEntity<LoginResponse> login(
			@RequestParam("username") String username,
			@RequestParam("password") String password) {
	  LoginResponse response = new LoginResponse();
		try {
			logger.info("login({},*********)", username);
			
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(username, password)
			);
			
			SecurityContextHolder.getContext().setAuthentication(authentication);
			logger.debug("login. Authentication: {}, Principal: {}", authentication,
					authentication == null ? null : authentication.getPrincipal());

			HashMap<String, Object> claims = new HashMap<>();
			
			String token = jwtComponent.createToken(username, claims);
			
			UserDetails userDetails = (UserDetails) authentication.getPrincipal();
			
			ArrayList<String> functions = new ArrayList<>();
			for (GrantedAuthority auth: userDetails.getAuthorities()) {
				String authName = auth.getAuthority();
				if (authName == null) {
					continue;
				}
				if (authName.startsWith("FUN_")) {
					functions.add(authName.substring(4));
				}
			}
			response.setFunctions(functions);
			response.setAccessToken(token);
			response.setTokenType(LoginResponse.BEARER);
			response.setUsername(userDetails.getUsername());
			response.setTokenExpiration((Date) claims.get(PublicClaims.EXPIRES_AT));
			if (userDetails instanceof GenesisUser) {
			  GenesisUser u = (GenesisUser)userDetails;
			  UserDTO userDTO = u.getOriginalUser();
			  if (userDTO != null) {
			    response.setInternalUserId(userDTO.getId());
			    response.setCurrentGroup(userDTO.getGruppo().getNome());
			    response.setCurrentRole(userDTO.getLevel().getNome());
			  }
			}
			return ResponseEntity.ok(response);
		} catch (BadCredentialsException bce) {
		  
		  response.setError(new ErrorInfo(AppError.LOGIN_ERROR.getErrorCode(), 
		      messageSource.getMessage(AppError.LOGIN_ERROR.getErrorCode(), null, Locale.getDefault())));
		  return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		} catch (Exception e) {
		  response.setError(new ErrorInfo(AppError.GENERIC.getErrorCode(), e.getMessage()));
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}
	}

}
