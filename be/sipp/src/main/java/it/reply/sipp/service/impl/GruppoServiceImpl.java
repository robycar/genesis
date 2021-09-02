package it.reply.sipp.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.reply.sipp.AppError;
import it.reply.sipp.api.admin.payload.GruppoDTO;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.generic.service.AbstractService;
import it.reply.sipp.model.GruppoVO;
import it.reply.sipp.model.repository.GruppoRepository;
import it.reply.sipp.model.repository.UserRepository;
import it.reply.sipp.service.GruppoService;

@Service
@Transactional(rollbackFor=ApplicationException.class)
public class GruppoServiceImpl extends AbstractService implements GruppoService {

	
	private static final Logger logger = LoggerFactory.getLogger(GruppoServiceImpl.class);

	
	@Autowired
	private GruppoRepository gruppoRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public GruppoServiceImpl() {
	}
	
	@Override
	public List<GruppoVO> listGroups() {
		return gruppoRepository.findAll();
	}

	@Override
	public GruppoVO addGruppo(GruppoVO vo) throws ApplicationException {
		if (vo.getId() != null) {
			throw new ApplicationException("Il campo id non puo' essere valorizzato quando si aggiunge un gruppo");
		}
		if (vo.getNome().length() > GruppoVO.NOME_LENGTH) {
			vo.setNome(vo.getNome().substring(0, GruppoVO.NOME_LENGTH));
			logger.warn("Campo gruppo.nome troncato a {} caratteri: {}",
					GruppoVO.NOME_LENGTH, vo.getNome());
		}
		
		Optional<GruppoVO> gruppoEsistente = gruppoRepository.findByNome(vo.getNome());
		if (gruppoEsistente.isPresent()) {
			throw makeError(HttpStatus.CONFLICT, AppError.GROUP_ALRADY_EXISTS, vo.getNome());
		}
		
		if (StringUtils.length(vo.getDescrizione()) > GruppoVO.DESCRIZIONE_LENGTH) {
			vo.setDescrizione(vo.getDescrizione().substring(0, GruppoVO.DESCRIZIONE_LENGTH));
			logger.warn("Campo gruppo.descrizione trovato a {} caratteri: {}",
					GruppoVO.DESCRIZIONE_LENGTH, vo.getDescrizione());
		}
		
		vo.init(getUsername());
		
		vo = gruppoRepository.save(vo);
		
		return vo;
	}

	@Override
	public GruppoVO readVO(long id) throws ApplicationException {
		return gruppoRepository.findById(id)
		.orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.GROUP_NOT_FOUND, id));
	}

  @Override
  public GruppoDTO readGruppo(long id) throws ApplicationException {
    GruppoVO vo = readVO(id);
    GruppoDTO dto = new GruppoDTO(vo);
    
    return dto;
  }

	
	@Override
	public GruppoVO updateGruppo(GruppoVO gruppoIn) throws ApplicationException {

		GruppoVO vo = readVO(gruppoIn.getId());
		
		//TODO: Abilitare dopo il recepimento del FE
		//checkVersion(vo, gruppoIn.getVersion(), "Gruppo", gruppoIn.getId());
		
		if (gruppoIn.getNome() != null) {
			vo.setNome(gruppoIn.getNome());
			if (vo.getNome().length() > GruppoVO.NOME_LENGTH) {
				vo.setNome(vo.getNome().substring(0, GruppoVO.NOME_LENGTH));
				logger.warn("Campo gruppo.nome troncato a {} caratteri: {}",
						GruppoVO.NOME_LENGTH, vo.getNome());
			}
			
			Long existingGroupId = gruppoRepository.findByNome(vo.getNome())
				.map(g -> g.getId())
				.filter(id -> !Objects.equals(id, vo.getId()))
				.orElse(null);
			if (existingGroupId != null) {
				logger.error("Non e' possibile assegnare il nome '{}' al gruppo {} in quanto e' gia' assegnato al gruppo {}",
						vo.getNome(), vo.getId(), existingGroupId);
				throw makeError(HttpStatus.CONFLICT, AppError.GROUP_ALRADY_EXISTS, vo.getNome());
			}
			
		}
		
		if (gruppoIn.getDescrizione() != null) {
			vo.setDescrizione(gruppoIn.getDescrizione());
			if (vo.getDescrizione().length() > GruppoVO.DESCRIZIONE_LENGTH) {
				vo.setDescrizione(vo.getDescrizione().substring(0, GruppoVO.DESCRIZIONE_LENGTH));
				logger.warn("Campo gruppo.descrizione troncato a {} caratteri: {}",
						GruppoVO.DESCRIZIONE_LENGTH, vo.getDescrizione());
			}
		}
		
		vo.modifiedBy(getUsername());
		
		return gruppoRepository.save(vo);
	}

	@Override
	public void removeGruppo(long id) throws ApplicationException {
	  logger.debug("enter removeGruppo");
	  GruppoVO gruppo = readVO(id);
	  long count = userRepository.countByGruppo(gruppo);
	  if (count > 0) {
	    logger.error("Trovati {} utenti che appartengono al gruppo {}: {}",
	        count, id, gruppo.getNome());
	    throw makeError(HttpStatus.BAD_REQUEST, AppError.GROUP_NOT_EMPTY_IN_DELETE);
	  }
	  
	  logger.info("Ternativo di eliminazione del gruppo {}:{}", gruppo.getId(), gruppo.getNome());
	  gruppoRepository.delete(gruppo);
	  
	}


}
