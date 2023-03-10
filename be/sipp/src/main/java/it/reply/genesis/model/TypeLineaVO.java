package it.reply.genesis.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="TYPE_LINEE")
public class TypeLineaVO extends BaseEntity {

	public static final int DESCRIZIONE_LENGTH = 1000;

	public static final long serialVersionUID = 1610538030645219226L;
	
	@Id
	@Column(name="ID_TYPE_LINEA")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "DESCRIZIONE", length = DESCRIZIONE_LENGTH)
	private String descrizione;
	
	@Enumerated(EnumType.STRING)
	@Column(name="NATURA", nullable = false)
	private NaturaLinea natura;
	
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "typeLinee")
	private Set<OutboundProxyVO> proxies;
	
	public TypeLineaVO() {
	}

	public TypeLineaVO(Long id) {
    this.id = id;
  }

  public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescrizione() {
		return descrizione;
	}

	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}

  public Set<OutboundProxyVO> getProxies() {
    return proxies;
  }

  public void setProxies(Set<OutboundProxyVO> proxies) {
    this.proxies = proxies;
  }

  public NaturaLinea getNatura() {
    return natura;
  }

  public void setNatura(NaturaLinea natura) {
    this.natura = natura;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((id == null) ? 0 : id.hashCode());
    return result;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    TypeLineaVO other = (TypeLineaVO) obj;
    if (id == null) {
      if (other.id != null)
        return false;
    } else if (!id.equals(other.id))
      return false;
    return true;
  }
	
	
}
