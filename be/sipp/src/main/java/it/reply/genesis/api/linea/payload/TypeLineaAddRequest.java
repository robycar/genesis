package it.reply.genesis.api.linea.payload;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import it.reply.genesis.api.generic.payload.PayloadRequest;
import it.reply.genesis.model.NaturaLinea;
import it.reply.genesis.model.TypeLineaVO;

public class TypeLineaAddRequest extends PayloadRequest {

  private static final long serialVersionUID = 4475619594146373034L;
  
  @Size(max = TypeLineaVO.DESCRIZIONE_LENGTH)
  @NotEmpty(message = "Il campo descrizione &egrave; obbligatorio")
  private String descrizione;
  
  @NotNull
  private NaturaLinea natura;

  public TypeLineaAddRequest() {
  }

  public String getDescrizione() {
    return descrizione;
  }

  public void setDescrizione(String descrizione) {
    this.descrizione = descrizione;
  }

  public NaturaLinea getNatura() {
    return natura;
  }

  public void setNatura(NaturaLinea natura) {
    this.natura = natura;
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "natura", natura);
    super.writeFields(sb);
  }
  
  

}
