package it.reply.sipp.api.test.payload;

import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import it.reply.sipp.api.generic.payload.PayloadRequest;
import it.reply.sipp.model.TestSuiteVO;

public class TestSuiteAddRequest extends PayloadRequest {

  private static final long serialVersionUID = 7644901215142052230L;

  @NotEmpty
  @Size(max=TestSuiteVO.NOME_LENGTH)
  private String nome;
  
  @Size(max=TestSuiteVO.DESCRIZIONE_LENGTH)
  private String descrizione;
  
  private List<TestCaseDTO> testCases;
  
  public TestSuiteAddRequest() {
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "nome", nome);
    writeField(sb, "descrizione", descrizione);
    writeField(sb, "testCases", testCases);
    
    super.writeFields(sb);
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

}
