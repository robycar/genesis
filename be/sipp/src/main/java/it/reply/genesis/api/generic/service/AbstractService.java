package it.reply.genesis.api.generic.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import it.reply.genesis.AppError;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.generic.exception.ApplicationExceptionFactory;
import it.reply.genesis.model.BaseEntity;
import it.reply.genesis.model.GruppoVO;
import it.reply.genesis.model.repository.GruppoRepository;

public abstract class AbstractService {

	protected final Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private ApplicationExceptionFactory applicationExceptionFactory;
	
	@Autowired
	private GruppoRepository gruppoRepository;
	
	
	public AbstractService() {
	}
	
	protected GruppoRepository getGruppoRepository() {
	  return this.gruppoRepository;
	}
	
	protected ApplicationException makeError (HttpStatus httpStatus, AppError error, Object... args) {
		return applicationExceptionFactory.makeError(logger, httpStatus, error, args);
	}
	
	protected ApplicationException makeGenericError(String message) {
	  return new ApplicationException(HttpStatus.BAD_REQUEST.value(), AppError.GENERIC.getErrorCode(), message);
	}
	
	protected ApplicationException makeError (int statusCode, AppError error, Object... args) {
		
	  return applicationExceptionFactory.makeError(logger, statusCode, error, args);
	}
	
	protected String currentUsername() {
	  Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	  if (authentication != null) {
	    return authentication.getName();
	  }
	  return null;
	}
	
	protected GruppoVO currentGroup() throws ApplicationException {
	  String username = currentUsername();
	  if (username != null) {
	    return getGruppoRepository().findByUsername(username)
	        .orElseThrow(() -> makeError(HttpStatus.INTERNAL_SERVER_ERROR, AppError.MISSING_GROUP_OF_SESSION_USER, username));
	  }
	  return null;
	}

  protected void checkVersion(BaseEntity vo, int expectedVersion, String entityName, Long id) throws ApplicationException {
    if (vo.getVersion() != expectedVersion) {
      throw makeError(HttpStatus.CONFLICT, AppError.ENTITY_MODIFIED, vo.getModifiedBy(), vo.getModifiedDate(), entityName, id);
    }
  }
  
  protected void checkGroup(GruppoVO expectedGroup, AppError appError) throws ApplicationException {
    if (!expectedGroup.getId().equals(currentGroup().getId())) {
      throw makeError(HttpStatus.BAD_REQUEST, appError);
    }
  }
  

}
