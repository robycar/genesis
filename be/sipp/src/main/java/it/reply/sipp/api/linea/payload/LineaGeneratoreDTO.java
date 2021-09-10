package it.reply.sipp.api.linea.payload;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import it.reply.sipp.api.files.payload.FileDTO;
import it.reply.sipp.api.generic.payload.TrackedDTO;
import it.reply.sipp.model.LineaGeneratoreVO;

public class LineaGeneratoreDTO extends TrackedDTO {

  private static final long serialVersionUID = -2206832485691166046L;

  @NotNull
  private Long id;
  
  @Size(max = LineaGeneratoreVO.IP_LENGTH)
  private String ip;
  
  private Integer porta;
  
  private TypeLineaDTO typeLinea;
  
  private FileDTO pathCSV;

  public LineaGeneratoreDTO() {
  }

  public LineaGeneratoreDTO(Long id) {
    super();
    this.id = id;
  }

  public LineaGeneratoreDTO(LineaGeneratoreVO vo) {
    super(vo);
    this.id = vo.getId();
    this.ip = vo.getIp();
    this.porta = vo.getPorta();
    if (vo.getTypeLinea() != null) {
      this.typeLinea = new TypeLineaDTO(vo.getTypeLinea());
    }
    if (vo.getPathCSV() != null) {
      this.pathCSV = new FileDTO(vo.getPathCSV());
    }
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "ip", ip);
    writeField(sb, "porta", porta);
    writeField(sb, "typeLinea", typeLinea);
    writeField(sb, "pathCSV", pathCSV);
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

  public FileDTO getPathCSV() {
    return pathCSV;
  }

  public void setPathCSV(FileDTO pathCSV) {
    this.pathCSV = pathCSV;
  }

}
