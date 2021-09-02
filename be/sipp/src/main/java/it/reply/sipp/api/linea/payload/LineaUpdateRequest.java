package it.reply.sipp.api.linea.payload;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.apache.commons.lang3.StringUtils;

import it.reply.sipp.api.generic.payload.PayloadRequest;
import it.reply.sipp.model.LineaVO;

public class LineaUpdateRequest extends PayloadRequest {

	private static final long serialVersionUID = -1884332414871451816L;

	@NotNull
	private Long id;
	
	@Size(max = LineaVO.NUMERO_LENGTH)
	private String numero;

	@Size(max = LineaVO.IP_LENGTH)
	private String ip;
	
	private Integer porta;
	
	@Size(max = LineaVO.PASSWORD_LENGTH)
	private String password;
	
	@Valid
	private TypeLineaDTO typeLinea;
	
	//TODO: Abilitare @NotNull
	private Integer version;

	public LineaUpdateRequest() {
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

	public void setTypeLineaDTO(TypeLineaDTO typeLinea) {
		this.typeLinea = typeLinea;
	}

	
	public Integer getVersion() {
    return version;
  }

  public void setVersion(Integer version) {
    this.version = version;
  }

  @Override
	protected void writeFields(StringBuilder sb) {
		writeField(sb, "id", id);
		writeField(sb, "ip", ip);
		writeField(sb, "numero", numero);
		writeField(sb, "password", password == null ? null : StringUtils.repeat('*', password.length()));
		writeField(sb, "porta", porta);
		writeField(sb, "typeLinea", typeLinea);
		writeField(sb, "version", version);
		super.writeFields(sb);
	}

	
	
}
