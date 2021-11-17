package it.reply.genesis.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="TIPO_TEMPLATE")
public class TipoTemplateVO implements Serializable {

  private static final long serialVersionUID = 5745259268073354838L;
  
  public static final int NOME_LENGTH = 40;

  public TipoTemplateVO() {
  }
  
  @Id
  @Column(name="NOME", length = NOME_LENGTH)
  private String nome;

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }
  
  
}
