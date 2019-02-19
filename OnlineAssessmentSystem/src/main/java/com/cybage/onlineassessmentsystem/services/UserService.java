package com.cybage.onlineassessmentsystem.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cybage.onlineassessmentsystem.message.request.UpdateUserdetails;
import com.cybage.onlineassessmentsystem.message.response.UsersDataRetrieval;
import com.cybage.onlineassessmentsystem.model.Role;
import com.cybage.onlineassessmentsystem.model.RoleName;
import com.cybage.onlineassessmentsystem.model.User;
import com.cybage.onlineassessmentsystem.repository.RoleRepository;
import com.cybage.onlineassessmentsystem.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Transactional
	public List<UsersDataRetrieval> getAllUsers() {
		List<User> users = userRepository.findAll();
		List<UsersDataRetrieval> userlist = new ArrayList<>();
		for (User u : users) {
			userlist.add(new UsersDataRetrieval(u.getId(), u.getName(), u.getUsername(), u.getEmail()));
		}
		return userlist;
	}

	@Transactional
	public UsersDataRetrieval getUserById(Long id) {
		User user = userRepository.findById(id).get();
		return new UsersDataRetrieval(user.getId(), user.getName(), user.getUsername(), user.getEmail());
	}

	@Transactional
	public ResponseEntity<String> updateExistingUser(Long id, UpdateUserdetails userdetails) {
		User user = userRepository.findById(id).get();
		// checking for not null
		if ((userdetails.getName()) != null) {
			user.setName(userdetails.getName());
		}
		// checking for not null
		if ((userdetails.getUsername()) != null) {
			user.setUsername(userdetails.getUsername());
		}
		// checking for not null
		if ((userdetails.getRoles()) != null) {
			Set<String> strRoles = userdetails.getRoles();
			Set<Role> roles = new HashSet<>();

			// checking for user type
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
					roles.add(adminRole);

					break;
				default:
					Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
					roles.add(userRole);
				}
			});
			user.setRole(roles);
		}
		userRepository.save(user);
		return ResponseEntity.ok().body("User data Updated!");
	}

	public ResponseEntity<String> deleteExistingUser(Long id) {
		userRepository.deleteById(id);
		roleRepository.deleteById(id);
		return ResponseEntity.ok().body("User deleted successfully!");
	}
}
