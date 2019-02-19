package com.cybage.onlineassessmentsystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.onlineassessmentsystem.model.Subcategory;
import com.cybage.onlineassessmentsystem.repository.SubcategoryRepository;

@Service
public class SubcategoryService {
	
	@Autowired
	SubcategoryRepository subcategoryRepository;
	
	public List<Subcategory> searchSubCategory(String name){
		return subcategoryRepository.findCategories(name);
	}
	
	public List<Subcategory> getAllSubCategories(){
		return subcategoryRepository.findAll();
	}

}
