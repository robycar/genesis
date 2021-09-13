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
@Table(name="TEST_GENERATORE")
public class TestGeneratoreVO extends BaseEntity {

  private static final long serialVersionUID = 6982003482152210256L;

  public static final int NOME_LENGTH = 80;

  public static final int DESCRIZIONE_LENGTH = 1000;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(name="NOME", length = NOME_LENGTH)
  private String nome;
  
  @Column(name="DESCRIZIONE", length = DESCRIZIONE_LENGTH)
  private String descrizione;
  
  @ManyToOne
  @JoinColumn(name="ID_LINEA_CHIAMANTE")
  private LineaGeneratoreVO lineaChiamante;
  
  @ManyToOne
  @JoinColumn(name="ID_LINEA_CHIAMATO")
  private LineaGeneratoreVO lineaChiamato;
  
  @ManyToOne
  @JoinColumn(name="ID_OBP_CHIAMANTE")
  private OutboundProxyVO proxyChiamante;
  
  @ManyToOne
  @JoinColumn(name="ID_OBP_CHIAMATO")
  private OutboundProxyVO proxyChiamato;
  
  @ManyToOne
  @JoinColumn(name="ID_TEMPLATE")
  private TemplateVO template;
  
  public TestGeneratoreVO() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getDescrizione() {
    return descrizione;
  }

  public void setDescrizione(String descrizione) {
    this.descrizione = descrizione;
  }

  public LineaGeneratoreVO getLineaChiamante() {
    return lineaChiamante;
  }

  public void setLineaChiamante(LineaGeneratoreVO lineaChiamante) {
    this.lineaChiamante = lineaChiamante;
  }

  public LineaGeneratoreVO getLineaChiamato() {
    return lineaChiamato;
  }

  public void setLineaChiamato(LineaGeneratoreVO lineaChiamato) {
    this.lineaChiamato = lineaChiamato;
  }

  public OutboundProxyVO getProxyChiamante() {
    return proxyChiamante;
  }

  public void setProxyChiamante(OutboundProxyVO proxyChiamante) {
    this.proxyChiamante = proxyChiamante;
  }

  public OutboundProxyVO getProxyChiamato() {
    return proxyChiamato;
  }

  public void setProxyChiamato(OutboundProxyVO proxyChiamato) {
    this.proxyChiamato = proxyChiamato;
  }

  public TemplateVO getTemplate() {
    return template;
  }

  public void setTemplate(TemplateVO template) {
    this.template = template;
  }

}
