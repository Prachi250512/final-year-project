package com.sidhivinayak.bhakti_hub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sidhivinayak.bhakti_hub.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
