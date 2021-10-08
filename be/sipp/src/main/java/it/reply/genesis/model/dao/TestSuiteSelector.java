package it.reply.genesis.model.dao;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class TestSuiteSelector extends AbstractDAO {

  private static final Logger logger = LoggerFactory.getLogger(TestSuiteSelector.class);

  public TestSuiteSelector() {
    
  }

  @Transactional
  public List<StatoTestSuite> testSuiteCaricataExecutionStatus(LocalDate fromDay, LocalDate toDay) {
    MapSqlParameterSource params = new MapSqlParameterSource()
        .addValue("fromDay", fromDay)
        .addValue("toDay", toDay);
    
    String sql = "SELECT STATO, COUNT(*) AS NUM FROM TEST_SUITE_CARICATA "
        + " WHERE "
        + " (SCHEDULE_DATETIME IS NULL AND DATE(LOADED_WHEN) BETWEEN :fromDay AND :toDay) "
        + " OR SCHEDULE_DATETIME BETWEEN :fromDay AND :toDay"
        + " GROUP BY STATO";
    
    logger.debug(sql);
    
    return getNamedParameterJdbcTemplate().query(sql, params, StatoTestSuite.MAPPER);
    
  }
  
  @Transactional
  public List<ExecutionResultTestSuite> retrieveTestStatusByTestSuiteCaricate(LocalDate fromDay, LocalDate toDay) {
    MapSqlParameterSource params = new MapSqlParameterSource()
        .addValue("fromDay", fromDay)
        .addValue("toDay", toDay);
    
    final String sql = "SELECT EXECUTION_RESULT, COUNT(*) AS NUM FROM TEST_CASE_CARICATO "
        + "WHERE ID_TEST_SUITE_CARICATA IN ( "
        + "  SELECT ID FROM TEST_SUITE_CARICATA "
        + "  WHERE (SCHEDULE_DATETIME IS NULL AND DATE(LOADED_WHEN) BETWEEN :fromDay AND :toDay) "
        + "    OR DATE(SCHEDULE_DATETIME) BETWEEN :fromDay AND :toDay "
        + " )"
        + " GROUP BY(EXECUTION_RESULT)";
    
    return getNamedParameterJdbcTemplate().query(sql, params, ExecutionResultTestSuite.MAPPER);
    
  }
  
}
