package it.reply.sipp.api.admin.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class RetrieveUserResponse extends PayloadResponse {

	private static final long serialVersionUID = -7649749358932956493L;

	private UserDTO user;
	
	public RetrieveUserResponse() {
	}
	
	public RetrieveUserResponse(UserDTO user) {
		this.user = user;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}
	
	

}
