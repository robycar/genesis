package it.reply.sipp.api.admin.payload;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotNull;

import it.reply.sipp.api.generic.payload.DTO;
import it.reply.sipp.model.RoleVO;
import it.reply.sipp.model.UserVO;

public class UserDTO extends DTO {

	private static final long serialVersionUID = 7380820112751434618L;

	private Long id;
	
	private String username;
	
	private String email;
	
	private String cognome;
	
	private String nome;
	
	private String tel1;
	
	private String tel2;
	
	private Set<String> roles;

	public UserDTO() {
	}
	
	public UserDTO(UserVO vo) {
		this.id = vo.getId();
		this.username = vo.getUsername();
		this.cognome = vo.getCognome();
		this.nome = vo.getNome();
		this.tel1 = vo.getTel1();
		this.tel2 = vo.getTel2();
		this.email = vo.getEmail();
		
		if (vo.getRoles() != null) {
			this.roles = new HashSet<>(vo.getRoles().size());
			for (RoleVO roleVO: vo.getRoles()) {
				this.roles.add(roleVO.getName());
			}
		}
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

	public String getTel1() {
		return tel1;
	}

	public void setTel1(String tel1) {
		this.tel1 = tel1;
	}

	public String getTel2() {
		return tel2;
	}

	public void setTel2(String tel2) {
		this.tel2 = tel2;
	}

	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "id", id);
		writeField(sb, "username", username);
		writeField(sb, "email", email);
		writeField(sb, "cognome", cognome);
		writeField(sb, "nome", nome);
		writeField(sb, "tel1", tel1);
		writeField(sb, "tel2", tel2);
		writeField(sb, "roles", roles);
		super.writeFields(sb);
	}
}
