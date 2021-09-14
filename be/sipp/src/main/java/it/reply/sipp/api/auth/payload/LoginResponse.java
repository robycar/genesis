package it.reply.sipp.api.auth.payload;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class LoginResponse extends PayloadResponse {

  private static final long serialVersionUID = 4603560222909986180L;

  public static final String BEARER = "Bearer";
	
	@JsonProperty("access_token")
	private String accessToken;
	
	@JsonProperty("token_type")
	private String tokenType;
	
	private String username;
//	private List<String> roles;
	private List<String> functions;
	
	private Long internalUserId;
	
	private ApplicationInfoDTO applicationInfo = new ApplicationInfoDTO();
	
	public LoginResponse() {
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getTokenType() {
		return tokenType;
	}

	public void setTokenType(String tokenType) {
		this.tokenType = tokenType;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

//	public List<String> getRoles() {
//		return roles;
//	}
//
//	public void setRoles(List<String> roles) {
//		this.roles = roles;
//	}

	public List<String> getFunctions() {
		return functions;
	}

	public void setFunctions(List<String> functions) {
		this.functions = functions;
	}

  public Long getInternalUserId() {
    return internalUserId;
  }

  public void setInternalUserId(Long internalUserId) {
    this.internalUserId = internalUserId;
  }

  public ApplicationInfoDTO getApplicationInfo() {
    return applicationInfo;
  }

  public void setApplicationInfo(ApplicationInfoDTO applicationInfo) {
    this.applicationInfo = applicationInfo;
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "accessToken", accessToken);
    writeField(sb, "functions", functions);
    writeField(sb, "tokenType", tokenType);
    writeField(sb, "username", username);
    writeField(sb, "internalUserId", internalUserId);
    writeField(sb, "applicationInfo", applicationInfo);
    super.writeFields(sb);
  }
	
	
}
