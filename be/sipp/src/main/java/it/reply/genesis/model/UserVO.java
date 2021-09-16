package it.reply.genesis.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name="UTENZE")
public class UserVO extends BaseEntity {

	private static final long serialVersionUID = -6114287442328258598L;

	public static final int USERNAME_LENGTH = 25;

	public static final int PASWORD_LENGTH = 100;
	
	public static final int RAW_PASWORD_LENGTH = (PASWORD_LENGTH-8)/4;

	public static final int COGNOME_LENGTH = 50;

	public static final int NOME_LENGTH = 50;

	public static final int AZIENDA_LENGTH = 70;
	
	public static final int EMAIL_LENGTH = 80;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID_UTENZA")
	private Long id;
	
	@Column(length = USERNAME_LENGTH)
	private String username;
	
	@Column(length=PASWORD_LENGTH)
	private String password;
	
	@Column(length=COGNOME_LENGTH)
	private String cognome;
	
	@Column(length=NOME_LENGTH)
	private String nome;
	
	@Column(length=AZIENDA_LENGTH)
	private String azienda;
	
	@Column(length=EMAIL_LENGTH)
	private String email;
	
	@ManyToOne
	@JoinColumn(name="ID_LEVEL")
	private LevelVO level;
	
	@ManyToOne
	@JoinColumn(name="ID_GROUP")
	private GruppoVO gruppo;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "AUTORIZZAZIONE_UTENZE",
		joinColumns = @JoinColumn(name="ID_UTENZA"),
		inverseJoinColumns = @JoinColumn(name="FUNZIONE_CODICE"))
	private Set<FunzioneVO> funzioni;

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

	public LevelVO getLevel() {
		return level;
	}

	public void setLevel(LevelVO level) {
		this.level = level;
	}

	public GruppoVO getGruppo() {
		return gruppo;
	}

	public void setGruppo(GruppoVO gruppo) {
		this.gruppo = gruppo;
	}

	public Set<FunzioneVO> getFunzioni() {
		return funzioni;
	}

	public void setFunzioni(Set<FunzioneVO> funzioni) {
		this.funzioni = funzioni;
	}

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

}
