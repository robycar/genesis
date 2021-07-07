package it.reply.sipp.api.admin.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.StringUtils;

import it.reply.sipp.api.generic.payload.PayloadRequest;

public class UpdateUserRequest extends PayloadRequest {

	private static final long serialVersionUID = 7724275771443883790L;

	public UpdateUserRequest() {
	}
	
	@NotBlank(message="{userId.notBlank}")
	private String userId;
	
	@NotNull(message = "Il campo user &egrave; obbligatorio")
	private UserDTO user;
	
	private String password;
	
	private Boolean updateRoles;

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean isUpdateRoles() {
		return updateRoles;
	}

	public void setUpdateRoles(Boolean updateRoles) {
		this.updateRoles = updateRoles;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "userId", userId);
		writeField(sb, "user", user);
		if (password != null) {
			writeField(sb, password, StringUtils.repeat('*', password.length()));
		}
		writeField(sb, "updateRoles", updateRoles);
		super.writeFields(sb);
	}
	
	
	
}
