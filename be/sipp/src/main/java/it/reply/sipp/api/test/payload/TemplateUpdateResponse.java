package it.reply.sipp.api.test.payload;

import it.reply.sipp.api.generic.payload.PayloadResponse;

public class TemplateUpdateResponse extends PayloadResponse {

  private static final long serialVersionUID = -4668220782689267083L;
  
  private TemplateDTO template;
  
  public TemplateUpdateResponse() {
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
