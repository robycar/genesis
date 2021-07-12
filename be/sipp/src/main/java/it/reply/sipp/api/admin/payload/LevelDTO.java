package it.reply.sipp.api.admin.payload;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import it.reply.sipp.api.generic.payload.DTO;
import it.reply.sipp.model.LevelVO;

public class LevelDTO extends DTO {

	private static final long serialVersionUID = 4924529927827320047L;

	@NotNull
	private Long id;

	@Length(max=LevelVO.NOME_LENGTH)
	private String nome;
	
	@Length(max=LevelVO.DESCRIZIONE_LENGTH)
	private String descrizione;

	public LevelDTO() {
	}
	
	public LevelDTO(LevelVO vo) {
		this.id = vo.getId();
		this.descrizione = vo.getDescrizione();
		this.nome = vo.getNome();
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

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "id", id);
		writeField(sb, "nome", nome);
		writeField(sb, "descrizione", descrizione);
		
		super.writeFields(sb);
	}

	
	
}
