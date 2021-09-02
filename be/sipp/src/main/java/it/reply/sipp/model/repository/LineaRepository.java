package it.reply.sipp.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.sipp.model.LineaVO;
import it.reply.sipp.model.TypeLineaVO;

public interface LineaRepository extends JpaRepository<LineaVO, Long> {

	Optional<LineaVO> findByNumeroAndTypeLinea(String numero, TypeLineaVO typeLineaVO);

  long countByTypeLinea(TypeLineaVO typeLinea);

}
