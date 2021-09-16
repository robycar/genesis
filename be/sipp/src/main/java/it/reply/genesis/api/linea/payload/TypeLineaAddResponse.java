package it.reply.genesis.api.linea.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TypeLineaAddResponse extends PayloadResponse {

  private static final long serialVersionUID = -192788349368194543L;
  
  private TypeLineaDTO typeLinea;
  
  public TypeLineaAddResponse() {
  }

  public TypeLineaDTO getTypeLinea() {
    return typeLinea;
  }

  public void setTypeLinea(TypeLineaDTO typeLinea) {
    this.typeLinea = typeLinea;
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "typeLinea", typeLinea);
    super.writeFields(sb);
  }

  
  
}
