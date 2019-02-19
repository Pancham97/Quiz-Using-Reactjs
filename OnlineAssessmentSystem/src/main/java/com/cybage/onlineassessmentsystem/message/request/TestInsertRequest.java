package com.cybage.onlineassessmentsystem.message.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestInsertRequest {
	@NotNull
	private Long subcatid;

	@NotBlank
	private String testname;

	@NotBlank
	private String question;
	
	@NotNull
	private int time;

}
