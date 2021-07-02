package it.reply.sipp.service.impl;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import it.reply.sipp.model.UserVO;
import it.reply.sipp.model.repository.UserRepository;
import it.reply.sipp.service.UserAuthenticationService;

@Service("uuidAuthenticationService")
public class UUIDAuthenticationService implements UserAuthenticationService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public String login(String username, String password) throws BadCredentialsException {
		return userRepository.findByUsername(username)
				.filter(u -> u.getPassword().equals(password))
				.map(u -> {
					u.setToken(UUID.randomUUID().toString());
					userRepository.save(u);
					return u.getToken();
					
				})
				.orElseThrow(() -> new BadCredentialsException("Invalid username or password"));
	}

	@Override
	public UserVO authenticateByToken(String token) throws AuthenticationException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void logout(String username) {
		// TODO Auto-generated method stub

	}

}
