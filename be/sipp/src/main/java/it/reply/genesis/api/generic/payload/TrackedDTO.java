package it.reply.genesis.api.generic.payload;

import java.sql.Timestamp;

import it.reply.genesis.model.BaseEntity;

public class TrackedDTO extends DTO {

  private static final long serialVersionUID = -412426178696116095L;

  private Timestamp modifiedDate;
  
  private Timestamp creationDate;
  
  private String modifiedBy;
  
  private String createdBy;
  
  private Integer version;

  public TrackedDTO() {
  }
  
  public TrackedDTO(BaseEntity vo) {
    this.modifiedBy = vo.getModifiedBy();
    this.modifiedDate = vo.getModifiedDate();
    this.createdBy = vo.getCreatedBy();
    this.creationDate = vo.getCreationDate();
    this.version = vo.getVersion();
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "createdBy", createdBy);
    writeField(sb, "modifiedBy", modifiedBy);
    writeField(sb, "creationDate", creationDate);
    writeField(sb, "modifiedDate", modifiedDate);
    writeField(sb, "version", version);
    super.writeFields(sb);
  }

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

  public Integer getVersion() {
    return version;
  }

  public void setVersion(Integer version) {
    this.version = version;
  }

}
