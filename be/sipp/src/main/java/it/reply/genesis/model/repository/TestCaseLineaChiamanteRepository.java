package it.reply.genesis.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.genesis.model.TestCaseLineaChiamanteKey;
import it.reply.genesis.model.TestCaseLineaChiamanteVO;

public interface TestCaseLineaChiamanteRepository
    extends JpaRepository<TestCaseLineaChiamanteVO, TestCaseLineaChiamanteKey> {

}
