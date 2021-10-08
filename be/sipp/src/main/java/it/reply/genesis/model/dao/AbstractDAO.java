package it.reply.genesis.model.dao;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

public abstract class AbstractDAO implements InitializingBean {

  @Autowired
  private JdbcTemplate jdbcTemplate
  ;
  private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

  public JdbcTemplate getJdbcTemplate() {
    return jdbcTemplate;
  }

  public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public void afterPropertiesSet() throws Exception {
    this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(this.jdbcTemplate);
  }

  public NamedParameterJdbcTemplate getNamedParameterJdbcTemplate() {
    return namedParameterJdbcTemplate;
  }
  
  
  
  
}
