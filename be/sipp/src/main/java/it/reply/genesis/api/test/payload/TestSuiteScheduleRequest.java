package it.reply.genesis.api.test.payload;

import java.time.LocalDateTime;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import it.reply.genesis.api.generic.payload.PayloadRequest;

public class TestSuiteScheduleRequest extends PayloadRequest {

  private static final long serialVersionUID = 1669528140183299785L;

  @NotNull
  private Long id;
  
  @NotNull
  @FutureOrPresent
  private LocalDateTime scheduleDateTime;

  @NotNull
  @Positive
  private Long delay;
  
  public TestSuiteScheduleRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
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
