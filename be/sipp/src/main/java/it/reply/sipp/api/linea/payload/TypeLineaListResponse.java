package it.reply.sipp.api.linea.payload;

import java.util.List;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class TypeLineaListResponse extends PayloadResponse {

	private static final long serialVersionUID = 4527125009123688506L;

	private List<TypeLineaDTO> list;
	
	public TypeLineaListResponse() {
	}

	public List<TypeLineaDTO> getList() {
		return list;
	}

	public void setList(List<TypeLineaDTO> list) {
		this.list = list;
	}
	
}
