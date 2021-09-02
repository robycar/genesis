package it.reply.sipp.api.linea.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class TypeLineaRetrieveResponse extends PayloadResponse {

  private static final long serialVersionUID = 8581153181159420321L;
  
  private TypeLineaDTO typeLinea;
  
  public TypeLineaRetrieveResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "typeLinea", typeLinea);
    super.writeFields(sb);
  }

  public TypeLineaDTO getTypeLinea() {
    return typeLinea;
  }

  public void setTypeLinea(TypeLineaDTO typeLinea) {
    this.typeLinea = typeLinea;
  }

  
}
