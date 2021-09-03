package it.reply.sipp.model.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import it.reply.sipp.model.GruppoVO;
import it.reply.sipp.model.LineaVO;
import it.reply.sipp.model.TestCaseVO;

public interface TestCaseRepository extends JpaRepository<TestCaseVO, Long> {

  Optional<TestCaseVO> findByNome(String nome);

  long countByGruppo(GruppoVO gruppo);

  @Query(value="SELECT DISTINCT t.id FROM TestCaseVO t WHERE t.lineaChiamato = :linea")
  Set<Long> findIdByLineaChiamato(LineaVO linea);

  @Query(value="SELECT DISTINCT t.id from TestCaseVO t JOIN t.lineeChiamanti lc WHERE lc.linea = :linea")
  Set<Long> findIdByLineaChiamante(LineaVO linea);
}
