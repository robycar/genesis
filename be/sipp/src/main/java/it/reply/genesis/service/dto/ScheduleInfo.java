package it.reply.genesis.service.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

public class ScheduleInfo implements Serializable {

  private static final long serialVersionUID = 1406668126413761832L;

  private LocalDateTime scheduleDateTime;
  
  private long delay;
  
  public ScheduleInfo() {
  }

  public ScheduleInfo(LocalDateTime scheduleDateTime, long delay) {
    this.scheduleDateTime = scheduleDateTime;
    this.delay = delay;
  }

  public LocalDateTime getScheduleDateTime() {
    return scheduleDateTime;
  }

  public void setScheduleDateTime(LocalDateTime scheduleDateTime) {
    this.scheduleDateTime = scheduleDateTime;
  }

  public long getDelay() {
    return delay;
  }

  public void setDelay(long delay) {
    this.delay = delay;
  }

  @Override
  public String toString() {
    StringBuilder builder = new StringBuilder();
    builder.append("ScheduleInfo [scheduleDateTime=");
    builder.append(scheduleDateTime);
    builder.append(", delay=");
    builder.append(delay);
    builder.append("]");
    return builder.toString();
  }

  
}
