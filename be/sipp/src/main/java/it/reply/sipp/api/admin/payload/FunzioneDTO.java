package it.reply.sipp.api.admin.payload;

import it.reply.sipp.api.generic.payload.DTO;
import it.reply.sipp.model.FunzioneVO;

public class FunzioneDTO extends DTO {

	private static final long serialVersionUID = -2785166944865467147L;

	private String codice;
	
	private String nome;
	
	private String descrizione;
	
	public FunzioneDTO() {
	}
	
	public FunzioneDTO(FunzioneVO vo) {
		this.codice = vo.getCodice();
		this.descrizione = vo.getDescrizione();
		this.nome = vo.getNome();
	}

	public String getCodice() {
		return codice;
	}

	public void setCodice(String codice) {
		this.codice = codice;
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
		writeField(sb, "codice", codice);
		writeField(sb, "nome", nome);
		writeField(sb, "descrizione", descrizione);
		
		super.writeFields(sb);
	}

	
	
}
