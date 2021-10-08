package it.reply.genesis.api.dashboard.payload;

import it.reply.genesis.api.generic.payload.DTO;

public class RiepilogoNumericoTestDTO extends DTO {

  private static final long serialVersionUID = -1280690439885379052L;

  private long caricati;
  
  private long schedulati;
  
  //private long completati;
  
  private long completatiOK;
  
  private long completatiKO;
  
  public RiepilogoNumericoTestDTO() {
  }
  
  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "caricati", caricati);
    writeField(sb, "schedulati", schedulati);
    writeField(sb, "completatiKO", completatiKO);
    writeField(sb, "completatiOK", completatiOK);
    
    super.writeFields(sb);
  }


  public long getCompletati() {
    return completatiOK + completatiKO;
  }
  
  public long getPianificati() {
    return caricati + schedulati;
  }
  
  public float getPercentualeCompletati() {
    long pianificati = getPianificati();
    if (pianificati == 0) {
      return 0.0F;
    }
    return ((float)(getCompletati() * 100)) / (pianificati) ;
  }
  
  public float getPercentualeSuccesso() {
    long completati = getCompletati();
    if (completati == 0) {
      return 0.0F;
    }
    
    return ((float)(completatiOK*100)) / completati;
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

  public long getCompletatiOK() {
    return completatiOK;
  }

  public void setCompletatiOK(long completatiOK) {
    this.completatiOK = completatiOK;
  }

  public long getCompletatiKO() {
    return completatiKO;
  }

  public void setCompletatiKO(long completatiKO) {
    this.completatiKO = completatiKO;
  }

}
