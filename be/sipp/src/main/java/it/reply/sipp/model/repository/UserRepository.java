package it.reply.sipp.model.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import it.reply.sipp.model.UserVO;

public interface UserRepository extends JpaRepository<UserVO, Long> {

	Optional<UserVO> findByUsername(String username);
	
	Optional<UserVO> findByToken(String token);
	
	@Query(value = "SELECT DISTINCT f.code FROM UserVO u JOIN u.roles r JOIN r.functions f WHERE u.id = :userId")
	Set<String> functionsPerUser(@Param("userId") Long userId);

	@Query(value = "SELECT DISTINCT u FROM UserVO u LEFT JOIN FETCH u.roles ORDER BY u.username")
	List<UserVO> findAllWithRole();
	
	
}
