package it.reply.sipp.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="FUNZIONE")
public class FunzioneVO implements Serializable {

	private static final long serialVersionUID = 5007412515989779738L;

	@Id
	private String codice;
	
	private String nome;
	
	private String descrizione;
	
	private Boolean reserved;
	
	public FunzioneVO() {
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String name) {
		this.nome = name;
	}

	public String getDescrizione() {
		return descrizione;
	}

	public void setDescrizione(String description) {
		this.descrizione = description;
	}

	public String getCodice() {
		return codice;
	}

	public void setCodice(String code) {
		this.codice = code;
	}

	public Boolean getReserved() {
    return reserved;
  }

  public void setReserved(Boolean reserved) {
    this.reserved = reserved;
  }

  @Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((codice == null) ? 0 : codice.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		FunzioneVO other = (FunzioneVO) obj;
		if (codice == null) {
			if (other.codice != null)
				return false;
		} else if (!codice.equals(other.codice))
			return false;
		return true;
	}
}
