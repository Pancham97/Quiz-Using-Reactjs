package com.cybage.onlineassessmentsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.onlineassessmentsystem.model.Subcategory;
import com.cybage.onlineassessmentsystem.services.SubcategoryService;


@RestController
@RequestMapping("/api/subcategory")
public class SubcategoryController {
	
	@Autowired
	SubcategoryService subcategoryService;
	
	@GetMapping("/search")
	public List<Subcategory> serachSubCategory(@RequestParam(name = "name")String name){
		return subcategoryService.searchSubCategory(name);
	}
	
	@GetMapping("/all")
	public List<Subcategory> getAllSubcatogeries(){
		return subcategoryService.getAllSubCategories();
	}

}
