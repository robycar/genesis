package it.reply.sipp.security;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity(debug = false)
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{

	private static final String[] UNPROTECTED_URLS = { "/api/auth/login", "/api/test/**" };

	
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	
	@Autowired
	private ForbiddenEntryPoint forbiddenEntryPoint;
	
	
	
	@Bean(name="authenticationManager")
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	@Bean
	public TokenAuthenticationFilter tokenAuthenticationFilter() {
		return new TokenAuthenticationFilter();
	};

	
	
//	@Autowired
//	private TokenAuthenticationProvider tokenAuthenticationProvider;
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		//auth.authenticationProvider(tokenAuthenticationProvider);
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		String encodingId = "bcrypt";
		
		Map<String, PasswordEncoder> encoders = new HashMap<>();
		encoders.put(encodingId, new BCryptPasswordEncoder());
		encoders.put("pbkdf2", new Pbkdf2PasswordEncoder());
		encoders.put("scrypt", new SCryptPasswordEncoder());
		encoders.put("noop", NoOpPasswordEncoder.getInstance());

		return new DelegatingPasswordEncoder(encodingId, encoders);
	}

//	@Override
//	public void configure(WebSecurity web) throws Exception {
//		web.ignoring().antMatchers(UNPROTECTED_URLS);
//	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable()
		.exceptionHandling().authenticationEntryPoint(forbiddenEntryPoint)
		.and()
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
		.authorizeRequests().antMatchers(UNPROTECTED_URLS).permitAll()
		.antMatchers(HttpMethod.GET, "/api/user/**").hasAuthority("FUN_user.view")
		.antMatchers(HttpMethod.POST, "/api/user/**").hasAuthority("FUN_user.edit")
		.antMatchers(HttpMethod.PUT, "/api/user/**").hasAuthority("FUN_user.edit")
		.anyRequest().authenticated()
		.and()
		.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
		
//		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//		.and()
//		.exceptionHandling().authenticationEntryPoint(null)
//		.defaultAuthenticationEntryPointFor(forbiddenEntryPoint(), PROTECTED_URS)
//		.and()
//		.authenticationProvider(tokenAuthenticationProvider)
//		.addFilterBefore(restAuthenticationFilter(), AnonymousAuthenticationFilter.class)
//		.authorizeRequests().anyRequest().authenticated()
//		.and()
//		.csrf().disable()
//		.formLogin().disable()
//		.httpBasic().disable()
//		.logout().disable()
		;
	}

	


//	@Bean
//	public AuthenticationSuccessHandler successHandler() {
//		SimpleUrlAuthenticationSuccessHandler successHandler = new SimpleUrlAuthenticationSuccessHandler();
//		successHandler.setRedirectStrategy(new NoRedirectStrategy());
//		return successHandler;
//	}



}
