package com.cybage.onlineassessmentsystem.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
	
	@GetMapping("/api/test/user")
	@PreAuthorize("hasRole('USER')")
	public String userAccess(){
		return "User Contents!!";
	}
	
	@GetMapping("/api/test/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess(){
		return "Admin Contents!!";
	}

}
