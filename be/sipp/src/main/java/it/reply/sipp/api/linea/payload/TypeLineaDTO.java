package it.reply.sipp.api.linea.payload;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import it.reply.sipp.api.generic.payload.TrackedDTO;
import it.reply.sipp.model.TypeLineaVO;

public class TypeLineaDTO extends TrackedDTO {

	private static final long serialVersionUID = -8330436483869012939L;

	@NotNull
	private Long id;
	
	@Size(max = TypeLineaVO.DESCRIZIONE_LENGTH)
	private String descrizione;
	
	public TypeLineaDTO() {
	}
	
	public TypeLineaDTO(@NotNull Long id) {
		this.id = id;
	}

	public TypeLineaDTO(TypeLineaVO vo) {
	  super(vo);
		this.id = vo.getId();
		this.descrizione = vo.getDescrizione();
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

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "id", id);
		writeField(sb, "descrizione", descrizione);
		super.writeFields(sb);
	}
	
	

}
