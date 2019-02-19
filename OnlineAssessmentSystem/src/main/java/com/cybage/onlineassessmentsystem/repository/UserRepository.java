package com.cybage.onlineassessmentsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybage.onlineassessmentsystem.model.User;

//This contains all user related database operations 
public interface UserRepository extends JpaRepository<User, Long> {
	
	Optional<User> findByUsername(String username);
	Boolean existsByUsername(String username);
	Boolean existsByEmail(String email);

}
