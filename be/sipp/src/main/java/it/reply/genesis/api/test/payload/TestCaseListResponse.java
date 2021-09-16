package it.reply.genesis.api.test.payload;

import java.util.List;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TestCaseListResponse extends PayloadResponse {

  private static final long serialVersionUID = -7677494573310088431L;

  private List<TestCaseDTO> list;
  
  public TestCaseListResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "list", list);
    super.writeFields(sb);
  }



  public List<TestCaseDTO> getList() {
    return list;
  }

  public void setList(List<TestCaseDTO> list) {
    this.list = list;
  }



}
