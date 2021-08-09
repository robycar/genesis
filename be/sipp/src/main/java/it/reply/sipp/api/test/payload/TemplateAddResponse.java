package it.reply.sipp.api.test.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class TemplateAddResponse extends PayloadResponse {

  private static final long serialVersionUID = 8052825625119324895L;

  private TemplateDTO template;
  
  public TemplateAddResponse() {
  }

  public TemplateDTO getTemplate() {
    return template;
  }

  public void setTemplate(TemplateDTO template) {
    this.template = template;
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "template", template);
    super.writeFields(sb);
  }

  
  
}
