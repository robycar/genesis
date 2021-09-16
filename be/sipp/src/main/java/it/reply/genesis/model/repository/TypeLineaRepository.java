package it.reply.genesis.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.genesis.model.TypeLineaVO;

public interface TypeLineaRepository extends JpaRepository<TypeLineaVO, Long> {

  long countByDescrizione(String descrizione);

  Optional<TypeLineaVO> findByDescrizione(String descrizione);

}
