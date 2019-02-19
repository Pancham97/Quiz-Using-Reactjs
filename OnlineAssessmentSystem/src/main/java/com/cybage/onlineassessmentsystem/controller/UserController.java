package com.cybage.onlineassessmentsystem.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.onlineassessmentsystem.message.request.UpdateUserdetails;
import com.cybage.onlineassessmentsystem.message.response.UsersDataRetrieval;
import com.cybage.onlineassessmentsystem.services.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	UserService userService;

	// Getting all the users from database
	@GetMapping("/all")
	public List<UsersDataRetrieval> getAllUsers() {
		return userService.getAllUsers();
	}

	// Getting particular user by id from database
	@GetMapping("/{id}")
	public UsersDataRetrieval getParticularUser(@PathVariable(value = "id") Long id) {
		return userService.getUserById(id);
	}

	// update particular user from database
	@PutMapping("/update/{id}")
	public ResponseEntity<String> updateUser(@PathVariable(value = "id") Long uid,
			@Valid @RequestBody UpdateUserdetails userdetails) {
		return userService.updateExistingUser(uid, userdetails);
	}

	// delete particular user from Database
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable(value = "id") Long uid) {
		return userService.deleteExistingUser(uid);
	}

}
