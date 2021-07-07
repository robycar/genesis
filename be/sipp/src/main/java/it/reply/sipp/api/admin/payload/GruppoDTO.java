package it.reply.sipp.api.admin.payload;

import it.reply.sipp.api.generic.payload.DTO;
import it.reply.sipp.model.GruppoVO;

public class GruppoDTO extends DTO {

	private static final long serialVersionUID = 790868777509335605L;

	private Long id;
	
	private String nome;
	
	private String descrizione;

	public GruppoDTO() {
	}
	
	public GruppoDTO(GruppoVO vo) {
		this.id = vo.getId();
		this.nome = vo.getNome();
		this.descrizione = vo.getDescrizione();
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
