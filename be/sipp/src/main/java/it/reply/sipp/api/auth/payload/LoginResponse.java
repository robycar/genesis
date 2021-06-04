package it.reply.sipp.api.auth.payload;

import java.util.List;

public class LoginResponse {

	private static final String BEARER = "Bearer";
	
	private String token;
	private String type = BEARER;
	private String username;
	private String email;
	private List<String> roles;
	
	public LoginResponse() {
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
	
	

}
