package it.reply.genesis.api.linea.payload;

import java.util.List;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class OBPSearchResponse extends PayloadResponse {

  private static final long serialVersionUID = -5017304208933475213L;
  
  private List<OutboundProxyDTO> list;
  
  public OBPSearchResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "list", list);
    super.writeFields(sb);
  }

  public List<OutboundProxyDTO> getList() {
    return list;
  }

  public void setList(List<OutboundProxyDTO> list) {
    this.list = list;
  }

  
}
