package com.sidhivinayak.bhakti_hub.controller;

import com.sidhivinayak.bhakti_hub.entity.Product;
import com.sidhivinayak.bhakti_hub.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.*;
import java.io.IOException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @PostMapping(consumes = "multipart/form-data")
    public Product createProduct(
            @RequestParam String name,
            @RequestParam String category,
            @RequestParam Double price,
            @RequestParam(required = false) Double originalPrice,
            @RequestParam String description,
            @RequestParam Integer stock,
            @RequestParam(required = false) String badge,
            @RequestParam Boolean featured,
            @RequestParam MultipartFile image
    ) throws IOException {

        String uploadDir = "uploads/";
        Files.createDirectories(Paths.get(uploadDir));

        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.write(filePath, image.getBytes());

        Product product = new Product();
        product.setName(name);
        product.setCategory(category);
        product.setPrice(price);
        product.setOriginalPrice(originalPrice);
        product.setDescription(description);
        product.setStock(stock);
        product.setBadge(badge);
        product.setFeatured(featured);
        product.setImage(fileName);

        return productRepository.save(product);
    }

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String category,
            @RequestParam Double price,
            @RequestParam(required = false) Double originalPrice,
            @RequestParam String description,
            @RequestParam Integer stock,
            @RequestParam(required = false) String badge,
            @RequestParam Boolean featured,
            @RequestParam(required = false) MultipartFile image
    ) throws IOException {

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setName(name);
        existingProduct.setCategory(category);
        existingProduct.setPrice(price);
        existingProduct.setOriginalPrice(originalPrice);
        existingProduct.setDescription(description);
        existingProduct.setStock(stock);
        existingProduct.setBadge(badge);
        existingProduct.setFeatured(featured);

        // 🔥 IMAGE UPDATE LOGIC
        if (image != null && !image.isEmpty()) {

            // Delete old image
            if (existingProduct.getImage() != null) {
                Path oldImagePath = Paths.get("uploads/" + existingProduct.getImage());
                Files.deleteIfExists(oldImagePath);
            }

            // Save new image
            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path uploadPath = Paths.get("uploads");
            Files.createDirectories(uploadPath);

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            existingProduct.setImage(fileName);
        }

        return productRepository.save(existingProduct);
    }
}