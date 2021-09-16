package it.reply.genesis.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.genesis.model.TemplateFileVO;
import it.reply.genesis.model.TemplateVO;

public interface TemplateFileRepository extends JpaRepository<TemplateFileVO, Long> {

  List<TemplateFileVO> findByTemplateOrderByOrder(TemplateVO template);
}
