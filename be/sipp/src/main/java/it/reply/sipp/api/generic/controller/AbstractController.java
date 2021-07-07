package it.reply.sipp.api.generic.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.generic.payload.ErrorInfo;
import it.reply.sipp.api.generic.payload.PayloadResponse;

public class AbstractController {

	protected final Logger logger = LoggerFactory.getLogger(getClass());

	
	public AbstractController() {
	}
	
	protected <T extends PayloadResponse> ResponseEntity<T> handleException(ApplicationException e, T response) {
		
		int statusCode = e.getStatusCode();
		if (statusCode == 0) {
			statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
		}
		
		String errorCode = e.getErrorCode();
		String errorMessage = e.getMessage();
		String logMessage = e.getLogMessage();
		if (logMessage == null) {
			logMessage = errorMessage;
		}
		logger.error(logMessage, e);
		
		response.setError(new ErrorInfo(errorCode, errorMessage));
		
		ResponseEntity<T> result = ResponseEntity.status(statusCode).body(response);
		logger.debug("Generated error response {}", result);
		
		return result;
	}

}
