package it.reply.sipp.api.linea.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class OBPAddResponse extends PayloadResponse {

  private static final long serialVersionUID = -8986804422995156539L;
  
  private OutboundProxyDTO proxy;
  
  public OBPAddResponse() {
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
