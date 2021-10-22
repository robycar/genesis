package it.reply.genesis.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="LINEE_GEN")
public class LineaGeneratoreVO extends BaseEntity {

  private static final long serialVersionUID = -3008082361037158477L;

  public static final int IP_LENGTH = 39;
  
  public static final int PASSWORD_LENGTH = 200;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ID_LINEA_GEN")
  private Long id;
  
  @Column(name="IP_LINEA", length = IP_LENGTH)
  private String ip;
  
  private Integer porta;
  
  @ManyToOne
  @JoinColumn(name="ID_TYPE_LINEA")
  private TypeLineaVO typeLinea;
  
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
  @JoinColumn(name="PATH_CSV", nullable = true)
  private FileSystemVO pathCSV;
  
  @ManyToOne
  @JoinColumn(name="ID_GRUPPO")
  private GruppoVO gruppo;
  
  public LineaGeneratoreVO() {
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

  public TypeLineaVO getTypeLinea() {
    return typeLinea;
  }

  public void setTypeLinea(TypeLineaVO typeLinea) {
    this.typeLinea = typeLinea;
  }

  public FileSystemVO getPathCSV() {
    return pathCSV;
  }

  public void setPathCSV(FileSystemVO pathCSV) {
    this.pathCSV = pathCSV;
  }

  public GruppoVO getGruppo() {
    return gruppo;
  }

  public void setGruppo(GruppoVO gruppo) {
    this.gruppo = gruppo;
  }


}
