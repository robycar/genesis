package it.reply.sipp.api.admin.payload;

import java.util.List;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class GruppoListResponse extends PayloadResponse {

	private static final long serialVersionUID = -7205531891242795503L;

	private List<GruppoDTO> gruppi;
	
	public GruppoListResponse() {
	}

	public List<GruppoDTO> getGruppi() {
		return gruppi;
	}

	public void setGruppi(List<GruppoDTO> gruppi) {
		this.gruppi = gruppi;
	}

}
