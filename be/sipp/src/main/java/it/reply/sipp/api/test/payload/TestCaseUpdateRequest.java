package it.reply.sipp.api.test.payload;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import it.reply.sipp.api.generic.payload.PayloadRequest;
import it.reply.sipp.model.TestCaseVO;

public class TestCaseUpdateRequest extends PayloadRequest {

  private static final long serialVersionUID = 2835160454554902715L;

  @NotNull
  private Long id;
  
  @Min(0)
  private Long expectedDuration;
  
  @Size(max = TestCaseVO.NOME_LENGTH)
  private String nome;
  
  @Size(max = TestCaseVO.DESCRIZIONE_LENGTH)
  private String descrizione;
  
  @Valid
  private TestCaseLineaDTO chiamato;
  
  @Valid
  @Size(min=0, max = 3)
  private List<TestCaseLineaDTO> chiamanti;
  
  @NotNull
  private Integer version;

  public TestCaseUpdateRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "nome", nome);
    writeField(sb, "version", version);
    writeField(sb, "expectedDuration", expectedDuration);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "chiamato", chiamato);
    writeField(sb, "chiamanti", chiamanti);
    super.writeFields(sb);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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

  public Integer getVersion() {
    return version;
  }

  public void setVersion(Integer version) {
    this.version = version;
  }

  
  
}
