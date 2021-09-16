package it.reply.genesis.api.test.payload;

import java.util.List;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TestSuiteListResponse extends PayloadResponse {

  private static final long serialVersionUID = -1363680176942612212L;
  
  private List<TestSuiteDTO> list;
  
  public TestSuiteListResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "list", list);
    super.writeFields(sb);
  }

  public List<TestSuiteDTO> getList() {
    return list;
  }

  public void setList(List<TestSuiteDTO> list) {
    this.list = list;
  }

}
