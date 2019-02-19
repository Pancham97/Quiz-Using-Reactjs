package com.cybage.onlineassessmentsystem.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.onlineassessmentsystem.message.request.LoginForm;
import com.cybage.onlineassessmentsystem.message.request.SignUpForm;
import com.cybage.onlineassessmentsystem.services.AuthService;

//This Class is for Authorization Controller

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthService authService;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {
		return authService.signInService(loginRequest);
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
		return authService.signUpService(signUpRequest);
	}
	
	@GetMapping("/checkuname")
	public ResponseEntity<?> checkForUsername(@RequestParam(name = "uname")String username){
		return authService.checkUsername(username);
	}
	
	@GetMapping("/checkemail")
	public ResponseEntity<?> checkForEmail(@RequestParam(name = "email")String email){
		return authService.checkEmail(email);
	}

}
