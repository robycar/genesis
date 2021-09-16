package it.reply.genesis.model;

import java.util.List;

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
@Table(name="TEMPLATE")
public class TemplateVO extends BaseEntity {

  private static final long serialVersionUID = -2956864279595278259L;

  public static final int NOME_LENGTH = 100;

  public static final int TYPE_TEMPLATE_LENGTH = 25;

  public static final int DESCRIZIONE_LENGTH = 1000;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="ID_TEMPLATE")
  private Long id;
  
  @Column(name="NOME", length = NOME_LENGTH)
  private String nome;
  
  private Long durata;
  
  @Column(name="TYPE_TEMPLATE", length = TYPE_TEMPLATE_LENGTH)
  private String typeTemplate;
  
  @Column(name="DESCRIZIONE", length = DESCRIZIONE_LENGTH)
  private String descrizione;
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="ID_GRUPPO")
  private GruppoVO gruppo;
  
  @OneToMany(mappedBy = "template", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @OrderBy("order")
  private List<TemplateFileVO> files;
  
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

  public String getTypeTemplate() {
    return typeTemplate;
  }

  public void setTypeTemplate(String typeTemplate) {
    this.typeTemplate = typeTemplate;
  }

  public List<TemplateFileVO> getFiles() {
    return files;
  }

  public void setFiles(List<TemplateFileVO> files) {
    this.files = files;
  }

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

}
