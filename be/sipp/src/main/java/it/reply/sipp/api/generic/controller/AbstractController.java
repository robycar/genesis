package it.reply.sipp.api.generic.controller;

import java.util.Collection;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;

import it.reply.sipp.AppError;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.generic.payload.ErrorInfo;
import it.reply.sipp.api.generic.payload.PayloadResponse;

public class AbstractController {

	protected final Logger logger = LoggerFactory.getLogger(getClass());

  @Autowired
  private MessageSource messageSource;	  
	
	public AbstractController() {
	}
	
	protected String currentUsername() {
	  Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	  if (auth != null) {
	    return auth.getName();
	  }
	  return null;
	}
	
	protected String errorMessage(AppError error, Object... args) {
	  return messageSource.getMessage(error.getErrorCode(), args, error.getErrorCode(), Locale.getDefault());
	}
	
	protected <T extends PayloadResponse> ResponseEntity<T> writeError(T response, HttpStatus status, AppError error, Object... args) {
	  ErrorInfo errorInfo = new ErrorInfo(error.getErrorCode(), errorMessage(error, args));
    response.setError(errorInfo);
    
    return ResponseEntity.status(status == null ? HttpStatus.INTERNAL_SERVER_ERROR : status).body(response);
	  
	}
	
  protected void handleException(ApplicationException e) throws ResponseStatusException {
    int statusCode = e.getStatusCode();
    if (statusCode == 0) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
    }
    String errorCode = e.getErrorCode();
    String errorMessage = e.getMessage();
    
    throw new ResponseStatusException(e.getStatusCode(), 
        errorCode + " - " + errorMessage,
        e); 

  }

	
	protected <T extends PayloadResponse> ResponseEntity<T> handleException(ApplicationException e, T response) {
		
		int statusCode = e.getStatusCode();
		if (statusCode == 0) {
			statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
		}
		
		String errorCode = e.getErrorCode();
		String errorMessage = e.getMessage();
//		String logMessage = e.getLogMessage();
//		if (logMessage == null) {
//			logMessage = errorMessage;
//		}
//		logger.error(logMessage, e);
		
		response.setError(new ErrorInfo(errorCode, errorMessage));
		
		ResponseEntity<T> result = ResponseEntity.status(statusCode).body(response);
		logger.debug("Generated error response {}", result);
		
		return result;
	}
	
	protected boolean hasAuthority(String authority) {
	  Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	  if (authentication == null) {
	    return false;
	  }
	  Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
	  if (authorities != null) {
	    return authorities.stream().anyMatch(ga -> ga.getAuthority().equals(authority));
	  }
	  return false;
	  
	}

}
