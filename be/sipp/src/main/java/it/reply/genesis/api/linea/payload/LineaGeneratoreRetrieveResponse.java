package it.reply.genesis.api.linea.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class LineaGeneratoreRetrieveResponse extends PayloadResponse {

  private static final long serialVersionUID = -1875786875303537006L;
  
  private LineaGeneratoreDTO linea;
  
  public LineaGeneratoreRetrieveResponse() {
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
