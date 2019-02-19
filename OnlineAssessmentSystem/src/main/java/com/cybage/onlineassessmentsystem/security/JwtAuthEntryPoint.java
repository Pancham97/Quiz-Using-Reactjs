package com.cybage.onlineassessmentsystem.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

//This class is used to handel unauthorized requests to authenticated urls
@Component
public class JwtAuthEntryPoint implements AuthenticationEntryPoint {
	private static final Logger logger = LoggerFactory.getLogger(JwtAuthEntryPoint.class);
	
	//This method will give unauthorized error for unauthorized urls
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e)
			throws IOException, ServletException {
		logger.error("Unauthorized error. Message - {}", e.getMessage());
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error -> Unauthorized");
		
	}
}
