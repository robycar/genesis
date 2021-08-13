package it.reply.sipp.api.linea.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class LineaRetrieveResponse extends PayloadResponse {

  private static final long serialVersionUID = -8709859144444352329L;
  
  private LineaDTO linea;
  
  public LineaRetrieveResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "linea", linea);
    super.writeFields(sb);
  }

  public LineaDTO getLinea() {
    return linea;
  }

  public void setLinea(LineaDTO linea) {
    this.linea = linea;
  }

}
