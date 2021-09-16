package it.reply.genesis.model;

import java.io.Serializable;

public class TemplateFileKeyVO implements Serializable {

  private static final long serialVersionUID = -1425077383296290615L;

  private Long template;

  private Long file;

  private TemplateFileCategory category;
  
  private int order;

  public TemplateFileKeyVO() {
  }

  public TemplateFileKeyVO(Long template, Long file, TemplateFileCategory category, int order) {
    super();
    this.template = template;
    this.file = file;
    this.category = category;
    this.order = order;
  }

  public Long getTemplate() {
    return template;
  }

  public void setTemplate(Long template) {
    this.template = template;
  }

  public Long getFile() {
    return file;
  }

  public void setFile(Long file) {
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
