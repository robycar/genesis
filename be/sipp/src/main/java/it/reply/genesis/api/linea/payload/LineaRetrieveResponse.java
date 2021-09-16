package it.reply.genesis.api.linea.payload;

import java.util.List;

import it.reply.genesis.api.generic.payload.ConnectionDTO;
import it.reply.genesis.api.generic.payload.PayloadResponse;

public class LineaRetrieveResponse extends PayloadResponse {

  private static final long serialVersionUID = -8709859144444352329L;
  
  private LineaDTO linea;
  
  private List<ConnectionDTO> connections;
  
  public LineaRetrieveResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "linea", linea);
    writeField(sb, "connections", connections);
    super.writeFields(sb);
  }

  public LineaDTO getLinea() {
    return linea;
  }

  public void setLinea(LineaDTO linea) {
    this.linea = linea;
  }

  public List<ConnectionDTO> getConnections() {
    return connections;
  }

  public void setConnections(List<ConnectionDTO> connections) {
    this.connections = connections;
  }

}
