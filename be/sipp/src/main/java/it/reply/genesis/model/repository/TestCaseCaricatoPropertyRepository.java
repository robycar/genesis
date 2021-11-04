package it.reply.genesis.model.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.genesis.model.TestCaseCaricatoPropertyVO;
import it.reply.genesis.model.TestCaseCaricatoVO;

public interface TestCaseCaricatoPropertyRepository extends JpaRepository<TestCaseCaricatoPropertyVO, Long> {

  List<TestCaseCaricatoPropertyVO> findByKeyAndTestCaseCaricatoIn(String key, Collection<TestCaseCaricatoVO> listTestCase);
  
}
