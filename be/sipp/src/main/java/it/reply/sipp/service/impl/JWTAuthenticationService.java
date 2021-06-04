package it.reply.sipp.service.impl;

import java.util.Objects;
import java.util.Optional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import it.reply.sipp.jwt.JWTComponent;
import it.reply.sipp.jwt.TokenVerificationException;
import it.reply.sipp.model.Utente;
import it.reply.sipp.model.repository.UtenteRepository;
import it.reply.sipp.service.UserAuthenticationService;

@Service("jwtAuthenticationService")
public class JWTAuthenticationService implements UserAuthenticationService {

	private static final Log logger = LogFactory.getLog(JWTAuthenticationService.class);
	
	@Autowired
	private UtenteRepository utenteRepository;
	
	@Autowired
	private JWTComponent jwtComponent;
	
	
	@Override
	@Transactional(readOnly = true, propagation = Propagation.REQUIRED)
	public String login(String username, String password) throws BadCredentialsException {
		
		SecurityContextHolder.getContext().setAuthentication(null);
		
		
		return utenteRepository.findByUsername(username)
				.filter(user -> Objects.equals(password, user.getPassword()))
				.map(user -> jwtComponent.createToken(username))
				.orElseThrow(() -> new BadCredentialsException("Invalid username or password"));
	}

	@Override
	public Utente authenticateByToken(String token) throws AuthenticationException {
		Object username;
		try {
			username = jwtComponent.verifyToken(token).get(JWTComponent.CLAIM_USERNAME);
			return Optional.ofNullable(username)
					.flatMap(name -> utenteRepository.findByUsername(String.valueOf(name)))
					.orElseThrow(() -> new UsernameNotFoundException("User '" + username + "' not found."));
		} catch (TokenVerificationException e) {
			logger.error(e);
			throw new BadCredentialsException("Invalid JWT token", e);
		}
	}

	@Override
	public void logout(String username) {
		// TODO Auto-generated method stub

	}

}
