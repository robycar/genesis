package it.reply.genesis.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.genesis.model.GruppoVO;
import it.reply.genesis.model.TemplateVO;

public interface TemplateRepository extends JpaRepository<TemplateVO, Long> {

  Optional<TemplateVO> findByNome(String nome);
  
  long countByGruppo(GruppoVO gruppo);

}
