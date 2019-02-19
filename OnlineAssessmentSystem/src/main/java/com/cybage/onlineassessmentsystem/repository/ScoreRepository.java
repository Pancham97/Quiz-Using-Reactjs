package com.cybage.onlineassessmentsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cybage.onlineassessmentsystem.model.Score;
import com.cybage.onlineassessmentsystem.model.User;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long>{
	
	@Query(value="select * from scores where user_id=:user and test_id=:test" , nativeQuery=true)
	Score getTestScore(@Param("user")long userid, @Param("test")long testid);
	
	List<Score> findByUser(User user);

}
