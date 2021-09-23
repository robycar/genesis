package it.reply.genesis.model.repository;

import java.util.List;
import java.util.Optional;

import javax.persistence.LockModeType;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import it.reply.genesis.model.TestCaseCaricatoStato;
import it.reply.genesis.model.TestCaseCaricatoVO;

public interface TestCaseCaricatoRepository extends JpaRepository<TestCaseCaricatoVO, Long>/*, JpaSpecificationExecutor<TestCaseCaricatoVO>*/ {

  List<TestCaseCaricatoVO> findByStato(TestCaseCaricatoStato stato, Sort sort);

  @Lock(LockModeType.PESSIMISTIC_READ)
  @Query("FROM TestCaseCaricatoVO t WHERE t.id = :id")
  Optional<TestCaseCaricatoVO> findByIdLocking(long id);
  
}
