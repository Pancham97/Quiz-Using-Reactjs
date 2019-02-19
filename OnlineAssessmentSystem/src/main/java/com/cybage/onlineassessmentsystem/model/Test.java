package com.cybage.onlineassessmentsystem.model;

import javax.persistence.*;

/**
 * The persistent class for the tests database table.
 * 
 */
@Entity
@Table(name = "tests")
@NamedQuery(name = "Test.findAll", query = "SELECT t FROM Test t")
public class Test {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private Long id;

	@Column(nullable = false, length = 100)
	private String name;

	@Lob
	@Column(nullable = false)
	private String questions;
	
	

	@Column(nullable = false, length = 20)
	private int time;

	// bi-directional many-to-one association to Subcategory
	@ManyToOne
	@JoinColumn(name = "subcat_id", nullable = false)
	private Subcategory subcategory;

	public Test() {
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getQuestions() {
		return this.questions;
	}

	public Test(String name, String questions, Subcategory subcategory , int time) {
		super();
		this.name = name;
		this.questions = questions;
		this.subcategory = subcategory;
		this.time = time;
	}

	public void setQuestions(String questions) {
		this.questions = questions;
	}

	public Subcategory getSubcategory() {
		return this.subcategory;
	}

	public void setSubcategory(Subcategory subcategory) {
		this.subcategory = subcategory;
	}
	
	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

}