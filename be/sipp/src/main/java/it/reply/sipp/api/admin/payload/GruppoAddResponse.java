package it.reply.sipp.api.admin.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class GruppoAddResponse extends PayloadResponse {

	private static final long serialVersionUID = -3771499387600673771L;

	private GruppoDTO gruppo;
	
	public GruppoAddResponse() {
	}

	public GruppoDTO getGruppo() {
		return gruppo;
	}

	public void setGruppo(GruppoDTO gruppo) {
		this.gruppo = gruppo;
	}

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "gruppo", gruppo);
		super.writeFields(sb);
	}
	
	
	
}
