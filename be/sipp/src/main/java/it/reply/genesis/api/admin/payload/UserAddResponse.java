package it.reply.genesis.api.admin.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class UserAddResponse extends PayloadResponse {

	private static final long serialVersionUID = 2534992476145837059L;
	
	private UserDTO user;
	
	public UserAddResponse() {
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}
}
