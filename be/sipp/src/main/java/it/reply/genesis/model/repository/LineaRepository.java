package it.reply.genesis.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.genesis.model.GruppoVO;
import it.reply.genesis.model.LineaVO;
import it.reply.genesis.model.TypeLineaVO;

public interface LineaRepository extends JpaRepository<LineaVO, Long> {

	Optional<LineaVO> findByNumeroAndTypeLinea(String numero, TypeLineaVO typeLineaVO);

  long countByTypeLinea(TypeLineaVO typeLinea);
  
  long countByGruppo(GruppoVO gruppo);

}
