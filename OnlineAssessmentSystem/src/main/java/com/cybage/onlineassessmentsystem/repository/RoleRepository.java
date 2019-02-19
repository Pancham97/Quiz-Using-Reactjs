package com.cybage.onlineassessmentsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybage.onlineassessmentsystem.model.Role;
import com.cybage.onlineassessmentsystem.model.RoleName;

//This contains all role related database operations 
public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(RoleName roleName);
}
