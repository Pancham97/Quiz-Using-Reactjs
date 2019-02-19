package com.cybage.onlineassessmentsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cybage.onlineassessmentsystem.model.Test;

import java.util.List;
import java.util.Optional;
import java.lang.Long;

@Repository
public interface TestRepository extends JpaRepository<Test, Long> {

	Optional<Test> findById(Long id);

	@Query(value = "select * from tests where subcat_id=:subcat", nativeQuery = true)
	List<Test> getTestBySubcategory(@Param("subcat") long subcatid);

}
