package it.reply.sipp.api.admin.payload;

import java.util.List;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class FunzioneListResponse extends PayloadResponse {

	private static final long serialVersionUID = -5072837358039028202L;

	private List<FunzioneDTO> funzioni;
	
	public FunzioneListResponse() {
	}

	public List<FunzioneDTO> getFunzioni() {
		return funzioni;
	}

	public void setFunzioni(List<FunzioneDTO> funzioni) {
		this.funzioni = funzioni;
	}

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "funzioni", funzioni);
		super.writeFields(sb);
	}

	
	
}
