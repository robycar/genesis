package it.reply.genesis.api.linea.payload;

import java.util.List;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import it.reply.genesis.api.generic.payload.PayloadRequest;
import it.reply.genesis.model.OutboundProxyVO;

public class OBPAddRequest extends PayloadRequest {

  private static final long serialVersionUID = 2410132301001291793L;

  @NotEmpty(message = "Il campo ipDestinazione &egrave; obbligatorio")
  @Size(max = OutboundProxyVO.IP_DESTINAZIONE_LENGTH)
  private String ipDestinazione;
  
  @Size(max = OutboundProxyVO.DESCRIZIONE_LENGTH)
  private String descrizione;

  @Min(value = 1)
  @Max(value = 65535)
  private Integer porta;
  
  private List<TypeLineaDTO> typeLinee;

  public OBPAddRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "ipDestinazione", ipDestinazione);
    writeField(sb, "porta", porta);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "typeLinee", typeLinee);
    
    super.writeFields(sb);
  }



  public String getIpDestinazione() {
    return ipDestinazione;
  }

  public void setIpDestinazione(String ipDestinazione) {
    this.ipDestinazione = ipDestinazione;
  }

  public String getDescrizione() {
    return descrizione;
  }

  public void setDescrizione(String descrizione) {
    this.descrizione = descrizione;
  }

  public Integer getPorta() {
    return porta;
  }

  public void setPorta(Integer porta) {
    this.porta = porta;
  }

  public List<TypeLineaDTO> getTypeLinee() {
    return typeLinee;
  }

  public void setTypeLinee(List<TypeLineaDTO> typeLinee) {
    this.typeLinee = typeLinee;
  }

  
  
}
