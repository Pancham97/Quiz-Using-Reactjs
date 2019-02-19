package com.cybage.onlineassessmentsystem.security;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.cybage.onlineassessmentsystem.services.UserPrinciple;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

//This class will generate the JWT Token using secret key and expiration time
@Component
public class JwtProvider {
	private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);
	
	//Secret key to be used in creating token
	@Value("${oas.app.jwtSecret}")
	private String jwtSecret;
	
	//Expiration time
	@Value("${oas.app.jwtExpiration}")
	private int jwtExpiration;
	
	//This method will return the Jwt Token
	public String generateJwtToken(Authentication authentication) {
		
		//Retriving userPrinciple object from authentication
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		
		//Generating and returning Jwt Token
		return Jwts.builder().setSubject(userPrinciple.getUsername()).setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + jwtExpiration))
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
	}
	
	//This will extract username from Generated Jwt Token
	public String getUsernameFromJwtToken(String token) {

		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();

	}
	
	//This method will check if the Jwt Tokens are valid or not
	public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature -> Message: {} ", e);
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token -> Message: {}", e);
		} catch (ExpiredJwtException e) {
			logger.error("Expired JWT token -> Message: {}", e);
		} catch (UnsupportedJwtException e) {
			logger.error("Unsupported JWT token -> Message: {}", e);
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty -> Message: {}", e);
		}
		
		return false;

	}
}
