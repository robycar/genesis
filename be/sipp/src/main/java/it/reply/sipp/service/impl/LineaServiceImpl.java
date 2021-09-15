package it.reply.sipp.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import it.reply.sipp.AppError;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.generic.payload.ConnectionDTO;
import it.reply.sipp.api.generic.service.AbstractService;
import it.reply.sipp.api.linea.payload.LineaDTO;
import it.reply.sipp.api.linea.payload.LineaGeneratoreDTO;
import it.reply.sipp.api.linea.payload.TypeLineaDTO;
import it.reply.sipp.model.FileSystemScope;
import it.reply.sipp.model.FileSystemVO;
import it.reply.sipp.model.LineaGeneratoreVO;
import it.reply.sipp.model.LineaVO;
import it.reply.sipp.model.OutboundProxyVO;
import it.reply.sipp.model.TypeLineaVO;
import it.reply.sipp.model.repository.LineaGeneratoreRepository;
import it.reply.sipp.model.repository.LineaRepository;
import it.reply.sipp.model.repository.TestGeneratoreRepository;
import it.reply.sipp.model.repository.TypeLineaRepository;
import it.reply.sipp.service.FileSystemService;
import it.reply.sipp.service.LineaService;
import it.reply.sipp.service.TestCaseService;
import it.reply.sipp.service.dto.LineaReadLineaResponse;

@Service
@Transactional(rollbackFor = ApplicationException.class)
public class LineaServiceImpl extends AbstractService implements LineaService {

	@Autowired
	private TypeLineaRepository typeLineaRepository;

	@Autowired
	private LineaRepository lineaRepository;
	
	@Autowired
	private LineaGeneratoreRepository lineaGeneratoreRepository;
	
	@Autowired
	private FileSystemService fileSystemService;
	
	@Autowired
	private TestGeneratoreRepository testGeneratoreRepository;
	
	public LineaServiceImpl() {
	}

	@Override
	public List<TypeLineaDTO> listTypeLinee() {
		logger.debug("enter listTypeLinee");
		return typeLineaRepository.findAll().stream().map(vo -> new TypeLineaDTO(vo))
				.collect(Collectors.toUnmodifiableList());
	}

	/**
	 * Recupera un TypeLinea da db, ma lancia un ApplicationException se la
	 * TypeLinea non puo' essere trovata.
	 * 
	 * @param id l'identificatore del TypeLinea
	 * @return Il TypeLinea trovato
	 * @throws ApplicationException
	 */
	private TypeLineaVO readTypeLineaVO(Long id) throws ApplicationException {
		return typeLineaRepository.findById(id)
				.orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.TYPE_LINEA_NOT_FOUND, id));
	}

	@Override
	public LineaVO readLineaVO(long id) throws ApplicationException {
		return lineaRepository.findById(id)
				.orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.LINEA_NOT_FOUND, id));
	}

	@Override
	public List<LineaDTO> listLinee() throws ApplicationException {
		logger.debug("enter listLinee");

		List<LineaDTO> result = lineaRepository.findAll().stream().map(vo -> new LineaDTO(vo))
				.collect(Collectors.toList());

		return result;
	}

  @Override
  public List<LineaGeneratoreDTO> listLineeGeneratore() throws ApplicationException {
    logger.debug("enter listLineeGeneratore");

    return lineaGeneratoreRepository.findAll()
      .stream()
      .map(vo -> new LineaGeneratoreDTO(vo))
      .collect(Collectors.toList());
  }
	
  @Override
  public LineaGeneratoreDTO createAndPopulateLineaGeneratore(LineaGeneratoreDTO dto, MultipartFile pathCSV)
      throws ApplicationException {
    logger.debug("enter createAndPopulateLineaGeneratore");
    
    LineaGeneratoreVO vo = new LineaGeneratoreVO();
    vo.init(currentUsername());
    
    vo.setIp(dto.getIp());
    vo.setPorta(dto.getPorta());
    vo.setTypeLinea(readTypeLineaVO(dto.getTypeLinea().getId()));
    
    vo = lineaGeneratoreRepository.save(vo);

    if (pathCSV != null) {
      FileSystemVO fsVO = fileSystemService.saveFile(FileSystemScope.LINEA_GENERATORE, vo.getId(), pathCSV);
      vo.setPathCSV(fsVO);
      vo = lineaGeneratoreRepository.save(vo);
    }
    lineaGeneratoreRepository.flush();
    return new LineaGeneratoreDTO(vo);
    
  }

	@Override
	public LineaDTO createLinea(LineaDTO dto) throws ApplicationException {
		logger.debug("enter createLinea");

		if (dto.getId() != null) {
			throw new ApplicationException("Il campo id non deve essere valorizzato quando si crea una linea");
		}

		LineaVO vo = new LineaVO();
		vo.setIp(dto.getIp());
		vo.setNumero(dto.getNumero());
		vo.setPassword(dto.getPassword());
		vo.setPorta(dto.getPorta());
		vo.setGruppo(currentGroup());

		TypeLineaVO typeLineaVO = readTypeLineaVO(dto.getTypeLinea().getId());
		Optional<LineaVO> existingLinea = lineaRepository.findByNumeroAndTypeLinea(vo.getNumero(), typeLineaVO);
		if (existingLinea.isPresent()) {
			throw makeError(HttpStatus.CONFLICT, AppError.LINEA_NUMERO_ALRADY_EXISTS, vo.getNumero(),
					typeLineaVO.getDescrizione(), existingLinea.get().getId());
		} else {
			vo.setTypeLinea(typeLineaVO);

		}

		vo.init(currentUsername());
		
		vo = lineaRepository.saveAndFlush(vo);

		logger.debug("exit createLinea");
		return new LineaDTO(vo);
	}

  @Override
  public TypeLineaDTO updateTypeLinea(TypeLineaDTO dto) throws ApplicationException {
    logger.debug("enter updateTypeLinea");
    TypeLineaVO vo = readTypeLineaVO(dto.getId());
    
    checkVersion(vo, dto.getVersion(), "TypeLineaDTO", vo.getId());
    
    if (dto.getDescrizione() != null && !dto.getDescrizione().equalsIgnoreCase(vo.getDescrizione())) {
      Optional<Long> existingVOId = typeLineaRepository.findByDescrizione(dto.getDescrizione())
          .filter(v -> v.getId().equals(dto.getId()))
          .map(v -> v.getId());
      if (existingVOId.isPresent()) {
        throw makeError(HttpStatus.CONFLICT, AppError.TYPE_LINEA_ALRADY_EXISTS, dto.getDescrizione());
      }
      
      vo.setDescrizione(dto.getDescrizione());
    }
    
    vo.modifiedBy(currentUsername());
    
    vo = typeLineaRepository.saveAndFlush(vo);
    
    return new TypeLineaDTO(vo);
  }

  @Override
  public LineaGeneratoreDTO updateLineaGeneratore(LineaGeneratoreDTO dto) throws ApplicationException {
    logger.debug("enter updateLineaGeneratore");
    
    LineaGeneratoreVO vo = readLineaGeneratoreVO(dto.getId());
    checkVersion(vo, dto.getVersion(), "LineaGeneratoreVO", vo.getId());

    if (dto.getTypeLinea() != null && dto.getTypeLinea().getId() != null) {
      vo.setTypeLinea(readTypeLineaVO(dto.getTypeLinea().getId()));
    }
    
    if (dto.getIp() != null) {
      vo.setIp(dto.getIp());
    }
    if (dto.getPorta() != null) {
      vo.setPorta(dto.getPorta());
    }
    
    vo = lineaGeneratoreRepository.saveAndFlush(vo);
    
    return new LineaGeneratoreDTO(vo);
    
  }
  
	public LineaGeneratoreVO readLineaGeneratoreVO(long id) throws ApplicationException {
	  return lineaGeneratoreRepository.findById(id)
	      .orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.LINEA_GENERATORE_NOT_FOUND, id));
  }

  @Override
	public LineaDTO updateLinea(LineaDTO lineaDTO) throws ApplicationException {

		logger.debug("enter updateLinea");
		LineaVO lineaVO = readLineaVO(lineaDTO.getId());
		checkGroup(lineaVO.getGruppo(), AppError.LINEA_EDIT_WRONG_GROUP);
		//TODO: Abilitare checkVersion(lineaVO, lineaDTO.getVersion(), "LineaVO", lineaVO.getId());

		if (lineaDTO.getNumero() != null || lineaDTO.getTypeLinea() != null) {
			String numero = lineaDTO.getNumero() != null ? lineaDTO.getNumero() : lineaVO.getNumero();
			TypeLineaVO typeLineaVO = lineaDTO.getTypeLinea() != null ? readTypeLineaVO(lineaDTO.getTypeLinea().getId())
					: lineaVO.getTypeLinea();

			Optional<Long> existingLineaId = lineaRepository.findByNumeroAndTypeLinea(numero, typeLineaVO)
					.filter(existingVo -> !existingVo.getId().equals(lineaVO.getId()))
					.map(existingVo -> existingVo.getId());

			if (existingLineaId.isPresent()) {
				throw makeError(HttpStatus.CONFLICT, AppError.LINEA_NUMERO_ALRADY_EXISTS, numero,
						typeLineaVO.getDescrizione(), existingLineaId.get());
			}

			lineaVO.setNumero(numero);
			lineaVO.setTypeLinea(typeLineaVO);

		}

		if (lineaDTO.getIp() != null) {
			lineaVO.setIp(lineaDTO.getIp());
		}

		if (lineaDTO.getPassword() != null) {
			lineaVO.setPassword(lineaDTO.getPassword());
		}

		if (lineaDTO.getPorta() != null) {
			lineaVO.setPorta(lineaDTO.getPorta());
		}

		lineaVO.modifiedBy(currentUsername());
		
		lineaRepository.saveAndFlush(lineaVO);

		logger.debug("exit updateLinea");
		return new LineaDTO(lineaVO);
	}

  @Override
  public void removeLineaGeneratore(long id) throws ApplicationException {
    logger.debug("enter removeLineaGeneratore");
    LineaGeneratoreVO lineaGeneratoreVO = readLineaGeneratoreVO(id);
    
    long occurrence = testGeneratoreRepository.countByLineaChiamanteOrLineaChiamato(lineaGeneratoreVO,lineaGeneratoreVO);
    if (occurrence > 0) {
      throw makeError(HttpStatus.BAD_REQUEST, AppError.LINEA_GENERATORE_USED_IN_DELETE);
    }
    lineaGeneratoreRepository.delete(lineaGeneratoreVO);
  }
  
	@Override
	public void removeLinea(Long id) throws ApplicationException {
	  
		// TODO: Verificare se la linea è attualmente in uso
	  logger.debug("enter removeLinea");
	  LineaVO lineaVO = readLineaVO(id);
	  checkGroup(lineaVO.getGruppo(), AppError.LINEA_DELETE_WRONG_GROUP);
	  
	  List<Long> lineaUsedInTestCases = testCaseService.findTestCaseIdUsingLine(lineaVO);
	  if (!lineaUsedInTestCases.isEmpty()) {
	    logger.warn("Tentativo di eliminare una linea utilizzata dai test case {}", lineaUsedInTestCases);
	    throw makeError(HttpStatus.BAD_REQUEST, AppError.LINEA_USED_IN_DELETE);
	  }
	  
	  lineaRepository.delete(lineaVO);
	}

  @Override
  public List<TypeLineaVO> readTypeLineeVO(Iterable<Long> ids) throws ApplicationException {
    logger.debug("enter readTypeLineeVO");
    List<TypeLineaVO> result = typeLineaRepository.findAllById(ids);
    
    Set<Long> idMancanti = new HashSet<>();
    for (Long id: ids) {
      idMancanti.add(id);
    }
    for (TypeLineaVO vo: result) {
      idMancanti.remove(vo.getId());
    }
    
    if (!idMancanti.isEmpty()) {
      throw makeError(HttpStatus.NOT_FOUND, AppError.TYPE_LINEA_NOT_FOUND, idMancanti);
    }
    return result;
  }
  
  @Override
  public TypeLineaDTO createTypeLinea(TypeLineaDTO dto) throws ApplicationException {
    logger.debug("enter createTypeLinea");
    
    long numExisting = typeLineaRepository.countByDescrizione(dto.getDescrizione());
    
    if (numExisting > 0) {
      throw makeError(HttpStatus.CONFLICT, AppError.TYPE_LINEA_ALRADY_EXISTS, dto.getDescrizione());
    }
    
    TypeLineaVO vo = new TypeLineaVO();
    vo.init(currentUsername());
        
    vo.setDescrizione(dto.getDescrizione());
    vo = typeLineaRepository.saveAndFlush(vo);
    
    return new TypeLineaDTO(vo);
  }

  @Autowired
  private TestCaseService testCaseService;
  
  @Override
  public LineaReadLineaResponse readLinea(long id) throws ApplicationException {
    logger.debug("enter readLinea");
    LineaVO lineaVO = readLineaVO(id);
    
    
    LineaReadLineaResponse response = new LineaReadLineaResponse();
    response.setLinea(new LineaDTO(lineaVO));
    
    List<Long> testCaseConnected = testCaseService.findTestCaseIdUsingLine(lineaVO);
    response.setConnections(List.of(new ConnectionDTO("testcase", testCaseConnected)));
    
    return response;
  }

  @Override
  public TypeLineaDTO readTypeLinea(long id) throws ApplicationException {
    logger.debug("enter readTypeLinea");
    
    TypeLineaVO vo = readTypeLineaVO(id);
    return new TypeLineaDTO(vo);
  }

  @Override
  public void removeTypeLinea(long id) throws ApplicationException {
    logger.debug("enter removeTypeLinea");
    
    TypeLineaVO vo = readTypeLineaVO(id);
    long numLinee = lineaRepository.countByTypeLinea(vo);
    if (numLinee > 0) {
      logger.warn("Il tentativo di eliminare il TypeLinea {} e' bloccato perche' utilizzato da {} Linee", vo.getId(), numLinee);
      throw makeError(HttpStatus.BAD_REQUEST, AppError.TYPE_LINEA_USED_IN_DELETE);
    }
    
    for (OutboundProxyVO proxy: vo.getProxies()) {
      if (proxy.getTypeLinee().size() == 1) {
        throw makeError(HttpStatus.BAD_REQUEST, AppError.TYPE_LINEA_DELETE_OBP_EMPTY, proxy.getId());
      }
      proxy.getTypeLinee().remove(vo);
    }
    
    typeLineaRepository.delete(vo);
    
  }

  @Override
  public LineaGeneratoreDTO readLineaGeneratore(long id) throws ApplicationException {
    LineaGeneratoreVO lineaVO = readLineaGeneratoreVO(id);
    return new LineaGeneratoreDTO(lineaVO);
  }








}
