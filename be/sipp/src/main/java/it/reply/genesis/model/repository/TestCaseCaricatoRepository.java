package it.reply.genesis.model.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.genesis.model.TestCaseCaricatoStato;
import it.reply.genesis.model.TestCaseCaricatoVO;

public interface TestCaseCaricatoRepository extends JpaRepository<TestCaseCaricatoVO, Long>/*, JpaSpecificationExecutor<TestCaseCaricatoVO>*/ {

  List<TestCaseCaricatoVO> findByStato(TestCaseCaricatoStato stato, Sort sort);

}
