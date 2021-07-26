package it.reply.sipp.api.linea.payload;

import java.util.List;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class LineaListResponse extends PayloadResponse {

	private static final long serialVersionUID = -3819829653680350565L;

	private List<LineaDTO> list;
	
	public LineaListResponse() {
	}

	public List<LineaDTO> getList() {
		return list;
	}

	public void setList(List<LineaDTO> list) {
		this.list = list;
	}

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "list", list);
		super.writeFields(sb);
	}
	
	

}
