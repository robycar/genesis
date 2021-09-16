package it.reply.genesis.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import it.reply.genesis.service.UserAuthenticationService;

@Component
public class TokenAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {

	@Autowired
	@Qualifier("jwtAuthenticationService")
	private UserAuthenticationService userAuthenticationService;
	
	@Override
	protected void additionalAuthenticationChecks(UserDetails userDetails,
			UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {

	}

	@Override
	protected UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken authentication)
			throws AuthenticationException {
		Object token = authentication.getCredentials();
		return Optional
			.ofNullable(token)
			.flatMap(t -> 
					Optional.of(userAuthenticationService.authenticateByToken(String.valueOf(token)))
						.map(u -> User.builder()
								.username(u.getUsername())
								.password(u.getPassword())
								.roles("user")
								.build()))
			.orElseThrow(() -> new BadCredentialsException("Invalid authentication token=" + token));
	}

}
