package it.reply.sipp.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.sipp.model.TestCaseVO;

public interface TestCaseRepository extends JpaRepository<TestCaseVO, Long> {

  Optional<TestCaseVO> findByNome(String nome);

}
