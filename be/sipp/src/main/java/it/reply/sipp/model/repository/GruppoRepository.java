package it.reply.sipp.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.sipp.model.GruppoVO;

public interface GruppoRepository extends JpaRepository<GruppoVO, Long> {

	Optional<GruppoVO> findByNome(String nome);

}
