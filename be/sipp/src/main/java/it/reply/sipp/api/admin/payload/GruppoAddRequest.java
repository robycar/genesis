package it.reply.sipp.api.admin.payload;

import javax.validation.constraints.NotEmpty;

import it.reply.sipp.api.generic.payload.PayloadRequest;

public class GruppoAddRequest extends PayloadRequest {

	private static final long serialVersionUID = -8098792663381078163L;

	@NotEmpty
	private String nome;
	
	private String descrizione;
	
	public GruppoAddRequest() {
	}

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "nome", nome);
		writeField(sb, "descrizione", descrizione);
		super.writeFields(sb);
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
