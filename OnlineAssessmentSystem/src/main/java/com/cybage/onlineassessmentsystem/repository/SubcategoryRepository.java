package com.cybage.onlineassessmentsystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cybage.onlineassessmentsystem.model.Subcategory;
import java.lang.Long;
import java.lang.String;

@Repository
public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {
	
	Optional<Subcategory> findById(Long id);
	
	@Query(value = "select * from subcategory where name like %:name%", nativeQuery=true)
	List<Subcategory> findCategories(@Param("name")String name);
	
	Boolean existsByName(String name);

	Optional<Subcategory>  findByName(String subcatname);
}
