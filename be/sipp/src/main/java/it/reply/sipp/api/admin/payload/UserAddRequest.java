package it.reply.sipp.api.admin.payload;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Length;

import it.reply.sipp.api.generic.payload.PayloadRequest;
import it.reply.sipp.model.UserVO;

public class UserAddRequest extends PayloadRequest {

	private static final long serialVersionUID = 1558002983218074304L;

	@Length(max = UserVO.USERNAME_LENGTH)
	@NotEmpty
	private String username;
	
	@Length(min=1, max = UserVO.RAW_PASWORD_LENGTH)
	@NotEmpty
	private String password;
	
	@Length(max=UserVO.COGNOME_LENGTH)
	private String cognome;
	
	@Length(max=UserVO.NOME_LENGTH)
	private String nome;
	
	@Length(max=UserVO.AZIENDA_LENGTH)
	private String azienda;
	
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

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "username", username);
		writeField(sb, "password", password != null ? StringUtils.repeat('*', password.length()) : null);
		writeField(sb, "cognome", cognome);
		writeField(sb, "nome", nome);
		writeField(sb, "azienda", azienda);
		writeField(sb, "gruppo", gruppo);
		writeField(sb, "level", level);
		super.writeFields(sb);
	}

	
}
