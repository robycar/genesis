package it.reply.sipp;

public enum AppError {

	USER_NOT_FOUND("ADMIN-0001"),
	ROLE_NOT_FOUND("ADMIN-0002"), 
	USERNAME_ALRADY_EXISTS("ADMIN-0003"),
	
	GROUP_ALRADY_EXISTS("ADMIN-0010"), 
	GROUP_NOT_FOUND("ADMIN-0011"),
	
	LEVEL_ALRADY_EXISTS("ADMIN-0020"), 
	LEVEL_NOT_FOUND("ADMIN-0021"),
	LEVEL_NOT_EMPTY_IN_DELETE("ADMIN-0022"),
	
	FUNZIONI_NOT_FOUND("ADMIN-0100"),
	;
	
	private final String errorCode;

	private AppError(String errorCode) {
		this.errorCode = errorCode;
	}
	
	public String getErrorCode() {
		return errorCode;
	}
}
