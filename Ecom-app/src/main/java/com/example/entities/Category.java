package com.example.entities;

import java.io.Serializable;
import java.util.Collection;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Category implements Serializable {

	public Long getId() {
		return id;
	}

	public Category() {
		super();
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Collection<Product> getProduits() {
		return produits;
	}

	public void setProduits(Collection<Product> produits) {
		this.produits = produits;
	}

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String photo;
	public Category(Long id, String name, String photo, String description, Collection<Product> produits) {
		super();
		this.id = id;
		this.name = name;
		this.photo = photo;
		this.description = description;
		this.produits = produits;
	}

	private String description;
	@OneToMany(mappedBy = "category")
	private Collection<Product> produits;
	
	public Category(Long id, String name, String description, Collection<Product> produits) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.produits = produits;
	}
	
	
}
