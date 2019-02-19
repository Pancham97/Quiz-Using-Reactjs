package com.cybage.onlineassessmentsystem.services;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cybage.onlineassessmentsystem.message.request.LoginForm;
import com.cybage.onlineassessmentsystem.message.request.SignUpForm;
import com.cybage.onlineassessmentsystem.message.response.JwtResponse;
import com.cybage.onlineassessmentsystem.model.Role;
import com.cybage.onlineassessmentsystem.model.RoleName;
import com.cybage.onlineassessmentsystem.model.User;
import com.cybage.onlineassessmentsystem.repository.RoleRepository;
import com.cybage.onlineassessmentsystem.repository.UserRepository;
import com.cybage.onlineassessmentsystem.security.JwtProvider;

@Service
public class AuthService {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JwtProvider jwtProvider;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	public ResponseEntity<?> signInService(LoginForm loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		User user = userRepository.findByUsername(loginRequest.getUsername()).get();

		String jwt = jwtProvider.generateJwtToken(authentication);
		return ResponseEntity.ok(new JwtResponse(jwt,user.getRole(),user.getName(),user.getId()));
	}

	public ResponseEntity<?> signUpService(SignUpForm signUpRequest) {

		User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()));

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

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
		userRepository.save(user);

		return ResponseEntity.ok().body("User registered successfully!");
	}

	public ResponseEntity<?> checkUsername(String username) {
		if (userRepository.existsByUsername(username)) {
			return new ResponseEntity<String>("Fail -> Username is already taken", HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok().body("Success");
	}

	public ResponseEntity<?> checkEmail(String email) {
		if (userRepository.existsByEmail(email)) {
			return new ResponseEntity<String>("Fail -> Email is already registered", HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok().body("Success");
	}

}
