package it.reply.sipp.api.test.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class TemplateCreateFullResponse extends PayloadResponse {

  private static final long serialVersionUID = -4475910803798412534L;

  private TemplateDTO template;

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
