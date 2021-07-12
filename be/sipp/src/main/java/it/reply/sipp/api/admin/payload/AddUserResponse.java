package it.reply.sipp.api.admin.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class AddUserResponse extends PayloadResponse {

	private static final long serialVersionUID = 2534992476145837059L;
	
	private UserDTO user;
	
	public AddUserResponse() {
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}
}
