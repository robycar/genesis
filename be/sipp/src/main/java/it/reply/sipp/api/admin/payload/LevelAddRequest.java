package it.reply.sipp.api.admin.payload;

import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import it.reply.sipp.api.generic.payload.PayloadRequest;
import it.reply.sipp.model.LevelVO;

public class LevelAddRequest extends PayloadRequest {

	private static final long serialVersionUID = -2227256949130726917L;

	@Length(max=LevelVO.NOME_LENGTH)
	@NotEmpty
	private String nome;
	
	@Length(max=LevelVO.DESCRIZIONE_LENGTH)
	private String descrizione;

	public LevelAddRequest() {
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

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "nome", nome);
		writeField(sb, "descrizione", descrizione);
		
		super.writeFields(sb);
	}
	
	
}
