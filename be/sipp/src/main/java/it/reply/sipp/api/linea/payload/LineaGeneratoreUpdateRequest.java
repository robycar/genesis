package it.reply.sipp.api.linea.payload;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import it.reply.sipp.api.generic.payload.PayloadRequest;
import it.reply.sipp.model.LineaGeneratoreVO;

public class LineaGeneratoreUpdateRequest extends PayloadRequest {

  private static final long serialVersionUID = -2044439138598503492L;

  @NotNull
  private Long id;
  
  @NotNull
  private Integer version;
  
  @Size(max = LineaGeneratoreVO.IP_LENGTH)
  private String ip;

  @Min(1)
  @Max(value = 65535)
  private Integer porta;
  
  private TypeLineaDTO typeLinea;
  
  public LineaGeneratoreUpdateRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "ip", ip);
    writeField(sb, "porta", porta);
    writeField(sb, "typeLinea", typeLinea);
    writeField(sb, "version", version);
    
    super.writeFields(sb);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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

  public TypeLineaDTO getTypeLinea() {
    return typeLinea;
  }

  public void setTypeLinea(TypeLineaDTO typeLinea) {
    this.typeLinea = typeLinea;
  }

  public Integer getVersion() {
    return version;
  }

  public void setVersion(Integer version) {
    this.version = version;
  }

  
}
