package it.reply.sipp.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.sipp.model.GruppoVO;
import it.reply.sipp.model.TestSuiteVO;

public interface TestSuiteRepository extends JpaRepository<TestSuiteVO, Long> {

  long countByGruppo(GruppoVO gruppo);

  long countByNome(String nome);

  Optional<TestSuiteVO> findByNome(String nome);

}
