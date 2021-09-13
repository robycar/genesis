package it.reply.sipp.api.test.payload;

import java.util.List;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class TestGeneratoreListResponse extends PayloadResponse {

  private static final long serialVersionUID = -4705287277812973743L;
  
  private List<TestGeneratoreDTO> list;
  
  public TestGeneratoreListResponse() {
  }

  public List<TestGeneratoreDTO> getList() {
    return list;
  }

  public void setList(List<TestGeneratoreDTO> list) {
    this.list = list;
  }

  
}
