package it.reply.genesis.api.linea.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class LineaAddResponse extends PayloadResponse {

	private static final long serialVersionUID = -6343180298202422444L;

	private LineaDTO linea;
	
	public LineaAddResponse() {
	}

	public LineaDTO getLinea() {
		return linea;
	}

	public void setLinea(LineaDTO linea) {
		this.linea = linea;
	}

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "linea", linea);
		super.writeFields(sb);
	}
	
	

}
