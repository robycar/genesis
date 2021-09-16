package it.reply.genesis.api.test.payload;

import it.reply.genesis.api.generic.payload.TrackedDTO;
import it.reply.genesis.model.BaseEntity;

public class TestCaseCaricatoDTO extends TrackedDTO {

  private static final long serialVersionUID = 5319137074629513311L;

  private Long id;
  
  public TestCaseCaricatoDTO() {
  }

  public TestCaseCaricatoDTO(Long id) {
    this.id = id;
  }

  public TestCaseCaricatoDTO(BaseEntity vo) {
    super(vo);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

}
