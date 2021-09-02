package it.reply.sipp.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.sipp.model.GruppoVO;
import it.reply.sipp.model.OutboundProxyVO;

public interface OBPRepository extends JpaRepository<OutboundProxyVO, Long> {

  long countByGruppo(GruppoVO gruppo);
}
