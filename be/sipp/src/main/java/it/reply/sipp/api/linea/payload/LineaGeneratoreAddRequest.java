package it.reply.sipp.api.linea.payload;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import it.reply.sipp.api.generic.payload.PayloadRequest;
import it.reply.sipp.validation.constraints.FilePresent;
import it.reply.sipp.validation.constraints.IPv4;

public class LineaGeneratoreAddRequest extends PayloadRequest {

  private static final long serialVersionUID = -1580238433510164044L;

  //@NotEmpty
  //@Size(max = LineaGeneratoreVO.IP_LENGTH)
  @IPv4
  private String ip;

  @NotNull
  @Min(1)
  @Max(value = 65535)
  private Integer porta;
  
  @NotNull
  private TypeLineaDTO typeLinea;
  
  @NotNull
  @FilePresent
  private MultipartFile pathCSV;
  
  public LineaGeneratoreAddRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "ip", ip);
    writeField(sb, "porta", porta);
    writeField(sb, "typeLinea", typeLinea);
    writeField(sb, "pathCSV", (pathCSV == null ? 0 : pathCSV.getSize()) + " bytes");
    super.writeFields(sb);
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

  public MultipartFile getPathCSV() {
    return pathCSV;
  }

  public void setPathCSV(MultipartFile pathCSV) {
    this.pathCSV = pathCSV;
  }

}
