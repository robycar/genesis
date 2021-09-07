package it.reply.sipp.api.test.payload;

import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import it.reply.sipp.api.generic.payload.PayloadRequest;
import it.reply.sipp.model.TestSuiteVO;

public class TestSuiteUpdateRequest extends PayloadRequest {

  private static final long serialVersionUID = 1721748988812553958L;

  @NotNull
  private Long id;
  
  @Size(max=TestSuiteVO.NOME_LENGTH)
  private String nome;
  
  @Size(max=TestSuiteVO.DESCRIZIONE_LENGTH)
  private String descrizione;
  
  private Integer version;
  
  private List<TestCaseDTO> testCases;

  public TestSuiteUpdateRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "nome", nome);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "version", version);
    writeField(sb, "testCases", testCases);
    super.writeFields(sb);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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

  public List<TestCaseDTO> getTestCases() {
    return testCases;
  }

  public void setTestCases(List<TestCaseDTO> testCases) {
    this.testCases = testCases;
  }

  public Integer getVersion() {
    return version;
  }

  public void setVersion(Integer version) {
    this.version = version;
  }
  
}
