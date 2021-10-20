package it.reply.genesis.model;

import java.time.Instant;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="TEST_GENERATORE_CARICATO")
public class TestGeneratoreCaricatoVO extends BaseEntity {

  private static final long serialVersionUID = -5188916335093821269L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(name="NOME", length = TestGeneratoreVO.NOME_LENGTH)
  private String nome;
  
  @Column(name="DESCRIZIONE", length = TestGeneratoreVO.DESCRIZIONE_LENGTH)
  private String descrizione;
  
  @Enumerated(EnumType.STRING)
  @Column(name="STATO", nullable = false)
  private LoadedEntityStatus stato;

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
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="ID_TEST_GENERATORE")
  private TestGeneratoreVO testGeneratore;
  
  private Long rate;
  
  @Column(name="DURATA_TRAFFICO")
  private Long durataTraffico;
  
  @Column(name="SCHEDULE_DATETIME")
  private LocalDateTime scheduleDateTime;
  
  @Column(name="SCHEDULE_DELAY")
  private Long delay;
  
  @Column(name="START_DATE")
  private Instant startDate;
  
  @Column(name="END_DATE")
  private Instant endDate;
  
  @ManyToOne
  @JoinColumn(name="ID_GRUPPO")
  private GruppoVO gruppo;

  public TestGeneratoreCaricatoVO() {
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

  public TestGeneratoreVO getTestGeneratore() {
    return testGeneratore;
  }

  public void setTestGeneratore(TestGeneratoreVO testGeneratore) {
    this.testGeneratore = testGeneratore;
  }

  public Long getRate() {
    return rate;
  }

  public void setRate(Long rate) {
    this.rate = rate;
  }

  public Long getDurataTraffico() {
    return durataTraffico;
  }

  public void setDurataTraffico(Long durataTraffico) {
    this.durataTraffico = durataTraffico;
  }

  public LocalDateTime getScheduleDateTime() {
    return scheduleDateTime;
  }

  public void setScheduleDateTime(LocalDateTime scheduleDateTime) {
    this.scheduleDateTime = scheduleDateTime;
  }

  public Long getDelay() {
    return delay;
  }

  public void setDelay(Long delay) {
    this.delay = delay;
  }

  public Instant getStartDate() {
    return startDate;
  }

  public void setStartDate(Instant startDate) {
    this.startDate = startDate;
  }

  public Instant getEndDate() {
    return endDate;
  }

  public void setEndDate(Instant endDate) {
    this.endDate = endDate;
  }

  public GruppoVO getGruppo() {
    return gruppo;
  }

  public void setGruppo(GruppoVO gruppo) {
    this.gruppo = gruppo;
  }

  public LoadedEntityStatus getStato() {
    return stato;
  }

  public void setStato(LoadedEntityStatus stato) {
    this.stato = stato;
  }

}
