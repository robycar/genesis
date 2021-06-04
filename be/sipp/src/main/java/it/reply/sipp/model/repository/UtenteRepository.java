package it.reply.sipp.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.sipp.model.Utente;

public interface UtenteRepository extends JpaRepository<Utente, Long> {

	Optional<Utente> findByUsername(String username);
	
	Optional<Utente> findByToken(String token);
	
}
