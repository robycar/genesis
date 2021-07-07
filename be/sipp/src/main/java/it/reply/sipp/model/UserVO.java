package it.reply.sipp.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="USER")
public class UserVO implements Serializable {

	private static final long serialVersionUID = -6114287442328258598L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Enumerated(EnumType.STRING)
	private UserType type;
	
	private String username;
	
	private String password;
	
	private String token;
	
	private String cognome;
	
	private String nome;
	
	private String email;
	
	private String tel1;
	
	private String tel2;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
		name = "USER_ROLE",
		joinColumns=@JoinColumn(name="USER_ID"),
		inverseJoinColumns = @JoinColumn(name="ROLE_NAME")
	)
	private Set<RoleVO> roles;
	
	@ManyToOne
	@JoinColumn(name="GRUPPO_ID")
	private GruppoVO gruppo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public UserType getType() {
		return type;
	}

	public void setType(UserType type) {
		this.type = type;
	}

	public Set<RoleVO> getRoles() {
		return roles;
	}

	public void setRoles(Set<RoleVO> roles) {
		this.roles = roles;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public GruppoVO getGruppo() {
		return gruppo;
	}

	public void setGruppo(GruppoVO gruppo) {
		this.gruppo = gruppo;
	}
	
}
