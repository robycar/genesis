package it.reply.sipp.api.admin.payload;

import java.util.Set;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import it.reply.sipp.api.generic.payload.PayloadRequest;
import it.reply.sipp.model.LevelVO;

public class LevelUpdateRequest extends PayloadRequest {

	private static final long serialVersionUID = -3645259824182409540L;

	@NotNull
	private Long id;

	@Length(max=LevelVO.NOME_LENGTH)
	@NotEmpty
	private String nome;
	
	@Length(max=LevelVO.DESCRIZIONE_LENGTH)
	private String descrizione;
	
	private Set<String> funzioni;

	public LevelUpdateRequest() {
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

	public Set<String> getFunzioni() {
		return funzioni;
	}

	public void setFunzioni(Set<String> funzioni) {
		this.funzioni = funzioni;
	}

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "id", id);
		writeField(sb, "nome", nome);
		writeField(sb, "descrizione", descrizione);
		writeField(sb, "funzioni", funzioni);
		
		super.writeFields(sb);
	}

	
}
