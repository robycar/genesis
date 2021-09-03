package it.reply.sipp.service.dto;

import java.util.List;

import it.reply.sipp.api.generic.payload.ConnectionDTO;
import it.reply.sipp.api.linea.payload.LineaDTO;

public class LineaReadLineaResponse extends ServiceResponse {

  private static final long serialVersionUID = 8388718500625563947L;

  private LineaDTO linea;
  
  private List<ConnectionDTO> connections;
  
  public LineaReadLineaResponse() {
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
