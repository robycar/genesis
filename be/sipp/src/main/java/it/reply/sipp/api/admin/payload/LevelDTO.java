package it.reply.sipp.api.admin.payload;

import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import it.reply.sipp.api.generic.payload.TrackedDTO;
import it.reply.sipp.model.FunzioneVO;
import it.reply.sipp.model.LevelVO;

public class LevelDTO extends TrackedDTO {

	private static final long serialVersionUID = 4924529927827320047L;

	@NotNull
	private Long id;

	@Length(max=LevelVO.NOME_LENGTH)
	private String nome;
	
	@Length(max=LevelVO.DESCRIZIONE_LENGTH)
	private String descrizione;
	
	private Set<String> funzioni;

	public LevelDTO() {
	}
	
	public LevelDTO(LevelVO vo) {
	  this(vo, null);
	}

	public LevelDTO(LevelVO vo, Set<FunzioneVO> funzioniVO) {
	  super(vo);
    this.id = vo.getId();
    this.descrizione = vo.getDescrizione();
    this.nome = vo.getNome();
    if (funzioniVO != null) {
      this.funzioni = funzioniVO.stream()
          .map(f -> f.getCodice())
          .collect(Collectors.toSet());
    }
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
		writeField(sb, "funzioni", funzioni);
		
		super.writeFields(sb);
	}

	public Set<String> getFunzioni() {
		return funzioni;
	}

	public void setFunzioni(Set<String> funzioni) {
		this.funzioni = funzioni;
	}

	
}
