package it.reply.genesis.model;

import java.util.List;

import javax.persistence.CascadeType;
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
import javax.persistence.OneToMany;
import javax.persistence.OrderColumn;
import javax.persistence.Table;

@Entity
@Table(name="TEMPLATE")
public class TemplateVO extends BaseEntity {

  private static final long serialVersionUID = -2956864279595278259L;

  public static final int NOME_LENGTH = 100;

  public static final int DESCRIZIONE_LENGTH = 1000;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="ID_TEMPLATE")
  private Long id;
  
  @Column(name="NOME", length = NOME_LENGTH)
  private String nome;
  
  private Long durata;
  
  @ManyToOne
  @JoinColumn(name="TYPE_TEMPLATE")
  private TipoTemplateVO typeTemplate;
  
  @Column(name="DESCRIZIONE", length = DESCRIZIONE_LENGTH)
  private String descrizione;
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="ID_GRUPPO")
  private GruppoVO gruppo;
  
  @ManyToOne
  @JoinColumn(name="FILE_SYSTEM_ID_CHIAMATO")
  private FileSystemVO fileChiamato;
  
  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY, mappedBy = "template")
  @OrderColumn(name="ORDERING")
  private List<TemplateLineaChiamanteVO> chiamanti;
  
  @Column(name="NATURA_CHIAMATO")
  @Enumerated(EnumType.STRING)
  private NaturaLinea naturaChiamato;
  
//  @OneToMany(mappedBy = "template", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//  @OrderBy("order")
//  private List<TemplateFileVO> files;
  
  public TemplateVO() {
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

  public Long getDurata() {
    return durata;
  }

  public void setDurata(Long durata) {
    this.durata = durata;
  }

  public TipoTemplateVO getTypeTemplate() {
    return typeTemplate;
  }

  public void setTypeTemplate(TipoTemplateVO typeTemplate) {
    this.typeTemplate = typeTemplate;
  }

//  public List<TemplateFileVO> getFiles() {
//    return files;
//  }
//
//  public void setFiles(List<TemplateFileVO> files) {
//    this.files = files;
//  }

  public String getDescrizione() {
    return descrizione;
  }

  public void setDescrizione(String descrizione) {
    this.descrizione = descrizione;
  }

  public GruppoVO getGruppo() {
    return gruppo;
  }

  public void setGruppo(GruppoVO gruppo) {
    this.gruppo = gruppo;
  }

  public FileSystemVO getFileChiamato() {
    return fileChiamato;
  }

  public void setFileChiamato(FileSystemVO fileChiamato) {
    this.fileChiamato = fileChiamato;
  }

  public List<TemplateLineaChiamanteVO> getChiamanti() {
    return chiamanti;
  }

  public void setChiamanti(List<TemplateLineaChiamanteVO> chiamanti) {
    this.chiamanti = chiamanti;
  }

  public NaturaLinea getNaturaChiamato() {
    return naturaChiamato;
  }

  public void setNaturaChiamato(NaturaLinea naturaChiamato) {
    this.naturaChiamato = naturaChiamato;
  }

}
