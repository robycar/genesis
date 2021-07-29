package it.reply.sipp.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.reply.sipp.AppError;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.generic.service.AbstractService;
import it.reply.sipp.api.linea.payload.LineaDTO;
import it.reply.sipp.api.linea.payload.TypeLineaDTO;
import it.reply.sipp.model.LineaVO;
import it.reply.sipp.model.TypeLineaVO;
import it.reply.sipp.model.repository.LineaRepository;
import it.reply.sipp.model.repository.TypeLineaRepository;
import it.reply.sipp.service.LineaService;

@Service
@Transactional(rollbackFor = ApplicationException.class)
public class LineaServiceImpl extends AbstractService implements LineaService {

	@Autowired
	private TypeLineaRepository typeLineaRepository;

	@Autowired
	private LineaRepository lineaRepository;

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

	private LineaVO readLineaVO(Long id) throws ApplicationException {
		return lineaRepository.findById(id)
				.orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.LINEA_NOT_FOUND, id));
	}

	@Override
	public List<LineaDTO> listLinee() throws ApplicationException {
		logger.debug("enter listLinee");

		List<LineaDTO> result = lineaRepository.findAll().stream().map(vo -> new LineaDTO(vo))
				.collect(Collectors.toList());

		logger.debug("exit listLinee");
		return result;
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

		TypeLineaVO typeLineaVO = readTypeLineaVO(dto.getTypeLinea().getId());
		Optional<LineaVO> existingLinea = lineaRepository.findByNumeroAndTypeLinea(vo.getNumero(), typeLineaVO);
		if (existingLinea.isPresent()) {
			throw makeError(HttpStatus.CONFLICT, AppError.LINEA_NUMERO_ALRADY_EXISTS, vo.getNumero(),
					typeLineaVO.getDescrizione(), existingLinea.get().getId());
		} else {
			vo.setTypeLinea(typeLineaVO);

		}

		vo = lineaRepository.saveAndFlush(vo);

		logger.debug("exit createLinea");
		return new LineaDTO(vo);
	}

	@Override
	public LineaDTO updateLinea(LineaDTO lineaDTO) throws ApplicationException {

		logger.debug("enter updateLinea");
		LineaVO lineaVO = readLineaVO(lineaDTO.getId());

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

		lineaRepository.saveAndFlush(lineaVO);

		logger.debug("exit updateLinea");
		return new LineaDTO(lineaVO);
	}

	@Override
	public void removeLinea(Long id) throws ApplicationException {
		// TODO: Verificare se la linea è attualmente in uso

		try {
			lineaRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw makeError(HttpStatus.NOT_FOUND, AppError.LINEA_NOT_FOUND, id);
		}
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
    logger.debug("exit readTypeLineeVO");
    return result;
  }

}
