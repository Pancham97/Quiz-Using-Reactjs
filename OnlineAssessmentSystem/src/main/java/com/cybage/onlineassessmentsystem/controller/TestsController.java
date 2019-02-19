package com.cybage.onlineassessmentsystem.controller;


import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.onlineassessmentsystem.message.request.TestInsertRequest;
import com.cybage.onlineassessmentsystem.model.Test;
import com.cybage.onlineassessmentsystem.services.TestsService;

@RestController
@RequestMapping("/api/tests")
public class TestsController {
	
	@Autowired
	TestsService testsService;

	@PostMapping
	public ResponseEntity<String> createTest(@Valid @RequestBody TestInsertRequest testInsertRequest) {
		return testsService.insertTest(testInsertRequest);
	}

	@GetMapping
	public Object getTest(@RequestParam(name = "id") long id, HttpServletRequest request) {
		return testsService.getTestById(id,request);
	}
	
	@GetMapping("/all")
	public List<Test> getAllTests(){
		return testsService.getAllTests();
	}
	
	@GetMapping("/{id}")
	public List<Test> getTestsBySubcategory(@PathVariable(value = "id") long id) {
		return testsService.getTestBySubcategory(id);
	}
	@PutMapping("/update/{id}")
	public ResponseEntity<String> updateTest(@PathVariable(value = "id") Long tid,
			@Valid @RequestBody TestInsertRequest testInsertRequest) {
		return testsService.updateExistingTest(tid, testInsertRequest);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteTest(@PathVariable(value = "id") Long tid) {
		return testsService.deleteExistingTest(tid);
	}

}
