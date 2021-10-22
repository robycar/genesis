package it.reply.genesis.api.auth.payload;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class LoginResponse extends PayloadResponse {

  private static final long serialVersionUID = 4603560222909986180L;

  public static final String BEARER = "Bearer";
	
	@JsonProperty("access_token")
	private String accessToken;
	
	@JsonProperty("token_type")
	private String tokenType;
	
	@JsonProperty("token_expiration")
	private Date tokenExpiration;
	
	private String username;
//	private List<String> roles;
	private List<String> functions;
	
	private Long internalUserId;
	
	private String currentRole;
	
	private String currentGroup;
	
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
    writeField(sb, "tokenExpiration", tokenExpiration);
    writeField(sb, "username", username);
    writeField(sb, "internalUserId", internalUserId);
    writeField(sb, "applicationInfo", applicationInfo);
    writeField(sb, "currentGroup", currentGroup);
    writeField(sb, "currentRole", currentRole);
    
    super.writeFields(sb);
  }

  public String getCurrentRole() {
    return currentRole;
  }

  public void setCurrentRole(String currentRole) {
    this.currentRole = currentRole;
  }

  public String getCurrentGroup() {
    return currentGroup;
  }

  public void setCurrentGroup(String currentGroup) {
    this.currentGroup = currentGroup;
  }

  public Date getTokenExpiration() {
    return tokenExpiration;
  }

  public void setTokenExpiration(Date tokenExpiration) {
    this.tokenExpiration = tokenExpiration;
  }

	
	
}
