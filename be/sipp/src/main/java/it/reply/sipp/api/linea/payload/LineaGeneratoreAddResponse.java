package it.reply.sipp.api.linea.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class LineaGeneratoreAddResponse extends PayloadResponse {

  private static final long serialVersionUID = -1820234583490668524L;
  
  private LineaGeneratoreDTO linea;
  
  public LineaGeneratoreAddResponse() {
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
