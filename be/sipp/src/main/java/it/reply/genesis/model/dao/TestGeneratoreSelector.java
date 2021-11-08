package it.reply.genesis.model.dao;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class TestGeneratoreSelector extends AbstractDAO {

  
  private static final Logger logger = LoggerFactory.getLogger(TestGeneratoreSelector.class);

  
  public TestGeneratoreSelector() {
  }

  @Transactional
  public List<TestStatus> testGeneratoreCaricatiExecutionStatus(LocalDate fromDay, LocalDate toDay) {
    String sql = "SELECT STATO, COUNT(*) AS NUM FROM TEST_GENERATORE_CARICATO "
        + "WHERE (SCHEDULE_DATETIME IS NULL AND DATE(CREATED_WHEN) BETWEEN :fromDay AND :toDay) "
        + "OR DATE(SCHEDULE_DATETIME) BETWEEN :fromDay AND :toDay "
        + "GROUP BY STATO";
    
    logger.debug(sql);
    
    MapSqlParameterSource params = new MapSqlParameterSource()
        .addValue("fromDay", fromDay)
        .addValue("toDay", toDay);
    
    return getNamedParameterJdbcTemplate().query(sql, params, TestStatus.MAPPER);
    
  }
  
}
