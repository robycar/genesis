package it.reply.genesis;

public enum AppError {

  HTTP_FORBIDDEN("HTTP_FORBIDDEN"),
  
  GENERIC("GENESIS-0001"),
  ENTITY_MODIFIED("GENESIS-0002"),
  MISSING_GROUP_OF_SESSION_USER("GENESIS-0003"),
  
  FS_FILE_NOT_FOUND("FS-0001"),
  FS_UPLOAD_READ_ERROR("FS-0002"),  
  FS_UPLOAD_WRITE_ERROR("FS-0003"),
  FS_ENTITY_FILE_NOT_FOUND("FS-0004"),
  FS_PREVENT_DELETE_USED_FILE("FS-0005"),
  FS_FILENAME_MISSING("FS-0006"),
  
	USER_NOT_FOUND("ADMIN-0001"),
	ROLE_NOT_FOUND("ADMIN-0002"), 
	USERNAME_ALRADY_EXISTS("ADMIN-0003"),
	LOGIN_ERROR("ADMIN-0004"),
	EMAIL_ALRADY_EXISTS("ADMIN-0005"),
	USER_DELETE_HIMSELF("ADMIN-0006"),
	
	GROUP_ALRADY_EXISTS("ADMIN-0010"), 
	GROUP_NOT_FOUND("ADMIN-0011"),
	GROUP_NOT_EMPTY_IN_DELETE("ADMIN-0012"),
	
	LEVEL_ALRADY_EXISTS("ADMIN-0020"), 
	LEVEL_NOT_FOUND("ADMIN-0021"),
	LEVEL_NOT_EMPTY_IN_DELETE("ADMIN-0022"),
	
	FUNZIONI_NOT_FOUND("ADMIN-0100"), 

	
	
	TYPE_LINEA_NOT_FOUND("LINEA-0001"), 
	LINEA_NOT_FOUND("LINEA-0002"), 
	LINEA_NUMERO_ALRADY_EXISTS("LINEA-0003"), 
	OBP_NOT_FOUND("LINEA-0004"), 
	TYPE_LINEA_ALRADY_EXISTS("LINEA-0005"),
	TYPE_LINEA_USED_IN_DELETE("LINEA-0006"),
	LINEA_EDIT_WRONG_GROUP("LINEA-0007"),
	LINEA_DELETE_WRONG_GROUP("LINEA-0008"),
	OBP_EDIT_WRONG_GROUP("LINEA-0009"),
	OBP_DELETE_WRONG_GROUP("LINEA-0010"),
	LINEA_GENERATORE_NOT_FOUND("LINEA-0011"),
	TYPE_LINEA_DELETE_OBP_EMPTY("LINEA-0012"),
	LINEA_GENERATORE_USED_IN_DELETE("LINEA-0013"),
	LINEA_USED_IN_DELETE("LINEA-0014"),
	OBP_USED_IN_DELETE("LINEA-0015"),
		
	TEMPLATE_NAME_ALRADY_EXISTS("TEST-0001"), 
	TEMPLATE_NOT_FOUND("TEST-0002"), 
	TEMPLATE_INVALID_FILE_CATEGORY_NAME("TEST-0003"), 
	TEST_CASE_ALRADY_EXISTS("TEST-0004"), 
	TEST_CASE_LINEA_CHIAMANTE_OVERFLOW("TEST-0005"), 
	TEST_CASE_LINEA_CHIAMANTE_MISSING("TEST-0006"), 
	TEST_CASE_NOT_FOUND("TEST-0007"),
	TEST_CASE_EDIT_WRONG_GROUP("TEST-0008"),
	TEST_CASE_DELETE_WRONG_GROUP("TEST-0009"),
	TEMPLATE_EDIT_WRONG_GROUP("TEST-0010"),
	TEMPLATE_DELETE_WRONG_GROUP("TEST-0011"), 
	TEST_SUITE_ALRADY_EXISTS("TEST-0012"), 
	TEST_SUITE_NOT_FOUND("TEST-0013"), 
	TEST_SUITE_EDIT_WRONG_GROUP("TEST-0014"),
	TEST_SUITE_DELETE_WRONG_GROUP("TEST-0015"), 
	TEST_GEN_ALRADY_EXISTS("TEST-0016"), 
	TEST_GEN_NOT_FOUND("TEST-0017"), 
	TEMPLATE_FILE_MULTIPLE_USE("TEST-0018"), 
	TEST_CASE_CARICATO_NOT_FOUND("TEST-0019"), 
	TEST_CASE_CARICATO_WRONG_EXPECTED_STATE("TEST-0020"),
	TEST_SUITE_CARICATA_NOT_FOUND("TEST-0021"),
	TEST_SUITE_CARICATA_WRONG_EXPECTED_STATE("TEST-0022"),
	TEST_SUITE_CARICATA_WRONG_STATE("TEST-0023"),
	TEST_CASE_CARICATO_WRONG_STATE("TEST-0024"),
	TEST_CASE_CARICATO_IN_TEST_SUITE("TEST-0025"),
	TEST_GEN_CARICATO_NOT_FOUND("TEST-0026"),
	TEST_GEN_CARICATO_WRONG_EXPECTED_STATE("TEST-0027"),
	TEST_GEN_CARICATO_WRONG_STATE("TEST-0028"),
	TIPO_TEMPLATE_NOT_FOUND("TEST-0029"),
	TEMPLATE_NATURA_FILE_MISMATCH("TEST-0030"),
	TEMPLATE_NATURA_MISSING("TEST-0031"),
	TEST_CASE_WRONG_NATURA("TEST-0032"),
	
	AGENT_RUNNING_QUEUE_NOT_EMPTY("AGENT-0001"),       
	;
	
	private final String errorCode;

	private AppError(String errorCode) {
		this.errorCode = errorCode;
	}
	
	public String getErrorCode() {
		return errorCode;
	}
}
