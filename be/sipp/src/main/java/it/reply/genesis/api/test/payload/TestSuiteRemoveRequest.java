package it.reply.genesis.api.test.payload;

import javax.validation.constraints.NotNull;

import it.reply.genesis.api.generic.payload.PayloadRequest;

public class TestSuiteRemoveRequest extends PayloadRequest {

  private static final long serialVersionUID = 2506839392568157122L;
  
  @NotNull
  private Long id;
  
  public TestSuiteRemoveRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    super.writeFields(sb);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

}
