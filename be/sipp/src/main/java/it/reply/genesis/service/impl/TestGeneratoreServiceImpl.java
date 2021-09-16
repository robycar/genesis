package it.reply.genesis.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.reply.genesis.AppError;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.generic.service.AbstractService;
import it.reply.genesis.api.test.payload.TestGeneratoreDTO;
import it.reply.genesis.model.FileSystemScope;
import it.reply.genesis.model.FileSystemVO;
import it.reply.genesis.model.TemplateVO;
import it.reply.genesis.model.TestGeneratoreVO;
import it.reply.genesis.model.repository.TestGeneratoreRepository;
import it.reply.genesis.service.FileSystemService;
import it.reply.genesis.service.LineaService;
import it.reply.genesis.service.OBPService;
import it.reply.genesis.service.TemplateService;
import it.reply.genesis.service.TestGeneratoreService;

@Service
@Transactional(rollbackFor = ApplicationException.class)
public class TestGeneratoreServiceImpl extends AbstractService implements TestGeneratoreService {

  @Autowired
  private TestGeneratoreRepository testGeneratoreRepository;
  
  @Autowired
  private TemplateService templateService;
  
  @Autowired
  private LineaService lineaService;
  
  @Autowired
  private OBPService oBPService;
  
  @Autowired
  private FileSystemService fileSystemService;
  
  
  @Override
  public List<TestGeneratoreDTO> listTestGeneratore() throws ApplicationException {
    logger.debug("enter listTestGeneratore");
    
    return testGeneratoreRepository.findAll(Sort.by(Direction.DESC, "id"))
        .stream()
        .map(vo -> new TestGeneratoreDTO(vo))
        .collect(Collectors.toList());
  }

  @Override
  public TestGeneratoreDTO createTestGeneratore(TestGeneratoreDTO dto) throws ApplicationException {
    logger.debug("enter createTestGeneratore");
    
    TemplateVO templateVO = templateService.readVO(dto.getTemplate().getId());
    if (testGeneratoreRepository.findByNome(dto.getNome()).isPresent()) {
      throw makeError(HttpStatus.CONFLICT, AppError.TEST_GEN_ALRADY_EXISTS, dto.getNome());
    }
    
    TestGeneratoreVO vo = new TestGeneratoreVO();
    vo.init(currentUsername());
    vo.setNome(dto.getNome());
    vo.setDescrizione(dto.getDescrizione());
    vo.setLineaChiamante(lineaService.readLineaGeneratoreVO(dto.getLineaChiamante().getId()));
    vo.setLineaChiamato(lineaService.readLineaGeneratoreVO(dto.getLineaChiamato().getId()));
    vo.setProxyChiamante(oBPService.readProxyVO(dto.getProxyChiamante().getId()));
    vo.setProxyChiamato(oBPService.readProxyVO(dto.getProxyChiamato().getId()));
    vo.setTemplate(templateService.readVO(dto.getTemplate().getId()));
    vo = testGeneratoreRepository.save(vo);
    
    List<Pair<FileSystemVO, FileSystemVO>> fileCopiati = fileSystemService.copyFilesThroughScope(FileSystemScope.TEMPLATE, templateVO.getId(), FileSystemScope.TEST, vo.getId());
    logger.debug("Copiati {} file dal template {},{} al test generatore {},{}", 
        fileCopiati.size(), 
        templateVO.getId(), templateVO.getNome(),
        vo.getId(), vo.getNome());
    
    testGeneratoreRepository.flush();
    
    return new TestGeneratoreDTO(vo);
  }

  @Override
  public TestGeneratoreDTO readTestGeneratore(long id) throws ApplicationException {
    TestGeneratoreVO vo = readTestGeneratoreVO(id);
    
    return new TestGeneratoreDTO(vo);
  }

  public TestGeneratoreVO readTestGeneratoreVO(long id) throws ApplicationException {
    return testGeneratoreRepository.findById(id)
        .orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.TEST_GEN_NOT_FOUND, id));
  }

  @Override
  public TestGeneratoreDTO updateTestGeneratore(TestGeneratoreDTO dto) throws ApplicationException {
    logger.debug("enter updateTestGeneratore");
    
    TestGeneratoreVO vo = readTestGeneratoreVO(dto.getId());
    checkVersion(vo, dto.getVersion(), "TestGeneratoreVO", dto.getId());
    
    if (dto.getNome() != null && !dto.getNome().equals(vo.getNome())) {
      Optional<Long> existingId = testGeneratoreRepository.findByNome(dto.getNome())
        .filter(s -> !s.getId().equals(dto.getId()))
        .map(s -> s.getId());
      if (existingId.isPresent()) {
        throw makeError(HttpStatus.CONFLICT, AppError.TEST_GEN_ALRADY_EXISTS, dto.getNome());
      }
      
      vo.setNome(dto.getNome());
    }
    
    if (dto.getDescrizione() != null) {
      vo.setDescrizione(dto.getDescrizione());
    }
    
    if (dto.getLineaChiamante() != null) {
      vo.setLineaChiamante(lineaService.readLineaGeneratoreVO(dto.getLineaChiamante().getId()));
    }
    
    if (dto.getLineaChiamato() != null) {
      vo.setLineaChiamato(lineaService.readLineaGeneratoreVO(dto.getLineaChiamato().getId()));
    }
    
    if (dto.getProxyChiamante() != null) {
      vo.setProxyChiamante(oBPService.readProxyVO(dto.getProxyChiamante().getId()));
    }
    
    if (dto.getProxyChiamato() != null) {
      vo.setProxyChiamato(oBPService.readProxyVO(dto.getProxyChiamato().getId()));
    }
    
    vo.modifiedBy(currentUsername());
    
    testGeneratoreRepository.saveAndFlush(vo);
    
    return new TestGeneratoreDTO(vo);
  }

  @Override
  public void deleteTestGeneratore(long id) throws ApplicationException {
    logger.debug("enter deleteTestGeneratore");
    TestGeneratoreVO testVO = readTestGeneratoreVO(id);
    
    testGeneratoreRepository.delete(testVO);
    
  }

}
