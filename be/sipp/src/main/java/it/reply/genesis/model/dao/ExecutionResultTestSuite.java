package it.reply.genesis.model.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import it.reply.genesis.model.ExecutionResult;

public class ExecutionResultTestSuite {

  public static final String EXECUTION_RESULT_DEFAULT_COLUMN_NAME = "EXECUTION_RESULT";

  public static final String NUM_DEFAULT_COLUMN_NAME = "NUM";
  
  private ExecutionResult result;
  
  private Long count;
  
  public ExecutionResultTestSuite() {
  }

  public ExecutionResultTestSuite(ExecutionResult result, Long count) {
    this.result = result;
    this.count = count;
  }

  public ExecutionResult getResult() {
    return result;
  }

  public void setResult(ExecutionResult result) {
    this.result = result;
  }

  public Long getCount() {
    return count;
  }

  public void setCount(Long count) {
    this.count = count;
  }

  public static final ExecutionResultTestSuiteRowMapper MAPPER = new ExecutionResultTestSuiteRowMapper();
  
  public static class ExecutionResultTestSuiteRowMapper implements RowMapper<ExecutionResultTestSuite> {

    public ExecutionResultTestSuiteRowMapper() {
      this(EXECUTION_RESULT_DEFAULT_COLUMN_NAME, NUM_DEFAULT_COLUMN_NAME);
    }

    public ExecutionResultTestSuiteRowMapper(String resultColumnName, String countColumnName) {
      this.resultColumnName = resultColumnName;
      this.countColumnName = countColumnName;
    }

    private final String resultColumnName;
    
    private final String countColumnName;
    
    @Override
    public ExecutionResultTestSuite mapRow(ResultSet rs, int rowNum) throws SQLException {
      String result = rs.getString(resultColumnName);
      
      return new ExecutionResultTestSuite(result == null ? null : ExecutionResult.valueOf(result), rs.getLong(countColumnName));
    }
    
  }
}
