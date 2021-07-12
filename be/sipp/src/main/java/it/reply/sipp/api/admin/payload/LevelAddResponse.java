package it.reply.sipp.api.admin.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class LevelAddResponse extends PayloadResponse {

	private static final long serialVersionUID = -6794968919626400294L;

	private LevelDTO level;
	
	public LevelAddResponse() {
	}

	public LevelDTO getLevel() {
		return level;
	}

	public void setLevel(LevelDTO level) {
		this.level = level;
	}

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "level", level);
		super.writeFields(sb);
	}
	
	

}
