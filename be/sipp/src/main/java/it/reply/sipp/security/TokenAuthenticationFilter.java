package it.reply.sipp.security;

import java.io.IOException;
import java.text.MessageFormat;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import it.reply.sipp.model.UserVO;
import it.reply.sipp.service.UserAuthenticationService;
import it.reply.sipp.service.UserService;

public class TokenAuthenticationFilter extends OncePerRequestFilter {

	private static final String AUTHORIZATION = "Authorization";
	
	private static final String BEARER = "Bearer ";
	
	@Autowired
	@Qualifier("jwtAuthenticationService")
	private UserAuthenticationService userAuthenticationService;
	
	@Autowired
	private UserService userService;


	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		try {
			Optional<String> jwt = parseToken(request);
			
			UserVO userVO = jwt.map(token -> userAuthenticationService.authenticateByToken(token)).get();
			
			UserDetails userDetails = User.withUsername(userVO.getUsername())
					.password("***authenticatedFromToken***")
					.authorities(userService.readRolesAndFunctionsForUser(userVO))
					.build();
			
			
			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
					userDetails, null, userDetails.getAuthorities());
			//TODO: Verificare (viene recuperato il sessionId e l'indirizzo ip)
			authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			
			SecurityContextHolder.getContext().setAuthentication(authenticationToken);
			
		} catch (Exception e) {
			if (logger.isErrorEnabled()) {
				logger.error(MessageFormat.format("Cannet set user authentication: {0}", e.getMessage(),  e));
			}
		}
		
		filterChain.doFilter(request, response);
		
	}

	private Optional<String> parseToken(HttpServletRequest request) {

		return Optional.of(request.getHeader(AUTHORIZATION))
				.filter(t -> t.startsWith(BEARER))
				.map(t -> t.substring(BEARER.length()));
	}
	

//	@Override
//	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
//			throws AuthenticationException, IOException, ServletException {
//
//		final String bearerToken = request.getHeader(AUTHORIZATION);
//		logger.trace("attemptAuthentication({})", bearerToken);
//		
//		
//		String token = Optional.ofNullable(bearerToken)
//			.filter(v -> StringUtils.hasText(v) && v.startsWith(BEARER))
//			.map(v -> v.substring(BEARER.length()))
//			.orElseThrow(() -> {
//				logger.error(String.format("attemptAuthentication failed for %s and token %s",
//						request.getRemoteAddr(), bearerToken));
//				return new BadCredentialsException("Missing authentication token");
//			});
//		
//		Authentication auth = new UsernamePasswordAuthenticationToken(token, token);
//		
//		
//		return getAuthenticationManager().authenticate(auth);
//	}

	
}
