package it.reply.sipp.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.sipp.model.GruppoVO;
import it.reply.sipp.model.TemplateVO;

public interface TemplateRepository extends JpaRepository<TemplateVO, Long> {

  Optional<TemplateVO> findByNome(String nome);
  
  long countByGruppo(GruppoVO gruppo);

}
