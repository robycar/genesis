package it.reply.sipp.model;

import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

@Entity
@Table(name="TEST_CASE")
public class TestCaseVO extends BaseEntity {

  private static final long serialVersionUID = -6192614604772927009L;

  public static final int NOME_LENGTH = 80;

  public static final int DESCRIZIONE_LENGTH = 255;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(name="EXPECTED_DURATION")
  private Long expectedDuration;
  
  @Column(name="NOME", length = NOME_LENGTH)
  private String nome;
  
  @Column(name="DESCRIZIONE", length = DESCRIZIONE_LENGTH)
  private String descrizione;
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="ID_TEMPLATE", nullable = false)
  private TemplateVO template;
  
  @ManyToOne(optional = true)
  @JoinColumn(name="ID_LINEA_CHIAMATO")
  private LineaVO lineaChiamato;
  
  @ManyToOne(optional = true)
  @JoinColumn(name="ID_OBP_CHIAMATO")
  private OutboundProxyVO obpChiamato;
  
  @ManyToOne(optional = true)
  @JoinColumn(name="FILE_SYSTEM_ID_CHIAMATO")
  private FileSystemVO fileChiamato;
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="ID_GRUPPO", nullable = false)
  private GruppoVO gruppo;

  @OneToMany(mappedBy = "testCase", cascade = CascadeType.REMOVE)
  @OrderBy("numLinea")
  private List<TestCaseLineaChiamanteVO> lineeChiamanti;

  public TestCaseVO() {
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    if (getClass() != obj.getClass()) {
      return false;
    }
    TestCaseVO other = (TestCaseVO) obj;
    return Objects.equals(id, other.id);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getExpectedDuration() {
    return expectedDuration;
  }

  public void setExpectedDuration(Long expectedDuration) {
    this.expectedDuration = expectedDuration;
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

  public LineaVO getLineaChiamato() {
    return lineaChiamato;
  }

  public void setLineaChiamato(LineaVO lineaChiamato) {
    this.lineaChiamato = lineaChiamato;
  }

  public OutboundProxyVO getObpChiamato() {
    return obpChiamato;
  }

  public void setObpChiamato(OutboundProxyVO obpChiamato) {
    this.obpChiamato = obpChiamato;
  }

  public FileSystemVO getFileChiamato() {
    return fileChiamato;
  }

  public void setFileChiamato(FileSystemVO fileChiamato) {
    this.fileChiamato = fileChiamato;
  }

  public List<TestCaseLineaChiamanteVO> getLineeChiamanti() {
    return lineeChiamanti;
  }

  public void setLineeChiamanti(List<TestCaseLineaChiamanteVO> lineeChiamanti) {
    this.lineeChiamanti = lineeChiamanti;
  }

  public TemplateVO getTemplate() {
    return template;
  }

  public void setTemplate(TemplateVO template) {
    this.template = template;
  }

  public GruppoVO getGruppo() {
    return gruppo;
  }

  public void setGruppo(GruppoVO gruppo) {
    this.gruppo = gruppo;
  }

}
