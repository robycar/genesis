package it.reply.genesis.api.generic.exception;

import java.util.Locale;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import it.reply.genesis.AppError;

@Component
public class ApplicationExceptionFactory {

  @Autowired
  private MessageSource messageSource;

  public ApplicationExceptionFactory() {
  }

  public ApplicationException makeError (int statusCode, AppError error, Object... args) {
    return makeError(null, statusCode, error, args);
  }

  public ApplicationException makeError (HttpStatus httpStatus, AppError error, Object... args) {
    return makeError(null, httpStatus, error, args);
  }

  public ApplicationException makeError (Logger logger, HttpStatus httpStatus, AppError error, Object... args) {
    return makeError(logger, httpStatus.value(), error, args);
  }
  
  public ApplicationException makeError (Logger logger, int statusCode, AppError error, Object... args) {
    
    String errorMessage = errorMessage(error, args);
    String errorLogMessage = errorLogMessage(error,args);
    if (logger != null) {
      logger.error(errorLogMessage == null ? errorMessage : errorLogMessage);
    } 
    return new ApplicationException(statusCode, error.getErrorCode(), errorMessage);
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

  protected MessageSource getMessageSource() {
    return messageSource;
  }

  
}
