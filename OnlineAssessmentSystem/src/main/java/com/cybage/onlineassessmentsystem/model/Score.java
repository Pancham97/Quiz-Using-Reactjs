package com.cybage.onlineassessmentsystem.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the scores database table.
 * 
 */
@Entity
@Table(name="scores")
@NamedQuery(name="Score.findAll", query="SELECT s FROM Score s")
public class Score implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(unique=true, nullable=false)
	private Long id;

	@Column(name="maximum_marks", nullable=false)
	private int maximumMarks;

	@Column(nullable=false)
	private int score;
	
	@Lob
	@Column(name="subskills_breaksdown", nullable=false, length=500)
	private String subskillsBreaksdown;

	//bi-directional many-to-one association to Test
	@ManyToOne
	@JoinColumn(name="test_id", nullable=false)
	private Test test;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="user_id", nullable=false)
	private User user;

	public Score() {
	}

	public Score(int maximumMarks, int score, String subskillsBreaksdown, Test test, User user) {
		super();
		this.maximumMarks = maximumMarks;
		this.score = score;
		this.subskillsBreaksdown = subskillsBreaksdown;
		this.test = test;
		this.user = user;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getMaximumMarks() {
		return this.maximumMarks;
	}

	public void setMaximumMarks(int maximumMarks) {
		this.maximumMarks = maximumMarks;
	}

	public int getScore() {
		return this.score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public String getSubskillsBreaksdown() {
		return this.subskillsBreaksdown;
	}

	public void setSubskillsBreaksdown(String subskillsBreaksdown) {
		this.subskillsBreaksdown = subskillsBreaksdown;
	}

	public Test getTest() {
		return this.test;
	}

	public void setTest(Test test) {
		this.test = test;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}