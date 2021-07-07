package it.reply.sipp;

public enum AppError {

	USER_NOT_FOUND("ADMIN-0001"),
	ROLE_NOT_FOUND("ADMIN-0002"), 
	USERNAME_ALRADY_EXISTS("ADMIN-0003"),
	;
	
	private final String errorCode;

	private AppError(String errorCode) {
		this.errorCode = errorCode;
	}
	
	public String getErrorCode() {
		return errorCode;
	}
}
