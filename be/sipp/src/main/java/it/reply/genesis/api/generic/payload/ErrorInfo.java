package it.reply.genesis.api.generic.payload;

public class ErrorInfo extends DTO {

	private static final long serialVersionUID = 5323887984744230621L;

	private String code;
	
	private String description;
	
	public ErrorInfo() {
	}
	
	public ErrorInfo(String code, String description) {
		this.code = code;
		this.description = description;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "code", code);
		writeField(sb, "description", description);
		super.writeFields(sb);
	}


	
	

}
