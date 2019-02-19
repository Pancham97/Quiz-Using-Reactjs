package com.cybage.onlineassessmentsystem.message.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScoreInsertRequest {
	@NotNull
	private Long user_id;
	@NotNull
	private Long test_id;
	@NotNull
	private int max_marks;
	@NotNull
	private int obtained_marks;
	@NotBlank
	private String subSkillAnalysis;
}
