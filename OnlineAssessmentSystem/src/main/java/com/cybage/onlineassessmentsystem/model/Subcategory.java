package com.cybage.onlineassessmentsystem.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the subcategory database table.
 * 
 */
@Entity
@Table(name="subcategory")
@NamedQuery(name="Subcategory.findAll", query="SELECT s FROM Subcategory s")
public class Subcategory implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(unique=true, nullable=false)
	private Long id;

	@Column(nullable=false, length=50)
	private String name;

	//bi-directional many-to-one association to Category
	@ManyToOne
	@JoinColumn(name="cat_id", nullable=false)
	private Category category;

	public Subcategory(String name, Category category) {
		this.name = name;
		this.category = category;
	}

	public Subcategory() {
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

	public Category getCategory() {
		return this.category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}


}