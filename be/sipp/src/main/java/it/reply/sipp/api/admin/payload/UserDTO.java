package it.reply.sipp.api.admin.payload;

import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.constraints.Size;

import it.reply.sipp.api.generic.payload.DTO;
import it.reply.sipp.model.UserVO;

public class UserDTO extends DTO {

	private static final long serialVersionUID = 7380820112751434618L;

	private Long id;
	
	@Size(max = UserVO.USERNAME_LENGTH)
	private String username;
	
	@Size(max=UserVO.COGNOME_LENGTH)
	private String cognome;
	
	@Size(max=UserVO.NOME_LENGTH)
	private String nome;
	
	@Size(max=UserVO.AZIENDA_LENGTH)
	private String azienda;
	
	@Size(max = UserVO.EMAIL_LENGTH)
	private String email;
	
	private LevelDTO level;
	
	private GruppoDTO gruppo;
	
	private Set<String> funzioni;
	
	public UserDTO() {
	}
	
	public UserDTO(UserVO vo) {
		this.id = vo.getId();
		this.username = vo.getUsername();
		this.cognome = vo.getCognome();
		this.nome = vo.getNome();
		this.azienda = vo.getAzienda();
		this.email = vo.getEmail();
		if (vo.getGruppo() != null) {
			this.gruppo = new GruppoDTO(vo.getGruppo());
		} else {
			this.gruppo = new GruppoDTO();
		}
		
		if (vo.getLevel() != null) {
			this.level = new LevelDTO(vo.getLevel());
		} else {
			this.level = new LevelDTO();
		}
		
		if (vo.getFunzioni() != null) {
		  this.funzioni = vo.getFunzioni()
		      .stream()
		      .map(f -> f.getCodice())
		      .collect(Collectors.toSet());
		}
		
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getCognome() {
		return cognome;
	}

	public void setCognome(String cognome) {
		this.cognome = cognome;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getAzienda() {
		return azienda;
	}

	public void setAzienda(String azienda) {
		this.azienda = azienda;
	}

	public LevelDTO getLevel() {
		return level;
	}

	public void setLevel(LevelDTO level) {
		this.level = level;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public GruppoDTO getGruppo() {
		return gruppo;
	}

	public void setGruppo(GruppoDTO gruppo) {
		this.gruppo = gruppo;
	}

	public Set<String> getFunzioni() {
    return funzioni;
  }

  public void setFunzioni(Set<String> funzioni) {
    this.funzioni = funzioni;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  @Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "id", id);
		writeField(sb, "username", username);
		writeField(sb, "email", email);
		writeField(sb, "cognome", cognome);
		writeField(sb, "nome", nome);
		writeField(sb, "azienda", azienda);
		writeField(sb, "level", level);
		writeField(sb, "gruppo", gruppo);
		writeField(sb, "funzioni", funzioni);
		super.writeFields(sb);
	}
}
