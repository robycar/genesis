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
import javax.persistence.Table;

@Entity
@Table(name="LEVEL")
public class LevelVO extends BaseEntity {

	private static final long serialVersionUID = -5771684324058623918L;

	public static final int NOME_LENGTH = 50;

	public static final int DESCRIZIONE_LENGTH = 1000;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID_LEVEL")
	private Long id;
	
	@Column(name="LEVEL", length = NOME_LENGTH)
	private String nome;
	
	@Column(length=DESCRIZIONE_LENGTH)
	private String descrizione;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "AUTORIZZAZIONE_LEVEL", 
		joinColumns = @JoinColumn(name = "ID_LEVEL"), 
		inverseJoinColumns = @JoinColumn(name="FUNZIONE_CODICE"))
	private Set<FunzioneVO> funzioni;
	
	public LevelVO() {
	}
	
	public LevelVO(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescrizione() {
		return descrizione;
	}

	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}

	public Set<FunzioneVO> getFunzioni() {
		return funzioni;
	}

	public void setFunzioni(Set<FunzioneVO> funzioni) {
		this.funzioni = funzioni;
	}
	
	
}
