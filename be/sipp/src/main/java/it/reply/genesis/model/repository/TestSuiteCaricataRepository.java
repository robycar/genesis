package it.reply.genesis.model.repository;

import java.util.Optional;

import javax.persistence.LockModeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import it.reply.genesis.model.TestSuiteCaricataVO;

public interface TestSuiteCaricataRepository extends JpaRepository<TestSuiteCaricataVO, Long> {

  @Lock(LockModeType.PESSIMISTIC_READ)
  @Query("FROM TestSuiteCaricataVO t WHERE t.id = :id")
  Optional<TestSuiteCaricataVO> findByIdLocking(long id);

}
