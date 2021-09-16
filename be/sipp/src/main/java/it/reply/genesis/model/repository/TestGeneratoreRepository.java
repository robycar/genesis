package it.reply.genesis.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import it.reply.genesis.model.LineaGeneratoreVO;
import it.reply.genesis.model.OutboundProxyVO;
import it.reply.genesis.model.TestGeneratoreVO;

public interface TestGeneratoreRepository extends JpaRepository<TestGeneratoreVO, Long> {

  Optional<TestGeneratoreVO> findByNome(String nome);

  long countByLineaChiamanteOrLineaChiamato(LineaGeneratoreVO lineaChiamante, LineaGeneratoreVO lineaChiamato);

  @Query(value = "SELECT t.id FROM TestGeneratoreVO t WHERE t.proxyChiamante = :proxy OR t.proxyChiamato = :proxy")
  List<Long> findIdByProxyChiamanteOrChiamato(OutboundProxyVO proxy);

}
