package it.reply.sipp.jwt;

public class TokenVerificationException extends Exception {

	private static final long serialVersionUID = -4207426623230293514L;

	public TokenVerificationException() {
	}

	public TokenVerificationException(String message) {
		super(message);
	}

	public TokenVerificationException(Throwable cause) {
		super(cause);
	}

	public TokenVerificationException(String message, Throwable cause) {
		super(message, cause);
	}

	public TokenVerificationException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

}
