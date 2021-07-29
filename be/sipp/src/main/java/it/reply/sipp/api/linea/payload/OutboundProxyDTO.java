package it.reply.sipp.api.linea.payload;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import it.reply.sipp.api.generic.payload.DTO;
import it.reply.sipp.model.OutboundProxyVO;

public class OutboundProxyDTO extends DTO {

  private static final long serialVersionUID = -4051201619704486838L;

  @NotNull
  private Long id;

  @Size(max = OutboundProxyVO.IP_DESTINAZIONE_LENGTH)
  private String ipDestinazione;
  
  @Size(max = OutboundProxyVO.DESCRIZIONE_LENGTH)
  private String descrizione;
  
  private Integer porta;
  
  private List<TypeLineaDTO> typeLinee;
  
  public OutboundProxyDTO() {
  }

  public OutboundProxyDTO(OutboundProxyVO vo) {
    this.descrizione = vo.getDescrizione();
    this.id = vo.getId();
    this.ipDestinazione = vo.getIpDestinazione();
    this.porta = vo.getPorta();
    if (vo.getTypeLinee() != null) {
      this.typeLinee = vo.getTypeLinee()
          .stream()
          .map(typeLineaVO -> new TypeLineaDTO(typeLineaVO))
          .collect(Collectors.toList());
     }
  }
  
  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "ipDestinazione", ipDestinazione);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "porta", porta);
    writeField(sb, "typeLinee", typeLinee);
    
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
