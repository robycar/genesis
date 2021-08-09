package it.reply.sipp.api.generic.service;

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import it.reply.sipp.AppError;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.model.BaseEntity;

public abstract class AbstractService {

	protected final Logger logger = LoggerFactory.getLogger(getClass());

	
	@Autowired
	private MessageSource messageSource;
	
	
	public AbstractService() {
	}
	
	protected MessageSource getMessageSource() {
		return this.messageSource;
	}
	
	protected String errorMessage(AppError error, Object... args) {
		String result = getMessageSource().getMessage(error.getErrorCode(), args, null, Locale.getDefault());
		if (result == null) {
			return "[[" + error.getErrorCode() + "]]";
		}
		return result;
	}
	
	protected String errorLogMessage(AppError error, Object... args) {
		return getMessageSource().getMessage(error.getErrorCode() + ".log", args, null, Locale.getDefault());
	}

	protected ApplicationException makeError (HttpStatus httpStatus, AppError error, Object... args) {
		return makeError(httpStatus.value(), error, args);
	}
	
	protected ApplicationException makeGenericError(String message) {
	  return new ApplicationException(HttpStatus.BAD_REQUEST.value(), AppError.GENERIC.getErrorCode(), message);
	}
	
	protected ApplicationException makeError (int statusCode, AppError error, Object... args) {
		
		String errorMessage = errorMessage(error, args);
		String errorLogMessage = errorLogMessage(error,args);
		logger.error(errorLogMessage == null ? errorMessage : errorLogMessage); 
		return new ApplicationException(statusCode, error.getErrorCode(), errorMessage);
	}
	
	protected String getUsername() {
	  Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	  if (authentication != null) {
	    return authentication.getName();
	  }
	  return null;
	}

  protected void checkVersion(BaseEntity vo, int expectedVersion, String entityName, Long id) throws ApplicationException {
    if (vo.getVersion() != expectedVersion) {
      throw makeError(HttpStatus.CONFLICT, AppError.ENTITY_MODIFIED, vo.getModifiedBy(), vo.getModifiedDate(), entityName, id);
    }
  }
}
