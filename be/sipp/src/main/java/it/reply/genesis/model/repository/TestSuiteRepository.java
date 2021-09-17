package it.reply.genesis.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import it.reply.genesis.model.GruppoVO;
import it.reply.genesis.model.TestSuiteVO;

public interface TestSuiteRepository extends JpaRepository<TestSuiteVO, Long> {

  long countByGruppo(GruppoVO gruppo);

  long countByNome(String nome);
  
  @Query(value="SELECT size(t.testCases) FROM TestSuiteVO t WHERE t = :testSuite")
  long sizeOfChildren(TestSuiteVO testSuite);

  Optional<TestSuiteVO> findByNome(String nome);

}
