package it.reply.genesis.api.linea.payload;

import it.reply.genesis.api.generic.payload.PayloadRequest;

public class OBPListRequest extends PayloadRequest {

  private static final long serialVersionUID = 5163706168321582132L;

  private OutboundProxyDTO proxy;
  
  public OBPListRequest() {
  }

  public OutboundProxyDTO getProxy() {
    return proxy;
  }

  public void setProxy(OutboundProxyDTO proxy) {
    this.proxy = proxy;
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "proxy", proxy);
    super.writeFields(sb);
  }
  
}
