package it.reply.genesis.api.test.payload;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import it.reply.genesis.api.generic.payload.PayloadRequest;
import it.reply.genesis.model.TestCaseVO;

public class TestCaseAddRequest extends PayloadRequest {

  private static final long serialVersionUID = 5759190731394321535L;

  @Min(0)
  private Long expectedDuration;
  
  @NotEmpty
  @Size(max = TestCaseVO.NOME_LENGTH)
  private String nome;
  
  @Size(max = TestCaseVO.DESCRIZIONE_LENGTH)
  private String descrizione;
  
  @NotNull
  @Valid
  private TestCaseLineaDTO chiamato;
  
  @Valid
  @Size(min=0, max = 3)
  private List<TestCaseLineaDTO> chiamanti;

  @NotNull
  private TemplateDTO template;
  
  public TestCaseAddRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "nome", nome);
    writeField(sb, "template", template);
    writeField(sb, "expectedDuration", expectedDuration);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "chiamato", chiamato);
    writeField(sb, "chiamanti", chiamanti);
    super.writeFields(sb);
  }

  public Long getExpectedDuration() {
    return expectedDuration;
  }

  public void setExpectedDuration(Long expectedDuration) {
    this.expectedDuration = expectedDuration;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getDescrizione() {
    return descrizione;
  }

  public void setDescrizione(String descrizione) {
    this.descrizione = descrizione;
  }

  public TestCaseLineaDTO getChiamato() {
    return chiamato;
  }

  public void setChiamato(TestCaseLineaDTO chiamato) {
    this.chiamato = chiamato;
  }

  public List<TestCaseLineaDTO> getChiamanti() {
    return chiamanti;
  }

  public void setChiamanti(List<TestCaseLineaDTO> chiamanti) {
    this.chiamanti = chiamanti;
  }

  public TemplateDTO getTemplate() {
    return template;
  }

  public void setTemplate(TemplateDTO template) {
    this.template = template;
  }

  
}
