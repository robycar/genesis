package it.reply.sipp.api.admin.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class GruppoUpdateResponse extends PayloadResponse {

	private static final long serialVersionUID = 2133998761511916922L;
	
	private GruppoDTO gruppo;
	
	public GruppoUpdateResponse() {
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
