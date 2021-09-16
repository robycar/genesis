package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.generic.payload.PayloadResponse;

public class TemplateRetrieveResponse extends PayloadResponse {

  private static final long serialVersionUID = 3755121423784812089L;
  
  private TemplateDTO template;
  
  public TemplateRetrieveResponse() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "template", template);
    super.writeFields(sb);
  }

  public TemplateDTO getTemplate() {
    return template;
  }

  public void setTemplate(TemplateDTO template) {
    this.template = template;
  }

  
}
