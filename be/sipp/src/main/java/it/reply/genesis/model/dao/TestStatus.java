package it.reply.genesis.model.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import it.reply.genesis.model.LoadedEntityStatus;

public class TestStatus  {

  private LoadedEntityStatus stato;
  
  private long count;
  
  public TestStatus() {
  }
  
  public TestStatus(LoadedEntityStatus stato, long count) {
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
  
  public static class StatoTestSuiteRowMapper implements RowMapper<TestStatus> {
    @Override
    public TestStatus mapRow(ResultSet rs, int rowNum) throws SQLException {
      return new TestStatus(LoadedEntityStatus.valueOf(rs.getString("STATO")), rs.getLong("NUM"));
    }
    
  }
  

  
}
