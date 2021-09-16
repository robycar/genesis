package it.reply.genesis.model;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Version;

import org.hibernate.annotations.UpdateTimestamp;

@MappedSuperclass
public class BaseEntity implements Serializable {

  private static final long serialVersionUID = 5847125137323264504L;

  public static final int MODIFIED_BY_LENGTH = UserVO.USERNAME_LENGTH;
  
  public static final int CREATED_BY_LENGTH = UserVO.USERNAME_LENGTH;
  
  @Column(name="MODIFIED_WHEN")
  @UpdateTimestamp
  private Timestamp modifiedDate;
  
  @Column(name="CREATED_WHEN")
  private Timestamp creationDate;
  
  @Column(name="MODIFIED_BY", length = MODIFIED_BY_LENGTH)
  private String modifiedBy;
  
  @Column(name="CREATED_BY", length = CREATED_BY_LENGTH)
  private String createdBy;
  
  @Version
  private int version;

  public Timestamp getModifiedDate() {
    return modifiedDate;
  }

  public void setModifiedDate(Timestamp modifiedDate) {
    this.modifiedDate = modifiedDate;
  }

  public Timestamp getCreationDate() {
    return creationDate;
  }

  public void setCreationDate(Timestamp creationDate) {
    this.creationDate = creationDate;
  }

  public String getModifiedBy() {
    return modifiedBy;
  }

  public void setModifiedBy(String modifiedBy) {
    this.modifiedBy = modifiedBy;
  }

  public String getCreatedBy() {
    return createdBy;
  }

  public void setCreatedBy(String createdBy) {
    this.createdBy = createdBy;
  }
  
  public int getVersion() {
    return version;
  }

  public void setVersion(int version) {
    this.version = version;
  }

  public void init(String creator) {
    this.createdBy = this.modifiedBy = creator;
    this.creationDate = this.modifiedDate = new Timestamp(System.currentTimeMillis());
  }
  
  public void modifiedBy(String editor) {
    this.modifiedBy = editor;
    //this.modifiedDate = new Timestamp(System.currentTimeMillis());
  }
}
