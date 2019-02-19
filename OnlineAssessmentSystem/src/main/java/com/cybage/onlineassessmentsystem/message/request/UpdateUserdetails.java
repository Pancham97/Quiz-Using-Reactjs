package com.cybage.onlineassessmentsystem.message.request;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserdetails {

	@Size(min = 3, max = 50)
	private String username;

	@Size(min = 3, max = 50)
	private String name;

	@Size(min = 6, max = 40)
	private String password;

	private Set<String> roles = new HashSet<>();

}
