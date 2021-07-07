package it.reply.sipp.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="GRUPPO")
public class GruppoVO implements Serializable {


	private static final long serialVersionUID = -5525398377075592073L;

	public static final int NOME_LENGTH = 20;
	
	public static final int DESCRIZIONE_LENGTH = 80;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="NOME", length = NOME_LENGTH)
	private String nome;
	
	@Column(name="DESCRIZIONE", length = DESCRIZIONE_LENGTH)
	private String descrizione;
	
	public GruppoVO() {
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

}
