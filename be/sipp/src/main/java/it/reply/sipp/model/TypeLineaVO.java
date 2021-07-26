package it.reply.sipp.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="TYPE_LINEE")
public class TypeLineaVO implements Serializable {

	public static final int DESCRIZIONE_LENGTH = 1000;

	public static final long serialVersionUID = 1610538030645219226L;
	
	@Id
	@Column(name="ID_TYPE_LINEA")
	private Long id;

	@Column(name = "DESCRIZIONE", length = DESCRIZIONE_LENGTH)
	private String descrizione;
	
	public TypeLineaVO() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescrizione() {
		return descrizione;
	}

	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}

}
