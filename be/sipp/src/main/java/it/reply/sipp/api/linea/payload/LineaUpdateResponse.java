package it.reply.sipp.api.linea.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class LineaUpdateResponse extends PayloadResponse {

	private static final long serialVersionUID = -4593061822446541260L;
	
	private LineaDTO linea;
	
	public LineaUpdateResponse() {
	}

	public LineaDTO getLinea() {
		return linea;
	}

	public void setLinea(LineaDTO linea) {
		this.linea = linea;
	}

}
