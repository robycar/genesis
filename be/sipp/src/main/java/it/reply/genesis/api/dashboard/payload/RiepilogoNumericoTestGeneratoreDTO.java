package it.reply.genesis.api.dashboard.payload;

import it.reply.genesis.api.generic.payload.DTO;

public class RiepilogoNumericoTestGeneratoreDTO extends DTO {

  private static final long serialVersionUID = -4803044726985778436L;

  private long caricati;
  
  private long schedulati;
  
  private long completati;
  
  public RiepilogoNumericoTestGeneratoreDTO() {
  }

  public long getPianificati() {
    return caricati + schedulati;
  }
  
  public long getCaricati() {
    return caricati;
  }

  public void setCaricati(long caricati) {
    this.caricati = caricati;
  }

  public long getSchedulati() {
    return schedulati;
  }

  public void setSchedulati(long schedulati) {
    this.schedulati = schedulati;
  }

  public long getCompletati() {
    return completati;
  }

  public void setCompletati(long completati) {
    this.completati = completati;
  }

  
}
