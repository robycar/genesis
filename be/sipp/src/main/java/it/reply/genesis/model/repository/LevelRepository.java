package it.reply.genesis.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.genesis.model.LevelVO;

public interface LevelRepository extends JpaRepository<LevelVO, Long> {

	Optional<LevelVO> findByNome(String nome);

}
