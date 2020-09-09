package com.example.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.entities.Product;
@CrossOrigin("*")
@RepositoryRestResource

public interface ProductRepository extends JpaRepository<Product, Long> {

	@RestResource(path= "/selectionner")
	@Query("select p from Product p where p.selected = True")
	public List<Product> selectedProducts();
	
	
	@RestResource(path= "/chercher")
	@Query("select p from Product p where p.name like %:x%")
	public List<Product> chercher(@Param("x") String mc);
	
}
