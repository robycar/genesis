package it.reply.genesis.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.genesis.model.GruppoVO;
import it.reply.genesis.model.OutboundProxyVO;

public interface OBPRepository extends JpaRepository<OutboundProxyVO, Long> {

  long countByGruppo(GruppoVO gruppo);
}
