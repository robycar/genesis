package it.reply.sipp.api.linea.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class TypeLineaUpdateResponse extends PayloadResponse {

  private static final long serialVersionUID = 6291681258129572828L;
  
  private TypeLineaDTO typeLinea;
  
  public TypeLineaUpdateResponse() {
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
