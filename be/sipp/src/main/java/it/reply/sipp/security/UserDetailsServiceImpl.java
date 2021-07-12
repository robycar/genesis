package it.reply.sipp.security;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import it.reply.sipp.model.UserVO;
import it.reply.sipp.model.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return userRepository.findByUsername(username)
		.map(u -> User.builder()
					.username(u.getUsername())
					.password(u.getPassword())
					.authorities(readRolesAndFunctionsForUser(u))
					.build())
		.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
	}
	
	public List<GrantedAuthority> readRolesAndFunctionsForUser(UserVO u) {
		List<GrantedAuthority> authorities = new ArrayList<>();
		
		Set<String> functions = userRepository.functionsPerUser(u.getId());
		for (String function: functions) {
			authorities.add(new SimpleGrantedAuthority("FUN_" + function));
		}
		
		return authorities;
	}

	
}
