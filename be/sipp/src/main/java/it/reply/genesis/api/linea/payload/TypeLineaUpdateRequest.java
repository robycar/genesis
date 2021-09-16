package it.reply.genesis.api.linea.payload;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import it.reply.genesis.api.generic.payload.PayloadRequest;
import it.reply.genesis.model.TypeLineaVO;

public class TypeLineaUpdateRequest extends PayloadRequest {

  private static final long serialVersionUID = -3990152646715826638L;

  @NotNull
  private Long id;
  
  @Size(max = TypeLineaVO.DESCRIZIONE_LENGTH)
  private String descrizione;

  @NotNull
  private Integer version;
  
  public TypeLineaUpdateRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "version", version);
    super.writeFields(sb);
  }

  public String getDescrizione() {
    return descrizione;
  }

  public void setDescrizione(String descrizione) {
    this.descrizione = descrizione;
  }

  public Integer getVersion() {
    return version;
  }

  public void setVersion(Integer version) {
    this.version = version;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

}
