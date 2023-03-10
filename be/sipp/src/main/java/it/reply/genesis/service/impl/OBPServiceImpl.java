package it.reply.genesis.service.impl;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.reply.genesis.AppError;
import it.reply.genesis.api.generic.exception.ApplicationException;
import it.reply.genesis.api.generic.service.AbstractService;
import it.reply.genesis.api.linea.payload.OutboundProxyDTO;
import it.reply.genesis.api.linea.payload.TypeLineaDTO;
import it.reply.genesis.model.GruppoVO;
import it.reply.genesis.model.OutboundProxyVO;
import it.reply.genesis.model.TypeLineaVO;
import it.reply.genesis.model.repository.OBPRepository;
import it.reply.genesis.service.LineaService;
import it.reply.genesis.service.OBPService;
import it.reply.genesis.service.TestCaseService;
import it.reply.genesis.service.TestGeneratoreService;

@Service
@Transactional(rollbackFor = ApplicationException.class)
public class OBPServiceImpl extends AbstractService implements OBPService {

  @Autowired
  private OBPRepository oBPRepository;
  
  @Autowired
  private LineaService lineaService;
  
  @Autowired
  private TestCaseService testCaseService;
  
  @Autowired
  private TestGeneratoreService testGeneratoreService;
  

  @Override
  public List<OutboundProxyDTO> find(OutboundProxyDTO criteria) throws ApplicationException {
    logger.debug("enter find");
    
    List<OutboundProxyVO> result;
    
    if (criteria == null) {
      result = oBPRepository.findAll(Sort.by(Direction.DESC, "id"));
    } else {
      
      OutboundProxyVO criteriaVO = dto2vo(criteria);
      
      result = oBPRepository.findAll(Example.of(criteriaVO), Sort.by(Direction.DESC, "id"));
    }
    
    logger.debug("exit find");
    return result
        .stream()
        .map(vo -> new OutboundProxyDTO(vo))
        .collect(Collectors.toList());
  }


  private OutboundProxyVO dto2vo(OutboundProxyDTO dto) {
    
    OutboundProxyVO vo = new OutboundProxyVO();
    vo.setDescrizione(dto.getDescrizione());
    vo.setId(dto.getId());
    vo.setIpDestinazione(dto.getIpDestinazione());
    vo.setPorta(vo.getPorta());
    
    return vo ;
  }


  @Override
  public OutboundProxyDTO createProxy(OutboundProxyDTO proxyDTO) throws ApplicationException {
    logger.debug("enter createProxy");
    OutboundProxyVO vo = new OutboundProxyVO();
    vo.init(currentUsername());
    vo.setGruppo(currentGroup());
    vo.setDescrizione(proxyDTO.getDescrizione());
    vo.setIpDestinazione(proxyDTO.getIpDestinazione());
    vo.setPorta(proxyDTO.getPorta());
    if (vo.getPorta() == null) {
      vo.setPorta(OutboundProxyVO.DEFAULT_PORT);
    }
    
    if (proxyDTO.getTypeLinee() != null) {
    
      Set<Long> idsTypeLinea = proxyDTO.getTypeLinee()
        .stream()
        .map(tlvo -> tlvo.getId())
        .collect(Collectors.toSet());
      if (!idsTypeLinea.isEmpty()) {
        logger.debug("ricerco {} typeLinee", idsTypeLinea.size());
        vo.setTypeLinee(new HashSet<>(lineaService.readTypeLineeVO(idsTypeLinea)));
      }
    }
    vo = oBPRepository.saveAndFlush(vo);
    
    logger.debug("exit createProxy");
    return new OutboundProxyDTO(vo);
  }


  @Override
  public OutboundProxyDTO updateProxy(OutboundProxyDTO proxyDTO) throws ApplicationException {
    
    OutboundProxyVO vo = readProxyVO(proxyDTO.getId());
    checkGroup(vo.getGruppo(), AppError.OBP_EDIT_WRONG_GROUP);
    checkVersion(vo, proxyDTO.getVersion(), "OutboundProxyVO", vo.getId());
    if (proxyDTO.getTypeLinee() != null) {
      if (proxyDTO.getTypeLinee().isEmpty()) {
        vo.getTypeLinee().clear();
      } else {
        Set<Long> nuoveTypeLinea = proxyDTO.getTypeLinee()
            .stream()
            .map(tl -> tl.getId())
            .collect(Collectors.toSet());
        HashMap<Long, TypeLineaVO> typeLineaAssegnati = new HashMap<>(vo.getTypeLinee().size());
        Iterator<TypeLineaVO> it = vo.getTypeLinee().iterator();
        while (it.hasNext()) {
          TypeLineaVO tlvo = it.next();
          if (nuoveTypeLinea.contains(tlvo.getId())) {
            typeLineaAssegnati.put(tlvo.getId(), tlvo);
          } else {
            it.remove();
          }
        }
        nuoveTypeLinea.removeAll(typeLineaAssegnati.keySet());
        if (!nuoveTypeLinea.isEmpty()) {
          List<TypeLineaVO> typeLineaDaAggiungere = lineaService.readTypeLineeVO(nuoveTypeLinea);
          vo.getTypeLinee().addAll(typeLineaDaAggiungere);
        }
      }
    }
    
    if (proxyDTO.getDescrizione() != null) {
      vo.setDescrizione(proxyDTO.getDescrizione());
    }
    
    if (proxyDTO.getIpDestinazione() != null) {
      vo.setIpDestinazione(proxyDTO.getIpDestinazione());
    }
    
    if (proxyDTO.getPorta() != null) {
      vo.setPorta(proxyDTO.getPorta());
    }
    
    vo.modifiedBy(currentUsername());
    
    vo = oBPRepository.saveAndFlush(vo);
    logger.debug("exit updateProxy");
    
    return new OutboundProxyDTO(vo);
  }

  @Override
  public OutboundProxyVO readProxyVO(long id) throws ApplicationException {
    return oBPRepository.findById(id)
        .orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.OBP_NOT_FOUND, id));
  }


  @Override
  public OutboundProxyDTO readProxy(Long id) throws ApplicationException {
    logger.debug("enter readProxy");
    OutboundProxyDTO result = new OutboundProxyDTO(readProxyVO(id));
    logger.debug("exit readProxy");
    return result;
  }


  @Override
  public void removProxy(Long id) throws ApplicationException {
    logger.debug("enter removeProxy");
    OutboundProxyVO proxyVO = readProxyVO(id);
    checkGroup(proxyVO.getGruppo(), AppError.OBP_DELETE_WRONG_GROUP);
    
    List<Long> connections = testCaseService.findTestCaseIdUsingProxy(proxyVO);
    if (!connections.isEmpty()) {
      logger.warn("Impedisco l'eliminazione dell'outbound proxy {} utilizzato dai test case {}",
          id, connections);
      throw makeError(HttpStatus.BAD_REQUEST, AppError.OBP_USED_IN_DELETE);
    }
    
    connections = testGeneratoreService.findTestIdUsingProxy(proxyVO);
    if (!connections.isEmpty()) {
      logger.warn("Impedisco l'eliminazione dell'outbound proxy {} utilizzato dai test generatore {}",
          id, connections);
      throw makeError(HttpStatus.BAD_REQUEST, AppError.OBP_USED_IN_DELETE);
    }
    
    
    oBPRepository.delete(proxyVO);
    logger.debug("exit removeProxy");
  }


  @Override
  public List<OutboundProxyDTO> searchProxy(OutboundProxyDTO dto) throws ApplicationException {
    logger.debug("enter searchProxy");
    OutboundProxyVO vo = new OutboundProxyVO();
    vo.setDescrizione(dto.getDescrizione());
    if (dto.getGruppo() != null && dto.getGruppo().getId() != null) {
      vo.setGruppo(new GruppoVO(dto.getGruppo().getId()));
    }
    vo.setId(dto.getId());
    vo.setIpDestinazione(dto.getIpDestinazione());
    vo.setPorta(dto.getPorta());

    
    List<OutboundProxyVO> result = oBPRepository.findAll(Example.of(vo,
        ExampleMatcher.matchingAll().withIgnorePaths("version", "gruppo.version")));
    
    Stream<OutboundProxyVO> sresult = result.stream();
    if (dto.getTypeLinee() != null && ! dto.getTypeLinee().isEmpty()) {
      TypeLineaDTO tlDTO = dto.getTypeLinee().get(0);
      if (tlDTO != null && tlDTO.getId() != null) {
        sresult = sresult.filter(v -> {
          for (TypeLineaVO tlVO: v.getTypeLinee()) {
            if (tlVO.getId().equals(tlDTO.getId())) {
              return true;
            }
          }
          return false;
        });
      }
    }
    
    return sresult
        .map(s -> new OutboundProxyDTO(s))
        .collect(Collectors.toList());
    
  }

}
