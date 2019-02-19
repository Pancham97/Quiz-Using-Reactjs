package com.cybage.onlineassessmentsystem.services;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cybage.onlineassessmentsystem.model.User;
import com.cybage.onlineassessmentsystem.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	UserRepository userRepository;
	
	//This method will search for user from username
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with username " + username));

		return UserPrinciple.build(user);
	}
}
