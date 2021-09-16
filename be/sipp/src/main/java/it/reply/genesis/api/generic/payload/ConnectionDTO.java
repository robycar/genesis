package it.reply.genesis.api.generic.payload;

import java.util.Collections;
import java.util.List;

public class ConnectionDTO extends DTO {

  private static final long serialVersionUID = -1905825965827370204L;

  private String type;
  
  private List<Long> items;
  
  public ConnectionDTO() {
    this(null, null);
  }

  public ConnectionDTO(String type, List<Long> items) {
    this.type = type;
    setItems(items);
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "type", type);
    writeField(sb, "items", items);
    super.writeFields(sb);
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public List<Long> getItems() {
    return items;
  }

  public void setItems(List<Long> items) {
    this.items = items == null ? Collections.emptyList() : items;
  }

  public int getCount() {
    return this.items == null ? 0 : this.items.size();
  }
}
