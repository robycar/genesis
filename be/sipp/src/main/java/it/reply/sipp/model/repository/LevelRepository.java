package it.reply.sipp.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.sipp.model.LevelVO;

public interface LevelRepository extends JpaRepository<LevelVO, Long> {

	Optional<LevelVO> findByNome(String nome);

}
