package it.reply.genesis.api.test.payload;

import java.util.List;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TemplateListResponse extends PayloadResponse {

  private static final long serialVersionUID = 4695828798747662486L;
  
  private List<TemplateDTO> list;
  
  public TemplateListResponse() {
  }

  public List<TemplateDTO> getList() {
    return list;
  }

  public void setList(List<TemplateDTO> list) {
    this.list = list;
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "list", list);
    super.writeFields(sb);
  }

  
}
