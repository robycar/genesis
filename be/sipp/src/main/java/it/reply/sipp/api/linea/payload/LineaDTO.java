package it.reply.sipp.api.linea.payload;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.apache.commons.lang3.StringUtils;

import it.reply.sipp.api.generic.payload.DTO;
import it.reply.sipp.model.LineaVO;

public class LineaDTO extends DTO {

	private static final long serialVersionUID = -7062059016489551231L;

	@NotNull
	private Long id;
	
	@Size(max = LineaVO.NUMERO_LENGTH)
	private String numero;

	@Size(max = LineaVO.IP_LENGTH)
	private String ip;
	
	private Integer porta;
	
	@Size(max = LineaVO.PASSWORD_LENGTH)
	private String password;

	private TypeLineaDTO typeLinea;
	
	public LineaDTO() {
	}
	
	public LineaDTO(Long id) {
    this.id = id;
  }

  public LineaDTO(LineaVO vo) {
		this.id = vo.getId();
		this.ip = vo.getIp();
		this.numero = vo.getNumero();
		this.password = vo.getPassword();
		this.porta = vo.getPorta();
		this.typeLinea = vo.getTypeLinea() == null ? null : new TypeLineaDTO(vo.getTypeLinea());
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

	@Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "id", id);
		writeField(sb, "numero", numero);
		writeField(sb, "ip", ip);
		writeField(sb, "password", password == null ? null : StringUtils.repeat('*', password.length()));
		writeField(sb, "porta", porta);
		writeField(sb, "typeLinea", typeLinea);
		super.writeFields(sb);
	}

}
