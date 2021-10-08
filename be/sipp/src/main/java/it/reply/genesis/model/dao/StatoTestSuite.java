package it.reply.genesis.model.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import it.reply.genesis.model.LoadedEntityStatus;

public class StatoTestSuite  {

  private LoadedEntityStatus stato;
  
  private long count;
  
  public StatoTestSuite() {
  }
  
  public StatoTestSuite(LoadedEntityStatus stato, long count) {
    this.stato = stato;
    this.count = count;
  }

  public LoadedEntityStatus getStato() {
    return stato;
  }

  public void setStato(LoadedEntityStatus stato) {
    this.stato = stato;
  }

  public long getCount() {
    return count;
  }

  public void setCount(long count) {
    this.count = count;
  }

  public static final StatoTestSuiteRowMapper MAPPER = new StatoTestSuiteRowMapper();
  
  public static class StatoTestSuiteRowMapper implements RowMapper<StatoTestSuite> {
    @Override
    public StatoTestSuite mapRow(ResultSet rs, int rowNum) throws SQLException {
      return new StatoTestSuite(LoadedEntityStatus.valueOf(rs.getString("STATO")), rs.getLong("NUM"));
    }
    
  }
  

  
}
