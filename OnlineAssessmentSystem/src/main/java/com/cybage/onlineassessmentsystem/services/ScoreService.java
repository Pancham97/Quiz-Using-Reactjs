package com.cybage.onlineassessmentsystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cybage.onlineassessmentsystem.message.request.ScoreInsertRequest;
import com.cybage.onlineassessmentsystem.model.Score;
import com.cybage.onlineassessmentsystem.model.Test;
import com.cybage.onlineassessmentsystem.model.User;
import com.cybage.onlineassessmentsystem.repository.ScoreRepository;
import com.cybage.onlineassessmentsystem.repository.TestRepository;
import com.cybage.onlineassessmentsystem.repository.UserRepository;

@Service
public class ScoreService {
	
	@Autowired
	UserRepository userRepository;

	@Autowired
	TestRepository testRepository;

	@Autowired
	ScoreRepository scoreRepository;
	
	public Score getScore(long userid, long testid){
		return scoreRepository.getTestScore(userid, testid);
	}
	
	public ResponseEntity<String> insertScore(ScoreInsertRequest scoreInsertRequest){
		if(testRepository.existsById(scoreInsertRequest.getTest_id())){
			User user = userRepository.findById(scoreInsertRequest.getUser_id()).get();
			Test test = testRepository.findById(scoreInsertRequest.getTest_id()).get();
			scoreRepository.save(new Score(scoreInsertRequest.getMax_marks(), scoreInsertRequest.getObtained_marks(), scoreInsertRequest.getSubSkillAnalysis(), test, user));
			return ResponseEntity.ok().body("Scores Inserted Successfully");
		}else{
			return new ResponseEntity<String>("Test does not exists!!",HttpStatus.BAD_REQUEST);
		}
	}
	
	public List<Score> getTestHistory(long userId){
		User user = userRepository.findById(userId).get();
		return scoreRepository.findByUser(user);
	}
 
}
