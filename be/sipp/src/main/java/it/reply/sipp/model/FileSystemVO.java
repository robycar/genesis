package it.reply.sipp.model;

import java.sql.Blob;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name="FILE_SYSTEM")
public class FileSystemVO extends BaseEntity {

  private static final long serialVersionUID = 1259347211079936509L;

  private static final int PATH_LENGTH = 255;

  private static final int CONTENT_TYPE_LENGTH = 255;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name="SCOPE")
  @Enumerated(EnumType.STRING)
  private FileSystemScope scope;
  
  @Column(name="ID_REF")
  private Long idRef;
  
  @Column(name="PATH", length = PATH_LENGTH)
  private String path;
  
  @Column(name="CONTENT_TYPE", length = CONTENT_TYPE_LENGTH)
  private String contentType;
  
  @Lob
  @Basic(fetch = FetchType.LAZY)
  private Blob content;
  
  public FileSystemVO() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public FileSystemScope getScope() {
    return scope;
  }

  public void setScope(FileSystemScope scope) {
    this.scope = scope;
  }

  public Long getIdRef() {
    return idRef;
  }

  public void setIdRef(Long idRef) {
    this.idRef = idRef;
  }

  public String getPath() {
    return path;
  }

  public void setPath(String path) {
    this.path = path;
  }

  public Blob getContent() {
    return content;
  }

  public void setContent(Blob content) {
    this.content = content;
  }

  public String getContentType() {
    return contentType;
  }

  public void setContentType(String contentType) {
    this.contentType = contentType;
  }

  
}
