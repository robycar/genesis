package it.reply.genesis.api.test.payload;

import java.time.LocalDateTime;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import it.reply.genesis.api.generic.payload.PayloadRequest;

public class TestGeneratoreScheduleRequest extends PayloadRequest {

  private static final long serialVersionUID = -7392831996723573672L;

  @NotNull
  private Long id;

  @NotNull
  @Positive
  private Long rate;
  
  @NotNull
  @Positive
  private Long durataTraffico;

  @NotNull
  @FutureOrPresent
  private LocalDateTime scheduleDateTime;

  @NotNull
  @Positive
  private Long delay;

  public TestGeneratoreScheduleRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "rate", rate);
    writeField(sb, "durataTraffico", durataTraffico);
    writeField(sb, "scheduleDateTime", scheduleDateTime);
    writeField(sb, "delay", delay);
    
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

  public LocalDateTime getScheduleDateTime() {
    return scheduleDateTime;
  }

  public void setScheduleDateTime(LocalDateTime scheduleDateTime) {
    this.scheduleDateTime = scheduleDateTime;
  }

  public Long getDelay() {
    return delay;
  }

  public void setDelay(Long delay) {
    this.delay = delay;
  }

}
