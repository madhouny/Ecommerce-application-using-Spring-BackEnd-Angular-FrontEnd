package com.example.web;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.ProductRepository;
import com.example.entities.Product;

@RestController
public class CatalogueRestController {
	
	
	private ProductRepository productRepository;

	public CatalogueRestController(ProductRepository productRepository) {
		super();
		this.productRepository = productRepository;
	}
	
	@GetMapping(path="photoProduct/{id}",produces = MediaType.IMAGE_PNG_VALUE)
	public byte[] getPhoto(@PathVariable("id")Long id) throws Exception {
		Product p = productRepository.findById(id).get();
		return Files.readAllBytes(Paths.get(System.getProperty("user.home")+"/ecomPhoto/products/"+p.getPhotoName()));
		
	}
}
