package it.reply.sipp.api.generic.service;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;

import it.reply.sipp.AppError;
import it.reply.sipp.api.generic.exception.ApplicationException;

public abstract class AbstractService {

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
	
	protected ApplicationException makeError (int statusCode, AppError error, Object... args) {
		return new ApplicationException(statusCode, error.getErrorCode(), errorMessage(error, args), errorLogMessage(error,args));
	}
}
