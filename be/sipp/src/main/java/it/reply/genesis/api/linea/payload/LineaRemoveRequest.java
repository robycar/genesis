package it.reply.genesis.api.linea.payload;

import javax.validation.constraints.NotNull;

import it.reply.genesis.api.generic.payload.PayloadRequest;

public class LineaRemoveRequest extends PayloadRequest {

	private static final long serialVersionUID = 4214593691445267098L;
	
	@NotNull
	private Long id;
	
	public LineaRemoveRequest() {
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
