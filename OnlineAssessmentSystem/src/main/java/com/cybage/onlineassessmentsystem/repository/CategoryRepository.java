package com.cybage.onlineassessmentsystem.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cybage.onlineassessmentsystem.model.Category;
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

}
