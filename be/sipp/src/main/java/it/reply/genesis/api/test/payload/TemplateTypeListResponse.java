package it.reply.genesis.api.test.payload;

import java.util.List;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TemplateTypeListResponse extends PayloadResponse {

  private static final long serialVersionUID = 2153378819061597649L;

  private List<String> list;

  public TemplateTypeListResponse() {
  }

  public List<String> getList() {
    return list;
  }

  public void setList(List<String> list) {
    this.list = list;
  }

}
