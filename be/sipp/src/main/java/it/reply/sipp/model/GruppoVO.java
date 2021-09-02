package it.reply.sipp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="GRUPPO")
public class GruppoVO extends BaseEntity {


	private static final long serialVersionUID = -5525398377075592073L;

	public static final int NOME_LENGTH = 50;
	
	public static final int DESCRIZIONE_LENGTH = 1000;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID_GRUPPO")
	private Long id;
	
	@Column(name="GRUPPO", length = NOME_LENGTH)
	private String nome;
	
	@Column(name="DESCRIZIONE", length = DESCRIZIONE_LENGTH)
	private String descrizione;


	public GruppoVO() {
	}
	
	public GruppoVO(Long id) {
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

}
