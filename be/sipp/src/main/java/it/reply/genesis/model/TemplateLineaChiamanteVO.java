package it.reply.genesis.model;

import java.io.Serializable;

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
@Table(name="TEMPLATE_LINEA_CHIAMANTE")
public class TemplateLineaChiamanteVO implements Serializable {

  private static final long serialVersionUID = 317070439810065269L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="ID")
  private Long id;
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="TEMPLATE_ID")
  private TemplateVO template;
  
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name="FILE_SYSTEM_ID")
  private FileSystemVO file;
  
  @Column(name="NATURA")
  @Enumerated(EnumType.STRING)
  private NaturaLinea natura;

  public TemplateLineaChiamanteVO() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public TemplateVO getTemplate() {
    return template;
  }

  public void setTemplate(TemplateVO template) {
    this.template = template;
  }

  public FileSystemVO getFile() {
    return file;
  }

  public void setFile(FileSystemVO file) {
    this.file = file;
  }

  public NaturaLinea getNatura() {
    return natura;
  }

  public void setNatura(NaturaLinea natura) {
    this.natura = natura;
  }

}
