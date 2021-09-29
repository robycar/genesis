package it.reply.genesis.api.test.payload;

import java.time.LocalDateTime;

import javax.validation.constraints.NotNull;

import it.reply.genesis.api.generic.payload.PayloadRequest;

public class TestCaseScheduleRequest extends PayloadRequest {

  private static final long serialVersionUID = 7111944573166467888L;

  @NotNull
  private Long id;
  
  @NotNull
  private LocalDateTime scheduleDateTime;

  @NotNull
  private Long delay;
  
  public TestCaseScheduleRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "delay", delay);
    writeField(sb, "scheduledDateTime", scheduleDateTime);
    
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
