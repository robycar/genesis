package it.reply.genesis.jwt;

import java.text.MessageFormat;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

@Component
public class JWTComponent {

	private static final Log logger = LogFactory.getLog(JWTComponent.class);
	
	private Algorithm algorithm;
	
	private long defaultExpiration;
	
	public static final String CLAIM_USERNAME = "username";

	public JWTComponent(
			@Value("${jwt.secret}") String secret,
			@Value("${jwt.defaultExpirationMillis}") long defaultExpirationInMillis) {
		logger.info(MessageFormat.format("jwt.secret: {0}", secret));
		logger.info(MessageFormat.format("jwt.expirationInMillis: {0}", defaultExpirationInMillis));
		this.algorithm = Algorithm.HMAC512(secret);
		this.defaultExpiration = defaultExpirationInMillis;
	}
	
	public String createToken(String username) {
		Instant issuedAt = Instant.now();
		return JWT.create()
			.withIssuedAt(Date.from(issuedAt))
			.withExpiresAt(Date.from(issuedAt.plusMillis(this.defaultExpiration)))
			.withClaim(CLAIM_USERNAME, username)
			.sign(this.algorithm);
	}
	
	public Map<String, Object> verifyToken(String token) throws TokenVerificationException {
		JWTVerifier verifier = JWT.require(this.algorithm).build();
		try {
			DecodedJWT jwt = verifier.verify(token);
			return jwt.getClaims().entrySet()
					.stream()
					.collect(Collectors.toMap(e -> e.getKey(), e -> e.getValue().as(Object.class)));
		} catch (Exception e) {
			throw new TokenVerificationException(e);
		}
	}
	
}
