package it.reply.genesis.api.admin.payload;

import java.util.List;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class LevelListResponse extends PayloadResponse {

	private static final long serialVersionUID = -2173641283003355020L;

	private List<LevelDTO> livelli;
	
	public LevelListResponse() {
	}

	public List<LevelDTO> getLivelli() {
		return livelli;
	}

	public void setLivelli(List<LevelDTO> livelli) {
		this.livelli = livelli;
	}

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "livelli", livelli);
		super.writeFields(sb);
	}
	
}
