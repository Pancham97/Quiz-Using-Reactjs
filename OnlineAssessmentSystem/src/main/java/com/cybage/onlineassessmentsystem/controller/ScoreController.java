package com.cybage.onlineassessmentsystem.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.onlineassessmentsystem.message.request.ScoreInsertRequest;
import com.cybage.onlineassessmentsystem.model.Score;
import com.cybage.onlineassessmentsystem.repository.ScoreRepository;
import com.cybage.onlineassessmentsystem.services.ScoreService;

@RestController
@RequestMapping("/api/score")
public class ScoreController {

	@Autowired
	ScoreRepository scoreRepository;

	@Autowired
	ScoreService scoreService;

	@GetMapping
	public Score getTestScore(@RequestParam(name = "user") long userid, @RequestParam(name = "test") long testid) {

		return scoreService.getScore(userid, testid);
	}

	@PostMapping
	public ResponseEntity<String> setTestScore(@Valid @RequestBody ScoreInsertRequest scoreInsertRequest) {
		return scoreService.insertScore(scoreInsertRequest);
	}
	
	@GetMapping("/{id}")
	public List<Score> getScoreHistory(@PathVariable("id") long userId){
		return scoreService.getTestHistory(userId);
	}

}
