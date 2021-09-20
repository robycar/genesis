package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.generic.payload.DTO;

public class PropertyDTO extends DTO {

  private static final long serialVersionUID = -7278745214593648742L;

  private Long id;
  
  private String key;
  
  private String value;
  
  public PropertyDTO() {
  }

  public PropertyDTO(Long id) {
    this.id = id;
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "key", key);
    writeField(sb, "value", value);
    super.writeFields(sb);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getKey() {
    return key;
  }

  public void setKey(String key) {
    this.key = key;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

}
