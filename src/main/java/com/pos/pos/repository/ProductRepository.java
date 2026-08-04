package com.pos.pos.repository;

import com.pos.pos.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    java.util.Optional<Product> findByBarcode(String barcode);
    java.util.Optional<Product> findBySku(String sku);
    java.util.List<Product> findByStatus(String status);
}
