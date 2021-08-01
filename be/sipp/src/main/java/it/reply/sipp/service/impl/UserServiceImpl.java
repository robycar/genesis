package it.reply.sipp.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.reply.sipp.AppError;
import it.reply.sipp.api.admin.payload.UserDTO;
import it.reply.sipp.api.generic.exception.ApplicationException;
import it.reply.sipp.api.generic.service.AbstractService;
import it.reply.sipp.model.FunzioneVO;
import it.reply.sipp.model.GruppoVO;
import it.reply.sipp.model.LevelVO;
import it.reply.sipp.model.UserVO;
import it.reply.sipp.model.repository.FunzioneRepository;
import it.reply.sipp.model.repository.UserRepository;
import it.reply.sipp.service.GruppoService;
import it.reply.sipp.service.LevelService;
import it.reply.sipp.service.UserService;

@Service
@Transactional(rollbackFor = ApplicationException.class)
public class UserServiceImpl extends AbstractService implements UserService {
	
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private LevelService levelService;
	
	@Autowired
	private GruppoService gruppoService;
	
	@Autowired
	private FunzioneRepository funzioneRepository;
	
	
	@Override
	public List<UserVO> listUsers() {
		return userRepository.findAll(Sort.by(Direction.DESC, "id"));
	}

	private static UserVO dto2vo(UserDTO dto) {
	  UserVO userVO = new UserVO();
	  userVO.setAzienda(dto.getAzienda());
	  userVO.setCognome(dto.getCognome());
	  userVO.setId(dto.getId());
	  userVO.setNome(dto.getNome());
	  userVO.setUsername(dto.getUsername());
	  
	  
	  return userVO;
	}
	
	public List<UserDTO> listUsers(UserDTO dto) {
	  
	  UserVO criteria = dto2vo(dto);
	  
	  if (dto.getGruppo() != null && dto.getGruppo().getId() != null) {
	    criteria.setGruppo(new GruppoVO(dto.getGruppo().getId()));
	  }
	  
	  if (dto.getLevel() != null && dto.getLevel().getId() != null) {
	    criteria.setLevel(new LevelVO(dto.getLevel().getId()));
	  }
	  
	  List<UserVO> result = userRepository.findAll(Example.of(criteria), Sort.by(Direction.DESC, "id"));
	  return result.stream().map(vo -> new UserDTO(vo)).collect(Collectors.toList());
	  
	}
	
	
	public List<GrantedAuthority> readRolesAndFunctionsForUser(UserVO u) {
		logger.debug("enter readRolesAndFunctionsForUser {}", u.getUsername());
		List<GrantedAuthority> authorities = new ArrayList<>();
	
		Set<String> functions = userRepository.functionsPerUser(u.getId());
		
		for (String function: functions) {
			authorities.add(new SimpleGrantedAuthority("FUN_" + function));
		}
		
		logger.debug("exit readRolesAndFunctionsForUser");
		
		return authorities;
	}

	private UserVO readVO(long id) throws ApplicationException {
	  logger.debug("enter readVO");
	  return userRepository.findById(id)
	      .orElseThrow(() -> makeError(HttpStatus.NOT_FOUND, AppError.USER_NOT_FOUND, id));
	  
	}
	
	@Override
	public UserDTO readUser(Long id) throws ApplicationException {
		logger.debug("enter readUser(%d)", id);
		
		UserVO userVO = readVO(id);
		
		return new UserDTO(userVO);
	}
	
	@Override
	public void updateUser(UserDTO userDTO, String password) throws ApplicationException {
		logger.debug("enter updateUser({}, {}, ****, {}", userDTO);
		Long userId = userDTO.getId();
		
		UserVO userVO = userRepository.findById(userId)
				.orElseThrow(()-> makeError(HttpStatus.NOT_FOUND, 
						AppError.USER_NOT_FOUND, userId));

		if (userDTO.getGruppo() != null && userDTO.getGruppo().getId() != null) {
			userVO.setGruppo(gruppoService.readVO(userDTO.getGruppo().getId()));
		}
		
		if (userDTO.getLevel() != null && userDTO.getLevel().getId() != null) {
			userVO.setLevel(levelService.readVO(userDTO.getLevel().getId()));
		}
		
		if (password != null) {
			logger.debug("Changing password for user {}", userVO.getUsername());
			userVO.setPassword(passwordEncoder.encode(password));
		}
		
		if (userDTO.getUsername() != null && !userDTO.getUsername().equals(userVO.getUsername())) {
			Long existingId = userRepository.findByUsername(userDTO.getUsername())
				.map(u -> u.getId())
				.filter(id -> !Objects.equals(id, userVO.getId()))
				.orElse(null);
			if (existingId != null) {
				throw makeError(HttpStatus.CONFLICT, AppError.USERNAME_ALRADY_EXISTS, userDTO.getUsername());
			}
			userVO.setUsername(userDTO.getUsername());
		}
		
		if (userDTO.getFunzioni() != null) {
		  if (userDTO.getFunzioni().isEmpty()) {
		    userVO.getFunzioni().clear();
		  } else {
		    //Rimuovi le funzioni e memorizza il nome delle rimanenti
		    Set<String> nuoveFunzioni = userDTO.getFunzioni();
		    HashMap<String, FunzioneVO> funzioniAssegnate = new HashMap<>(userVO.getFunzioni().size());
		    Iterator<FunzioneVO> it = userVO.getFunzioni().iterator();
		    
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
          userVO.getFunzioni().addAll(funzioniDaAggiungere);
        }
		  }
		  
	
		  
		}
		
		
		if (userDTO.getCognome() != null) {
			userVO.setCognome(userDTO.getCognome());
		}
		
		if (userDTO.getNome() != null) {
			userVO.setNome(userDTO.getNome());
		}
		
		if (userDTO.getAzienda() != null) {
			userVO.setAzienda(userDTO.getAzienda());
		}
		
		userRepository.saveAndFlush(userVO);
		
	}

	@Override
	public UserVO addUser(UserVO userVO, String password) throws ApplicationException {
		logger.debug("enter addUser");
		if (userVO.getId() != null) {
			throw new ApplicationException("Il campo id non puo' essere valorizzato quando si aggiunge un nuovo utente");
		}
		
		userVO.setGruppo(gruppoService.readVO(userVO.getGruppo().getId()));
		userVO.setLevel(levelService.readVO(userVO.getLevel().getId()));
		
		Optional<UserVO> existingUser = userRepository.findByUsername(userVO.getUsername());
		if (existingUser.isPresent()) {
			throw makeError(HttpStatus.CONFLICT, AppError.USERNAME_ALRADY_EXISTS, userVO.getUsername());
		}
		
		userVO.setPassword(passwordEncoder.encode(password));
		
		userVO = userRepository.saveAndFlush(userVO);
		logger.debug("exit addUser");
		return userVO;
	}

  @Override
  public void removeUser(Long id) throws ApplicationException {
    logger.debug("enter removeUser");
    
    UserVO userVO = readVO(id);
    logger.info("Tentativo di eliminare l'utente {}: {}", userVO.getId(), userVO.getUsername());
    
    //TODO: Verificare le condizioni per cui non si puo' eliminare l'utente.
    //TODO: Un utente puo' eliminare se stesso?
    userRepository.delete(userVO);

  }


}
