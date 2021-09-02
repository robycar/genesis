package it.reply.sipp.api.linea.payload;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import it.reply.sipp.api.admin.payload.GruppoDTO;
import it.reply.sipp.api.generic.payload.TrackedDTO;
import it.reply.sipp.model.OutboundProxyVO;

public class OutboundProxyDTO extends TrackedDTO {

  private static final long serialVersionUID = -4051201619704486838L;

  @NotNull
  private Long id;

  @Size(max = OutboundProxyVO.IP_DESTINAZIONE_LENGTH)
  private String ipDestinazione;
  
  @Size(max = OutboundProxyVO.DESCRIZIONE_LENGTH)
  private String descrizione;
  
  private Integer porta;
  
  private GruppoDTO gruppo;
  
  private List<TypeLineaDTO> typeLinee;
  
  public OutboundProxyDTO() {
  }

  public OutboundProxyDTO(@NotNull Long id) {
    this.id = id;
  }

  public OutboundProxyDTO(OutboundProxyVO vo) {
    super(vo);
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
    this.gruppo = vo.getGruppo() == null ? null : new GruppoDTO(vo.getGruppo());
  }
  
  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "ipDestinazione", ipDestinazione);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "porta", porta);
    writeField(sb, "typeLinee", typeLinee);
    writeField(sb, "gruppo", gruppo);
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

  public GruppoDTO getGruppo() {
    return gruppo;
  }

  public void setGruppo(GruppoDTO gruppo) {
    this.gruppo = gruppo;
  }

}
