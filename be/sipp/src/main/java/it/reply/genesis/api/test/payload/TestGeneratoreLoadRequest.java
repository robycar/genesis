package it.reply.genesis.api.test.payload;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import it.reply.genesis.api.generic.payload.PayloadRequest;

public class TestGeneratoreLoadRequest extends PayloadRequest {

  private static final long serialVersionUID = 7122040945197205762L;

  @NotNull
  private Long id;

  @NotNull
  @Positive
  private Long rate;
  
  @NotNull
  @Positive
  private Long durataTraffico;
  
  public TestGeneratoreLoadRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "rate", rate);
    writeField(sb, "durataTraffico", durataTraffico);
    super.writeFields(sb);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getRate() {
    return rate;
  }

  public void setRate(Long rate) {
    this.rate = rate;
  }

  public Long getDurataTraffico() {
    return durataTraffico;
  }

  public void setDurataTraffico(Long durataTraffico) {
    this.durataTraffico = durataTraffico;
  }
  
}
