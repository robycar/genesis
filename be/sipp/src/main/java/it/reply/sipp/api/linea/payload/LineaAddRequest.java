package it.reply.sipp.api.linea.payload;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Length;

import it.reply.sipp.api.generic.payload.PayloadRequest;
import it.reply.sipp.model.LineaVO;

public class LineaAddRequest extends PayloadRequest {

	private static final long serialVersionUID = -3803388246900915829L;

	@NotEmpty
	@Size(max = LineaVO.NUMERO_LENGTH)
	private String numero;

	@NotEmpty
	@Size(max = LineaVO.IP_LENGTH)
	private String ip;

	@NotNull
	private Integer porta;
	
	@NotEmpty
	@Length(max = LineaVO.PASSWORD_LENGTH)
	private String password;

	@NotNull
	@Valid
	private TypeLineaDTO typeLinea;

	public LineaAddRequest() {
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
		writeField(sb, "ip", ip);
		writeField(sb, "numero", numero);
		writeField(sb, "password", password == null ? null : StringUtils.repeat('*', password.length()));
		writeField(sb, "porta", porta);
		writeField(sb, "typeLinea", typeLinea);
		super.writeFields(sb);
	}

	
}
