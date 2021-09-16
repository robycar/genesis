package it.reply.genesis.api.linea.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class LineaGeneratoreUpdateResponse extends PayloadResponse {

  private static final long serialVersionUID = 3065210679659858017L;
  
  private LineaGeneratoreDTO linea;
  
  public LineaGeneratoreUpdateResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "linea", linea);
    super.writeFields(sb);
  }

  public LineaGeneratoreDTO getLinea() {
    return linea;
  }

  public void setLinea(LineaGeneratoreDTO linea) {
    this.linea = linea;
  }

  
  
}
