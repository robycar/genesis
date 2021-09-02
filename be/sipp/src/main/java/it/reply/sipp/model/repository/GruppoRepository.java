package it.reply.sipp.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import it.reply.sipp.model.GruppoVO;

public interface GruppoRepository extends JpaRepository<GruppoVO, Long> {

	Optional<GruppoVO> findByNome(String nome);

	@Query(value = "SELECT u.gruppo FROM UserVO u WHERE u.username = :username")
	Optional<GruppoVO> findByUsername(String username);
}
