package it.reply.sipp.api.linea.payload;

import java.util.List;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class OBPListResponse extends PayloadResponse {

  private static final long serialVersionUID = 8740544815559623986L;

  private List<OutboundProxyDTO> list;
  
  public OBPListResponse() {
  }

  public List<OutboundProxyDTO> getList() {
    return list;
  }

  public void setList(List<OutboundProxyDTO> list) {
    this.list = list;
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "list", list);
    super.writeFields(sb);
  }
  
}
