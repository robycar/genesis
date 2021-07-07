package it.reply.sipp.api.generic.exception;

public class ApplicationException extends Exception {

	private static final long serialVersionUID = -3490228996238430796L;

	private int statusCode;
	
	private String errorCode;
	
	private String logMessage;

	public ApplicationException() {
	}

	public ApplicationException(int statusCode, String errorCode, String message, String logMessage) {
		super(message);
		this.statusCode = statusCode;
		this.errorCode = errorCode;
		this.logMessage = logMessage;
	}
	
	public ApplicationException(String message) {
		super(message);
	}

	public ApplicationException(Throwable cause) {
		super(cause);
	}

	public ApplicationException(String message, Throwable cause) {
		super(message, cause);
	}

	public ApplicationException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public int getStatusCode() {
		return statusCode;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public String getLogMessage() {
		return logMessage;
	}

}
