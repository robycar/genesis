package it.reply.genesis.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.genesis.model.LineaGeneratoreVO;
import it.reply.genesis.model.TestGeneratoreVO;

public interface TestGeneratoreRepository extends JpaRepository<TestGeneratoreVO, Long> {

  Optional<TestGeneratoreVO> findByNome(String nome);

  long countByLineaChiamanteOrLineaChiamato(LineaGeneratoreVO lineaChiamante, LineaGeneratoreVO lineaChiamato);

}
