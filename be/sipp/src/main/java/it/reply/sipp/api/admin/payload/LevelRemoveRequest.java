package it.reply.sipp.api.admin.payload;

import javax.validation.constraints.NotNull;

import it.reply.sipp.api.generic.payload.PayloadRequest;

public class LevelRemoveRequest extends PayloadRequest {

	private static final long serialVersionUID = -6157651430823656441L;

	@NotNull
	private Long id;
	
	public LevelRemoveRequest() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "id", id);
		super.writeFields(sb);
	}

	
}
