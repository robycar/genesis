package it.reply.sipp.api.admin.payload;

import java.util.List;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class ListResponse extends PayloadResponse {

	private static final long serialVersionUID = -5203163953545643202L;

	private List<UserDTO> users;
	
	public ListResponse() {
	}

	public List<UserDTO> getUsers() {
		return users;
	}

	public void setUsers(List<UserDTO> users) {
		this.users = users;
	}

	
	
}
