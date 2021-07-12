package it.reply.sipp.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
import it.reply.sipp.model.UserVO;
import it.reply.sipp.model.repository.UserRepository;
import it.reply.sipp.service.GruppoService;
import it.reply.sipp.service.LevelService;
import it.reply.sipp.service.UserService;

@Service
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
	
	@Override
	@Transactional(readOnly = true)
	public List<UserVO> listUsers() {
		return userRepository.findAll();
	}

	@Transactional(readOnly = true)
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

	@Override
	@Transactional(readOnly = true)
	public Optional<UserVO> readUser(Long id) {
		logger.debug("enter readUser(%d)", id);
		
		Optional<UserVO> result = userRepository.findById(id);
		result.ifPresentOrElse(u -> { 
			u.getGruppo().getId();
			u.getLevel().getId();
			logger.debug("readed user detail for {}", u.getUsername());
		}, () -> logger.warn("user not found for id %d", id));
		
		return result;
	}
	
	@Override
	@Transactional(readOnly = false)
	public void updateUser(UserDTO userDTO, String password) throws ApplicationException {
		logger.debug("enter updateUser({}, {}, ****, {}", userDTO);
		Long userId = userDTO.getId();
		
		UserVO userVO = userRepository.findById(userId)
				.orElseThrow(()-> makeError(HttpStatus.NOT_FOUND, 
						AppError.USER_NOT_FOUND, userId));

		if (userDTO.getGruppo() != null && userDTO.getGruppo().getId() != null) {
			userVO.setGruppo(gruppoService.readGruppo(userDTO.getGruppo().getId()));
		}
		
		if (userDTO.getLevel() != null && userDTO.getLevel().getId() != null) {
			userVO.setLevel(levelService.read(userDTO.getLevel().getId()));
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
	@Transactional
	public UserVO addUser(UserVO userVO, String password) throws ApplicationException {
		logger.debug("enter addUser");
		if (userVO.getId() != null) {
			throw new ApplicationException("Il campo id non puo' essere valorizzato quando si aggiunge un nuovo utente");
		}
		
		userVO.setGruppo(gruppoService.readGruppo(userVO.getGruppo().getId()));
		userVO.setLevel(levelService.read(userVO.getLevel().getId()));
		
		Optional<UserVO> existingUser = userRepository.findByUsername(userVO.getUsername());
		if (existingUser.isPresent()) {
			throw makeError(HttpStatus.CONFLICT, AppError.USERNAME_ALRADY_EXISTS, userVO.getUsername());
		}
		
		userVO.setPassword(passwordEncoder.encode(password));
		
		userVO = userRepository.saveAndFlush(userVO);
		logger.debug("exit addUser");
		return userVO;
	}


}
