package it.reply.genesis.model.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import it.reply.genesis.model.GruppoVO;
import it.reply.genesis.model.LevelVO;
import it.reply.genesis.model.UserVO;

public interface UserRepository extends JpaRepository<UserVO, Long> {

	Optional<UserVO> findByUsername(String username);
	
	//@Query(value = "SELECT DISTINCT f.codice FROM UserVO u JOIN u.funzioni f WHERE u.id = :userId")
	@Query(value ="SELECT DISTINCT f.codice FROM FunzioneVO f WHERE f.codice IN( SELECT f2.codice FROM UserVO u JOIN u.funzioni f2 WHERE u.id = :userId) OR f.codice IN (SELECT f3.codice FROM UserVO u JOIN u.level.funzioni f3 WHERE u.id = :userId)")
	Set<String> functionsPerUser(@Param("userId") Long userId);

	long countByLevel(LevelVO level);

	long countByGruppo(GruppoVO gruppo);

  Optional<UserVO> findByEmail(String email);
}
