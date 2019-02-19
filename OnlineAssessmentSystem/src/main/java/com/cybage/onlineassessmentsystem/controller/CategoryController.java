package com.cybage.onlineassessmentsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.onlineassessmentsystem.model.Category;
import com.cybage.onlineassessmentsystem.repository.CategoryRepository;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
	
	@Autowired
	CategoryRepository categoryRepository;
	
	@GetMapping("/all")
	public List<Category> getAllCategories(){
		return categoryRepository.findAll();
	}

}
