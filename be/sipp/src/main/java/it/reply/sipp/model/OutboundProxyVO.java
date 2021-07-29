package it.reply.sipp.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="OUTBOUNDPROXY")
public class OutboundProxyVO implements Serializable {

  private static final long serialVersionUID = -7526571090910948837L;

  public static final int IP_DESTINAZIONE_LENGTH = 1000; //?? 1000 caratteri per un indirizzo ip???
  
  public static final int DESCRIZIONE_LENGTH = 2000;

  @Id
  @Column(name="ID_OBP")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name="IP_DESTINAZIONE", length = IP_DESTINAZIONE_LENGTH)
  private String ipDestinazione;
  
  @Column(length = DESCRIZIONE_LENGTH)
  private String descrizione;
  
  private Integer porta;
  
  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "OBP_TYPE_LINEA",
    joinColumns = @JoinColumn(name="ID_OBP"),
    inverseJoinColumns = @JoinColumn(name="ID_TYPE_LINEA"))
  private Set<TypeLineaVO> typeLinee;
  
  public OutboundProxyVO() {
  }
  
  public OutboundProxyVO(Long id) {
    this.id = id;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getIpDestinazione() {
    return ipDestinazione;
  }

  public void setIpDestinazione(String ipDestinazione) {
    this.ipDestinazione = ipDestinazione;
  }

  public String getDescrizione() {
    return descrizione;
  }

  public void setDescrizione(String descrizione) {
    this.descrizione = descrizione;
  }

  public Integer getPorta() {
    return porta;
  }

  public void setPorta(Integer porta) {
    this.porta = porta;
  }

  public Set<TypeLineaVO> getTypeLinee() {
    return typeLinee;
  }

  public void setTypeLinee(Set<TypeLineaVO> typeLinee) {
    this.typeLinee = typeLinee;
  }

}
