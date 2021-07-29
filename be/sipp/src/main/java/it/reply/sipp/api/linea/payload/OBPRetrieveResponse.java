package it.reply.sipp.api.linea.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class OBPRetrieveResponse extends PayloadResponse {

  private static final long serialVersionUID = -1645703820141246870L;
  
  private OutboundProxyDTO proxy;
  
  public OBPRetrieveResponse() {
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
