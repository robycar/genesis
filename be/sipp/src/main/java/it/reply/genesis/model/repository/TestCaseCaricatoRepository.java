package it.reply.genesis.model.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.persistence.LockModeType;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import it.reply.genesis.model.ExecutionResult;
import it.reply.genesis.model.LoadedEntityStatus;
import it.reply.genesis.model.TestCaseCaricatoVO;
import it.reply.genesis.model.TestSuiteCaricataVO;

public interface TestCaseCaricatoRepository extends JpaRepository<TestCaseCaricatoVO, Long>/*, JpaSpecificationExecutor<TestCaseCaricatoVO>*/ {

  List<TestCaseCaricatoVO> findByStatoAndTestSuite(LoadedEntityStatus stato, TestSuiteCaricataVO testSuite, Sort sort);

  @Lock(LockModeType.PESSIMISTIC_READ)
  @Query("FROM TestCaseCaricatoVO t WHERE t.id = :id")
  Optional<TestCaseCaricatoVO> findByIdLocking(long id);

  //@Query(value = "SELECT tc.id, tc.stato, tc.result FROM TestCaseCaricatoVO tc WHERE tc.testSuite = :testSuite AND tc.scheduleDateTime IS NULL AND CAST(tc.loadedWhen AS LocalDate) BETWEEN :from AND :to")
  @Query(value = "SELECT tc.ID, tc.STATO, tc.EXECUTION_RESULT FROM TEST_CASE_CARICATO tc WHERE tc.ID_TEST_SUITE_CARICATA IS NULL AND tc.SCHEDULE_DATETIME IS NULL AND DATE(tc.LOADED_WHEN) BETWEEN ?1 AND ?2", nativeQuery = true)
  //List<TestCaseCaricatoVO> findByLoadedWhenBetweenAndTestSuiteIsNullAndScheduleDateIsNull(TestSuiteCaricataVO testSuite, LocalDate from, LocalDate to);
  List<StatoTest> findByLoadedWhenBetweenAndTestSuiteIsNullAndScheduleDateIsNull(LocalDate from, LocalDate to);
  
  @Query(value="SELECT tc.ID, tc.STATO, tc.EXECUTION_RESULT FROM TEST_CASE_CARICATO tc WHERE tc.ID_TEST_SUITE_CARICATA IS NULL AND DATE(SCHEDULE_DATETIME) BETWEEN :from AND :to ", nativeQuery = true)
  List<StatoTest> findScheduledInInterval(LocalDate from, LocalDate to);
  
  public interface StatoTest {
    long getId();
    
    LoadedEntityStatus getStato();
    
    ExecutionResult getResult();
    
  }

}
