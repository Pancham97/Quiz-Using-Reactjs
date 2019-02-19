package com.cybage.onlineassessmentsystem.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cybage.onlineassessmentsystem.security.JwtAuthEntryPoint;
import com.cybage.onlineassessmentsystem.security.JwtAuthenticationTokenFilter;
import com.cybage.onlineassessmentsystem.services.UserDetailsServiceImpl;

//Configuration file for Spring Security

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class JwtSecurityConfig extends WebSecurityConfigurerAdapter {
	// This is used for custom user details service
	@Autowired
	UserDetailsServiceImpl userDetailsService;

	// This object will be used for handling unauthorized requests
	@Autowired
	private JwtAuthEntryPoint unauthorizedHandler;

	// This will return the authentication token
	@Bean
	public JwtAuthenticationTokenFilter authenticationJwtTokenFilter() {
		return new JwtAuthenticationTokenFilter();
	}

	// This method will set user details for Authentication Manager and also set
	// Password Encoder
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

	// Returns instance of Authentication Manager of Spring Security
	@Bean
	@Override
	protected AuthenticationManager authenticationManager() throws Exception {
		// TODO Auto-generated method stub
		return super.authenticationManager();
	}

	// Returns the instance of BCryptPasswordEncoder for encoding the password
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// This method comes from WebSecurityConfigurerAdapter and it will configure
	// which urls to allow and which urls to authenticate
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().authorizeRequests().antMatchers("/api/**").permitAll().anyRequest()
				.authenticated().and().exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
	}
}
