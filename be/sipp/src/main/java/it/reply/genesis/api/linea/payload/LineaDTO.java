package it.reply.genesis.api.linea.payload;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.apache.commons.lang3.StringUtils;

import it.reply.genesis.api.admin.payload.GruppoDTO;
import it.reply.genesis.api.generic.payload.TrackedDTO;
import it.reply.genesis.model.LineaVO;

public class LineaDTO extends TrackedDTO {

	private static final long serialVersionUID = -7062059016489551231L;

	@NotNull
	private Long id;
	
	@Size(max = LineaVO.NUMERO_LENGTH)
	private String numero;

	@Size(max = LineaVO.IP_LENGTH)
	private String ip;
	
	private Integer porta;
	
	private GruppoDTO gruppo;
	
	@Size(max = LineaVO.PASSWORD_LENGTH)
	private String password;

	private TypeLineaDTO typeLinea;
	
	public LineaDTO() {
	}
	
	public LineaDTO(Long id) {
    this.id = id;
  }

  public LineaDTO(LineaVO vo) {
    super(vo);
		this.id = vo.getId();
		this.ip = vo.getIp();
		this.numero = vo.getNumero();
		this.password = vo.getPassword();
		this.porta = vo.getPorta();
		this.typeLinea = vo.getTypeLinea() == null ? null : new TypeLineaDTO(vo.getTypeLinea());
		this.gruppo = vo.getGruppo() == null ? null : new GruppoDTO(vo.getGruppo());
	}
  
  public String getCampiConcatenati() {
    StringBuilder sb = new StringBuilder();
    sb.append(this.numero).append(" - ")
      .append(this.ip).append(" : ")
      .append(this.porta).append(" - ");
    if (this.typeLinea != null) {
      sb.append(this.typeLinea.getDescrizione());
    }
    
    return sb.toString();
  }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public Integer getPorta() {
		return porta;
	}

	public void setPorta(Integer porta) {
		this.porta = porta;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public TypeLineaDTO getTypeLinea() {
		return typeLinea;
	}

	public void setTypeLinea(TypeLineaDTO typeLinea) {
		this.typeLinea = typeLinea;
	}

	public GruppoDTO getGruppo() {
    return gruppo;
  }

  public void setGruppo(GruppoDTO gruppo) {
    this.gruppo = gruppo;
  }

  @Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "id", id);
		writeField(sb, "numero", numero);
		writeField(sb, "ip", ip);
		writeField(sb, "password", password == null ? null : StringUtils.repeat('*', password.length()));
		writeField(sb, "porta", porta);
		writeField(sb, "typeLinea", typeLinea);
		writeField(sb, "gruppo", gruppo);
		super.writeFields(sb);
	}

}
