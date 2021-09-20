package it.reply.genesis.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="TEMPLATE_FILE")
public class TemplateFileVO implements Serializable {

  private static final long serialVersionUID = 4234965618736336831L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="ID")
  private Long id;
  
  @ManyToOne(optional = false)
  @JoinColumn(name="TEMPLATE_ID", nullable = false)
  private TemplateVO template;
  
  @ManyToOne(optional = false)
  @JoinColumn(name="FILE_SYSTEM_ID", nullable = false)
  private FileSystemVO file;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private TemplateFileCategory category;
  
  @Column(name="ORDERING", nullable=false)
  private int order;
  
  public TemplateFileVO() {
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

  public TemplateFileCategory getCategory() {
    return category;
  }

  public void setCategory(TemplateFileCategory category) {
    this.category = category;
  }

  public int getOrder() {
    return order;
  }

  public void setOrder(int order) {
    this.order = order;
  }

}
