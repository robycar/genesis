package it.reply.sipp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="LINEE")
public class LineaVO extends BaseEntity {

	private static final long serialVersionUID = 5640543985054718699L;

	public static final int IP_LENGTH = 39;
	
	public static final int PASSWORD_LENGTH = 200;

	public static final int NUMERO_LENGTH = 20;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_LINEA")
	private Long id;
	
	@Column(name="NUMERO", length = NUMERO_LENGTH)
	private String numero;
	
	@Column(name="IP_LINEA", length = IP_LENGTH)
	private String ip;
	
	private Integer porta;
	
	@Column(length = PASSWORD_LENGTH)
	private String password;

	@ManyToOne
	@JoinColumn(name="ID_TYPE_LINEA")
	private TypeLineaVO typeLinea;
	
	@ManyToOne
	@JoinColumn(name="ID_GRUPPO")
	private GruppoVO gruppo;
	
	public LineaVO() {
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

	public TypeLineaVO getTypeLinea() {
		return typeLinea;
	}

	public void setTypeLinea(TypeLineaVO typeLinea) {
		this.typeLinea = typeLinea;
	}

  public GruppoVO getGruppo() {
    return gruppo;
  }

  public void setGruppo(GruppoVO gruppo) {
    this.gruppo = gruppo;
  }

}