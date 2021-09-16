package it.reply.genesis.api.test.payload;

import java.util.List;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TemplateSearchResponse extends PayloadResponse {

  private static final long serialVersionUID = -4987888894377153845L;
  
  private List<TemplateDTO> list;
  
  public TemplateSearchResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "list", list);
    super.writeFields(sb);
  }

  public List<TemplateDTO> getList() {
    return list;
  }

  public void setList(List<TemplateDTO> list) {
    this.list = list;
  }

}
