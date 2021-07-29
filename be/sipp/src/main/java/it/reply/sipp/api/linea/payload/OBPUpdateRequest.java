package it.reply.sipp.api.linea.payload;

import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import it.reply.sipp.api.generic.payload.PayloadRequest;
import it.reply.sipp.model.OutboundProxyVO;

public class OBPUpdateRequest extends PayloadRequest {

  private static final long serialVersionUID = 5822449277097896317L;

  @NotNull(message = "Il campo id &egrave; obbligatorio")
  private Long id;
  
  @Size(max = OutboundProxyVO.IP_DESTINAZIONE_LENGTH)
  private String ipDestinazione;
  
  @Size(max = OutboundProxyVO.DESCRIZIONE_LENGTH)
  private String descrizione;
  
  private Integer porta;
  
  private List<TypeLineaDTO> typeLinee;


  public OBPUpdateRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "ipDestinazione", ipDestinazione);
    writeField(sb, "porta", porta);
    writeField(sb, "descrizione", descrizione);
    
    super.writeFields(sb);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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
