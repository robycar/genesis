package it.reply.sipp.security;

import java.io.IOException;
import java.text.MessageFormat;
import java.util.Optional;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.StringUtils;

public class TokenAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

	private static final String AUTHORIZATION = "Authorization";
	
	private static final String BEARER = "Bearer ";
	
	
	private static final Logger logger = LoggerFactory.getLogger(TokenAuthenticationFilter.class);

	
	public TokenAuthenticationFilter(RequestMatcher requiresAuthenticationRequestMatcher) {
		super(requiresAuthenticationRequestMatcher);
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException, IOException, ServletException {

		final String bearerToken = request.getHeader(AUTHORIZATION);
		logger.trace("attemptAuthentication({})", bearerToken);
		
		
		String token = Optional.ofNullable(bearerToken)
			.filter(v -> StringUtils.hasText(v) && v.startsWith(BEARER))
			.map(v -> v.substring(BEARER.length()))
			.orElseThrow(() -> {
				logger.error(String.format("attemptAuthentication failed for %s and token %s",
						request.getRemoteAddr(), bearerToken));
				return new BadCredentialsException("Missing authentication token");
			});
		
		Authentication auth = new UsernamePasswordAuthenticationToken(token, token);
		
		
		return getAuthenticationManager().authenticate(auth);
	}

	
}
