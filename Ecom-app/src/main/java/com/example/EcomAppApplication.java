package com.example;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import com.example.dao.CategoryRepository;
import com.example.dao.ProductRepository;
import com.example.entities.Category;
import com.example.entities.Product;

import net.bytebuddy.utility.RandomString;

@SpringBootApplication
public class EcomAppApplication implements CommandLineRunner {
	
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private RepositoryRestConfiguration configuration;

	public static void main(String[] args) {
		SpringApplication.run(EcomAppApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// pour afficher l'id
		configuration.exposeIdsFor(Product.class,Category.class);
		
		categoryRepository.save(new Category(null,"Ordinateurs",null,null,null));
		categoryRepository.save(new Category(null,"Printers",null,null,null));
		categoryRepository.save(new Category(null,"SmartPhones",null,null,null));
		
		Random rnd = new Random();
		
		categoryRepository.findAll().forEach(c->{
			for (int i = 0; i < 10; i++) {
				Product p = new Product();
				p.setName(RandomString.make(18));
				p.setCurrentPrice(100+rnd.nextInt(10000));
				p.setAvailable(rnd.nextBoolean());
				p.setPromotion(rnd.nextBoolean());
				p.setSelected(rnd.nextBoolean());
				p.setCategory(c);
				p.setPhotoName("unknown.png");
				productRepository.save(p);
			}
			
			
		});
	}

}
