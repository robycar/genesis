package it.reply.genesis.api.admin.payload;

import javax.validation.constraints.NotNull;

import it.reply.genesis.api.generic.payload.PayloadRequest;

public class GruppoRemoveRequest extends PayloadRequest {

	private static final long serialVersionUID = -5544445545209358404L;
	
	@NotNull
	private Long id;
	
	public GruppoRemoveRequest() {
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
