package it.reply.genesis.api.admin.payload;

import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import it.reply.genesis.api.generic.payload.PayloadRequest;
import it.reply.genesis.model.LevelVO;

public class LevelAddRequest extends PayloadRequest {

	private static final long serialVersionUID = -2227256949130726917L;

	@Length(max=LevelVO.NOME_LENGTH)
	@NotEmpty
	private String nome;
	
	@Length(max=LevelVO.DESCRIZIONE_LENGTH)
	private String descrizione;
	
	private Set<String> funzioni;

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

  public Set<String> getFunzioni() {
    return funzioni;
  }

  public void setFunzioni(Set<String> funzioni) {
    this.funzioni = funzioni;
  }

  @Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "nome", nome);
		writeField(sb, "descrizione", descrizione);
		writeField(sb, "funzioni", funzioni);
		super.writeFields(sb);
	}
	
	
}
