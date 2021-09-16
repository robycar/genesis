package it.reply.genesis.api.linea.payload;

import java.util.List;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class LineaGeneratoreListResponse extends PayloadResponse {

  private static final long serialVersionUID = 5825247747235286691L;
  
  private List<LineaGeneratoreDTO> list;
  
  public LineaGeneratoreListResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "list", list);
    super.writeFields(sb);
  }

  public List<LineaGeneratoreDTO> getList() {
    return list;
  }

  public void setList(List<LineaGeneratoreDTO> list) {
    this.list = list;
  }

}
