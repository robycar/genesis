package it.reply.sipp.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.reply.sipp.model.TemplateFileVO;
import it.reply.sipp.model.TemplateVO;

public interface TemplateFileRepository extends JpaRepository<TemplateFileVO, Long> {

  List<TemplateFileVO> findByTemplateOrderByOrder(TemplateVO template);
}
