package it.reply.sipp.api.linea.payload;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import it.reply.sipp.api.generic.payload.PayloadRequest;
import it.reply.sipp.model.TypeLineaVO;

public class TypeLineaAddRequest extends PayloadRequest {

  private static final long serialVersionUID = 4475619594146373034L;
  
  @Size(max = TypeLineaVO.DESCRIZIONE_LENGTH)
  @NotEmpty(message = "Il campo descrizione &egrave; obbligatorio")
  private String descrizione;

  public TypeLineaAddRequest() {
  }

  public String getDescrizione() {
    return descrizione;
  }

  public void setDescrizione(String descrizione) {
    this.descrizione = descrizione;
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "descrizione", descrizione);
    super.writeFields(sb);
  }
  
  

}
