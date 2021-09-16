package it.reply.genesis.api.test.payload;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import it.reply.genesis.api.admin.payload.GruppoDTO;
import it.reply.genesis.api.generic.payload.TrackedDTO;
import it.reply.genesis.model.TestSuiteVO;

public class TestSuiteDTO extends TrackedDTO {

  private static final long serialVersionUID = 2962591408342724324L;

  @NotNull
  private Long id;

  @Size(max=TestSuiteVO.NOME_LENGTH)
  private String nome;
  
  @Size(max=TestSuiteVO.DESCRIZIONE_LENGTH)
  private String descrizione;
  
  private GruppoDTO gruppo;
  
  private List<TestCaseDTO> testCases;
  
  public TestSuiteDTO() {
  }

  public TestSuiteDTO(@NotNull Long id) {
    this.id = id;
  }

  public TestSuiteDTO(TestSuiteVO vo) {
    this(vo, false);
  }
  
  public TestSuiteDTO(TestSuiteVO vo, boolean includeTestCase) {
    super(vo);
    this.id = vo.getId();
    this.nome = vo.getNome();
    this.descrizione = vo.getDescrizione();
    this.gruppo = new GruppoDTO(vo.getGruppo());
    if (includeTestCase && vo.getTestCases() != null) {
      this.testCases = vo.getTestCases().stream()
          .map(tcvo -> new TestCaseDTO(tcvo))
          .collect(Collectors.toList());
    }
  }

  @Override
  protected void writeFields(StringBuilder sb) {
    writeField(sb, "id", id);
    writeField(sb, "nome", nome);
    writeField(sb, "gruppo", gruppo);
    writeField(sb, "descrizione", descrizione);
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

  public GruppoDTO getGruppo() {
    return gruppo;
  }

  public void setGruppo(GruppoDTO gruppo) {
    this.gruppo = gruppo;
  }

  public List<TestCaseDTO> getTestCases() {
    return testCases;
  }

  public void setTestCases(List<TestCaseDTO> testCases) {
    this.testCases = testCases;
  }

}
