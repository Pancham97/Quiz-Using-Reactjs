package com.cybage.onlineassessmentsystem.message.request;

import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

//Request Coming from Front End from Signup Form

@Data
public class SignUpForm {

	@NotBlank
	@Size(min = 3, max = 50)
	private String name;

	@NotBlank
	@Size(min = 3, max = 50)
	private String username;

	@NotBlank
	@Size(min = 6, max = 40)
	private String password;

	@NotBlank
	@Size(max = 60)
	@Email
	private String email;

	private Set<String> role;

}
