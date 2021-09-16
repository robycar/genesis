package it.reply.genesis.api.linea.payload;

import javax.validation.constraints.Size;

import it.reply.genesis.api.admin.payload.GruppoDTO;
import it.reply.genesis.api.generic.payload.PayloadRequest;
import it.reply.genesis.model.OutboundProxyVO;

public class OBPSearchRequest extends PayloadRequest {

  private static final long serialVersionUID = 8677097619715074359L;

  private Long id;

  @Size(max = OutboundProxyVO.IP_DESTINAZIONE_LENGTH)
  private String ipDestinazione;
  
  @Size(max = OutboundProxyVO.DESCRIZIONE_LENGTH)
  private String descrizione;
  
  private Integer porta;
  
  private GruppoDTO gruppo;
  
  private TypeLineaDTO typeLinea;
  
  public OBPSearchRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "ipDestinazione", ipDestinazione);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "porta", porta);
    writeField(sb, "gruppo", gruppo);
    writeField(sb, "typeLinea", typeLinea);
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

  public GruppoDTO getGruppo() {
    return gruppo;
  }

  public void setGruppo(GruppoDTO gruppo) {
    this.gruppo = gruppo;
  }

  public TypeLineaDTO getTypeLinea() {
    return typeLinea;
  }

  public void setTypeLinea(TypeLineaDTO typeLinea) {
    this.typeLinea = typeLinea;
  }

}
