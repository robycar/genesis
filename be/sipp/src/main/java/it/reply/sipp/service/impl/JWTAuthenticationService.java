package it.reply.sipp.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import it.reply.sipp.api.admin.payload.FunzioneDTO;
import it.reply.sipp.jwt.JWTComponent;
import it.reply.sipp.jwt.TokenVerificationException;
import it.reply.sipp.model.UserVO;
import it.reply.sipp.model.repository.FunzioneRepository;
import it.reply.sipp.model.repository.UserRepository;
import it.reply.sipp.service.UserAuthenticationService;

@Service("jwtAuthenticationService")
public class JWTAuthenticationService implements UserAuthenticationService {

	private static final Log logger = LogFactory.getLog(JWTAuthenticationService.class);
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JWTComponent jwtComponent;
	
	@Autowired
	private FunzioneRepository funzioneRepository;
	
	
	@Override
	@Transactional(readOnly = true, propagation = Propagation.REQUIRED)
	public String login(String username, String password) throws BadCredentialsException {
		
		return userRepository.findByUsername(username)
				.filter(user -> Objects.equals(password, user.getPassword()))
				.map(user -> jwtComponent.createToken(username))
				.orElseThrow(() -> new BadCredentialsException("Invalid username or password"));
	}

	@Override
	@Transactional(readOnly = true)
	public UserVO authenticateByToken(String token) throws AuthenticationException {
		Object username;
		try {
			username = jwtComponent.verifyToken(token).get(JWTComponent.CLAIM_USERNAME);
			UserVO result = Optional.ofNullable(username)
					.flatMap(name -> userRepository.findByUsername(String.valueOf(name)))
					.orElseThrow(() -> new UsernameNotFoundException("User '" + username + "' not found."));
			return result;
		} catch (TokenVerificationException e) {
			logger.error(e);
			throw new BadCredentialsException("Invalid JWT token", e);
		}
	}

	@Override
	public void logout(String username) {

	}

	@Override
	@Transactional
	public List<FunzioneDTO> listFunzioni() {
		logger.debug("enter listFunzioni");
		List<FunzioneDTO> result = funzioneRepository.findAll(Sort.by("codice"))
				.stream().map(vo -> new FunzioneDTO(vo))
				.collect(Collectors.toList());
		logger.debug("exit listFunzioni");
		return result;
	}

}
