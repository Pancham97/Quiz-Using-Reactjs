package com.cybage.onlineassessmentsystem.message.response;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersDataRetrieval {

	@NotBlank
	private Long id;

	@NotBlank
	@Size(min = 3, max = 50)
	private String username;

	@NotBlank
	@Size(min = 3, max = 50)
	private String name;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

}