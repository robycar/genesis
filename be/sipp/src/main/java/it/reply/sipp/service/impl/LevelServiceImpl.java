package it.reply.sipp.service.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.reply.sipp.AppError;
import it.reply.sipp.api.admin.payload.LevelDTO;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.generic.service.AbstractService;
import it.reply.sipp.model.FunzioneVO;
import it.reply.sipp.model.LevelVO;
import it.reply.sipp.model.repository.FunzioneRepository;
import it.reply.sipp.model.repository.LevelRepository;
import it.reply.sipp.model.repository.UserRepository;
import it.reply.sipp.service.LevelService;

@Service
@Transactional(rollbackFor = ApplicationException.class)
public class LevelServiceImpl extends AbstractService implements LevelService {
	
	private static final Logger logger = LoggerFactory.getLogger(LevelServiceImpl.class);
	
	@Autowired
	private LevelRepository levelRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private FunzioneRepository funzioneRepository; 

	
	public LevelServiceImpl() {
	}

	@Override
	public LevelVO read(Long id) throws ApplicationException {
		logger.debug("enter read");
		return levelRepository.findById(id)
		.orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.LEVEL_NOT_FOUND, id));
	}

	@Override
	public LevelVO addLevel(LevelDTO dto) throws ApplicationException {
		logger.debug("enter addLevel");
		
		if (dto.getId() != null) {
			throw new ApplicationException("Il campo id non puo' essere valorizzato quando si aggiunge un nuovo livello");
		}
		
		Optional<LevelVO> existingLevel = levelRepository.findByNome(dto.getNome());
		if (existingLevel.isPresent()) {
			throw makeError(HttpStatus.CONFLICT, AppError.LEVEL_ALRADY_EXISTS, dto.getNome());
		}
		
		LevelVO vo = new LevelVO();
		vo.setNome(dto.getNome());
		vo.setDescrizione(dto.getDescrizione());
		
		vo = levelRepository.saveAndFlush(vo);
		logger.debug("exit addLevel");
		return vo;
	}

	@Override
	public List<LevelVO> listLivelli() {
		logger.debug("enter listLivelli");
		return levelRepository.findAll();
	}

	@Override
	public LevelVO updateLevel(LevelDTO dto) throws ApplicationException {
		logger.debug("enter updateLevel({})", dto);
		
		LevelVO vo = read(dto.getId());
		final Long levelId = vo.getId();
		if (dto.getNome() != null && !dto.getNome().equals(vo.getNome())) {
			Optional<LevelVO> existingLevel = levelRepository.findByNome(dto.getNome())
					.filter(v -> !levelId.equals(v.getId()));
			if (existingLevel.isPresent()) {
				throw makeError(HttpStatus.CONFLICT, AppError.LEVEL_ALRADY_EXISTS, dto.getNome());
			}
			
			vo.setNome(dto.getNome());
		}
		vo.setDescrizione(dto.getDescrizione());
		
		if (dto.getFunzioni() != null) {
			if (dto.getFunzioni().isEmpty()) {
				vo.getFunzioni().clear();
			} else {
				//Rimuovi le funzioni e memorizza il nome delle rimanenti
				Set<String> nuoveFunzioni = dto.getFunzioni();
				HashMap<String, FunzioneVO> funzioniAssegnate = new HashMap<>(vo.getFunzioni().size());
				Iterator<FunzioneVO> it = vo.getFunzioni().iterator();
				while (it.hasNext()) {
					FunzioneVO funzioneVO = it.next();
					if (nuoveFunzioni.contains(funzioneVO.getCodice())) {
						funzioniAssegnate.put(funzioneVO.getCodice(), funzioneVO);
					} else {
						it.remove();
					}
				}
				nuoveFunzioni.removeAll(funzioniAssegnate.keySet());
				if (!nuoveFunzioni.isEmpty()) {
					List<FunzioneVO> funzioniDaAggiungere = funzioneRepository.findAllById(nuoveFunzioni);
					//Verifica che non ci siano funzioni sconosciute
					for (FunzioneVO funzioneVO: funzioniDaAggiungere) {
						nuoveFunzioni.remove(funzioneVO.getCodice());
					}
					if (!nuoveFunzioni.isEmpty()) {
						throw makeError(HttpStatus.NOT_FOUND, AppError.FUNZIONI_NOT_FOUND, nuoveFunzioni);
					}
					vo.getFunzioni().addAll(funzioniDaAggiungere);
				}
			}
		}
		
		vo = levelRepository.saveAndFlush(vo);
		
		logger.debug("exit updateLevel");
		return vo;
	}

	@Override
	public void removeLevel(Long id) throws ApplicationException {
		logger.debug("enter removeLevel");
		LevelVO vo = read(id);
		logger.info("Tentativo di eliminare il livello {},{}", vo.getId(), vo.getNome());

		long usersInLevel = userRepository.countByLevel(vo);
		if (usersInLevel != 0) {
			logger.warn("Trovati {} utenti che appartengono al level {},{}.", usersInLevel, vo.getId(), vo.getNome());
			throw makeError(HttpStatus.BAD_REQUEST, AppError.LEVEL_NOT_EMPTY_IN_DELETE);
		}
		
		levelRepository.delete(vo);
		
	}

}
