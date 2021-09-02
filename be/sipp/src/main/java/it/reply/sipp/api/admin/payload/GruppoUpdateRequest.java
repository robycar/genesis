package it.reply.sipp.api.admin.payload;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import it.reply.sipp.api.generic.payload.PayloadRequest;

public class GruppoUpdateRequest extends PayloadRequest {

	private static final long serialVersionUID = -1962541660207763238L;

	@NotNull
	private Long id;
	
	@NotEmpty
	private String nome;
	
	private String descrizione;
	
	//TODO Rendere @NotNull dopo il recepimento del FE
	private Integer version;
	
	public GruppoUpdateRequest() {
	}

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "nome", nome);
		writeField(sb, "id", id);
		writeField(sb, "descrizione", descrizione);
		
		super.writeFields(sb);
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

  public Integer getVersion() {
    return version;
  }

  public void setVersion(Integer version) {
    this.version = version;
  }

}
