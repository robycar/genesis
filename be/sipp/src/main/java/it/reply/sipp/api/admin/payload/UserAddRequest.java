package it.reply.sipp.api.admin.payload;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.apache.commons.lang3.StringUtils;

import it.reply.sipp.api.generic.payload.PayloadRequest;
import it.reply.sipp.model.UserVO;

public class UserAddRequest extends PayloadRequest {

	private static final long serialVersionUID = 1558002983218074304L;

	@Size(max = UserVO.USERNAME_LENGTH)
	@NotEmpty
	private String username;
	
	@Size(min=1, max = UserVO.RAW_PASWORD_LENGTH)
	@NotEmpty
	private String password;
	
	@Size(max=UserVO.COGNOME_LENGTH)
	@NotEmpty
	private String cognome;
	
	@Size(max=UserVO.NOME_LENGTH)
	@NotEmpty
	private String nome;
	
	@Size(max=UserVO.AZIENDA_LENGTH)
	@NotEmpty
	private String azienda;
	
	@Size(max=UserVO.EMAIL_LENGTH)
	@NotEmpty
	@Email
	private String email;
	
	@NotNull
	@Valid
	private LevelDTO level;
	
	@NotNull
	@Valid
	private GruppoDTO gruppo;

	public UserAddRequest() {
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getCognome() {
		return cognome;
	}

	public void setCognome(String cognome) {
		this.cognome = cognome;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getAzienda() {
		return azienda;
	}

	public void setAzienda(String azienda) {
		this.azienda = azienda;
	}

	public LevelDTO getLevel() {
		return level;
	}

	public void setLevel(LevelDTO level) {
		this.level = level;
	}

	public GruppoDTO getGruppo() {
		return gruppo;
	}

	public void setGruppo(GruppoDTO gruppo) {
		this.gruppo = gruppo;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  @Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "username", username);
		writeField(sb, "password", password != null ? StringUtils.repeat('*', password.length()) : null);
		writeField(sb, "email", email);
		writeField(sb, "cognome", cognome);
		writeField(sb, "nome", nome);
		writeField(sb, "azienda", azienda);
		writeField(sb, "gruppo", gruppo);
		writeField(sb, "level", level);
		super.writeFields(sb);
	}

	
}
