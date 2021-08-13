package it.reply.sipp.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.sipp.model.TestCaseLineaChiamanteKey;
import it.reply.sipp.model.TestCaseLineaChiamanteVO;

public interface TestCaseLineaChiamanteRepository
    extends JpaRepository<TestCaseLineaChiamanteVO, TestCaseLineaChiamanteKey> {

}
