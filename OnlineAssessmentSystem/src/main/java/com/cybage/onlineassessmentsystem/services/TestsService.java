package com.cybage.onlineassessmentsystem.services;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cybage.onlineassessmentsystem.message.request.TestInsertRequest;
import com.cybage.onlineassessmentsystem.model.Score;
import com.cybage.onlineassessmentsystem.model.Subcategory;
import com.cybage.onlineassessmentsystem.model.Test;
import com.cybage.onlineassessmentsystem.model.User;
import com.cybage.onlineassessmentsystem.repository.CategoryRepository;
import com.cybage.onlineassessmentsystem.repository.ScoreRepository;
import com.cybage.onlineassessmentsystem.repository.SubcategoryRepository;
import com.cybage.onlineassessmentsystem.repository.TestRepository;
import com.cybage.onlineassessmentsystem.repository.UserRepository;
import com.cybage.onlineassessmentsystem.security.JwtProvider;

@Service
public class TestsService {

	@Autowired
	TestRepository testRepository;

	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	SubcategoryRepository subcategoryRepository;

	@Autowired
	private JwtProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ScoreRepository scoreRepository;

	@Transactional
	public ResponseEntity<String> insertTest(TestInsertRequest testInsertRequest) {
		Subcategory subCategory = subcategoryRepository.findById(testInsertRequest.getSubcatid()).get();
		Test test = new Test(testInsertRequest.getTestname(), testInsertRequest.getQuestion(), subCategory,
				testInsertRequest.getTime());
		testRepository.save(test);
		return ResponseEntity.ok().body("Test added successfully");
	}

	@Transactional
	public Object getTestById(long id, HttpServletRequest request) {

		String uname = tokenProvider.getUsernameFromJwtToken(getJwt(request));

		User user = userRepository.findByUsername(uname).get();

		Score score = scoreRepository.getTestScore(user.getId(), id);

		if (score == null) {
			Test test = new Test();
			Optional<Test> tests = testRepository.findById(id);
			if (tests.isPresent())
				test = tests.get();
			return test;
		}

		return score;
	}

	@Transactional
	public List<Test> getTestBySubcategory(Long id) {
		List<Test> tests = testRepository.getTestBySubcategory(id);
		return tests;
	}

	@Transactional
	public ResponseEntity<String> updateExistingTest(Long id, TestInsertRequest testInsertRequest) {
		if (testRepository.existsById(id)) {
			Test test = testRepository.findById(id).get();
			Subcategory subcat = subcategoryRepository.findById(id).get();
			test.setName(testInsertRequest.getTestname());
			test.setSubcategory(subcat);
			test.setQuestions(testInsertRequest.getQuestion());
			testRepository.save(test);
			return ResponseEntity.ok().body("test updated successfully");
		}
		return new ResponseEntity<String>("test doesn't exist", HttpStatus.BAD_REQUEST);
	}

	@Transactional
	public ResponseEntity<String> deleteExistingTest(Long id) {
		if ((!testRepository.existsById(id))) {
			return new ResponseEntity<String>("Test Doesn't exist", HttpStatus.BAD_REQUEST);
		}
		testRepository.deleteById(id);
		return ResponseEntity.ok().body("deleted successfully");
	}

	@Transactional
	public List<Test> getAllTests() {
		return testRepository.findAll();
	}

	private String getJwt(HttpServletRequest request) {
		String authHeader = request.getHeader("Authorization");
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			return authHeader.replace("Bearer ", "");
		}
		return null;
	}

}