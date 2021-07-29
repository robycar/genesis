package it.reply.sipp.api.linea.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class OBPUpdateResponse extends PayloadResponse {

  private static final long serialVersionUID = -3990553197285012810L;
  
  private OutboundProxyDTO proxy;
  
  public OBPUpdateResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "proxy", proxy);
    super.writeFields(sb);
  }

  public OutboundProxyDTO getProxy() {
    return proxy;
  }

  public void setProxy(OutboundProxyDTO proxy) {
    this.proxy = proxy;
  }

  
}
