package it.reply.sipp.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;

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
import it.reply.sipp.model.RoleVO;
import it.reply.sipp.model.UserVO;
import it.reply.sipp.model.repository.RoleRepository;
import it.reply.sipp.model.repository.UserRepository;
import it.reply.sipp.service.UserService;

@Service
public class UserServiceImpl extends AbstractService implements UserService {
	
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Override
	@Transactional(readOnly = true)
	public List<UserVO> listUsers() {
		
		return userRepository.findAllWithRole();
		
	}

	@Transactional(readOnly = true)
	public List<GrantedAuthority> readRolesAndFunctionsForUser(UserVO u) {
		logger.debug("enter readRolesAndFunctionsForUser {}", u.getUsername());
		Set<RoleVO> roles = u.getRoles();
		List<GrantedAuthority> authorities = new ArrayList<>();
		
		for (RoleVO roleVO: roles) {
			authorities.add(new SimpleGrantedAuthority("ROLE_" + roleVO.getName()));
		}
		
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
			u.getRoles(); 
			logger.debug("readed user detail for {}", u.getUsername());
		}, () -> logger.warn("user not found for id %d", id));
		
		return result;
	}
	
	@Override
	@Transactional(readOnly = false)
	public void updateUser(String userIdOrUsername, UserDTO userDTO, String password, boolean updateRoles) throws ApplicationException {
		
		Long userId = null;
		Optional<UserVO> userVOpt = Optional.empty();
		try {
			userId = Long.parseLong(userIdOrUsername);
			userVOpt = userRepository.findById(userId);
		} catch (NumberFormatException e) {
			//not a long userId
		}
		
		UserVO userVO = userVOpt
				.or(() -> userRepository.findByUsername(userIdOrUsername))
				.orElseThrow(()-> new ApplicationException(
						HttpStatus.NOT_FOUND.value(), 
						AppError.USER_NOT_FOUND.getErrorCode(),
						errorMessage(AppError.USER_NOT_FOUND, userIdOrUsername),
						errorLogMessage(AppError.USER_NOT_FOUND, userIdOrUsername)));

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
		
		if (userDTO.getEmail() != null) {
			userVO.setEmail(userDTO.getEmail());
		}
		
		if (userDTO.getNome() != null) {
			userVO.setNome(userDTO.getNome());
		}

		if (userDTO.getTel1() != null) {
			userVO.setTel1(userDTO.getTel1());
		}
		
		if (userDTO.getTel2() != null) {
			userVO.setTel2(userDTO.getTel2());
		}
		
		if (updateRoles) {
			Map<String, RoleVO> oldRoles = new TreeMap<>();
			for (RoleVO roleVO: userVO.getRoles()) {
				oldRoles.put(roleVO.getName(), roleVO);
			}
			
			
			TreeSet<RoleVO> newRoles = new TreeSet<>();
			TreeMap<String, RoleVO> rolesToFind = new TreeMap<>();
			
			if (userDTO.getRoles() != null) {
				for (String roleName: userDTO.getRoles()) {
					if (oldRoles.containsKey(roleName)) {
						newRoles.add(oldRoles.get(roleName));
					} else {
						rolesToFind.put(roleName, null);
					}
				}
			}
			if (!rolesToFind.isEmpty()) {
				roleRepository.findAllById(rolesToFind.keySet())
					.forEach(r -> {rolesToFind.put(r.getName(), r);});
			}
			
			//Se ci sono dei ruoli non trovati, lancia un'eccezione
			for (Map.Entry<String, RoleVO> roleEntry: rolesToFind.entrySet()) {
				if (roleEntry.getValue() == null) {
					throw new ApplicationException(HttpStatus.NOT_FOUND.value(),
							AppError.ROLE_NOT_FOUND.getErrorCode(),
							errorMessage(AppError.ROLE_NOT_FOUND, roleEntry.getKey()),
							errorLogMessage(AppError.ROLE_NOT_FOUND, roleEntry.getKey()));
				}
			}
			newRoles.addAll(rolesToFind.values());
			userVO.getRoles().clear();
			userVO.getRoles().addAll(newRoles);
			
		}
		
		userRepository.saveAndFlush(userVO);
		
	}


}
