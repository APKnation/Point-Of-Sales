import os

base_path = "src/main/java/com/pos/pos"

files = {
    "service/ProductService.java": """package com.pos.pos.service;

import com.pos.pos.dto.ProductDto;
import java.util.List;

public interface ProductService {
    ProductDto createProduct(ProductDto productDto);
    ProductDto getProductById(Long id);
    List<ProductDto> getAllProducts();
    ProductDto updateProduct(ProductDto productDto, Long id);
    void deleteProduct(Long id);
    ProductDto getProductByBarcode(String barcode);
}
""",
    "service/impl/ProductServiceImpl.java": """package com.pos.pos.service.impl;

import com.pos.pos.dto.ProductDto;
import com.pos.pos.entity.Brand;
import com.pos.pos.entity.Category;
import com.pos.pos.entity.Product;
import com.pos.pos.exception.PosAPIException;
import com.pos.pos.repository.BrandRepository;
import com.pos.pos.repository.CategoryRepository;
import com.pos.pos.repository.ProductRepository;
import com.pos.pos.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;

    public ProductServiceImpl(ProductRepository productRepository, 
                              CategoryRepository categoryRepository, 
                              BrandRepository brandRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.brandRepository = brandRepository;
    }

    @Override
    public ProductDto createProduct(ProductDto productDto) {
        Product product = mapToEntity(productDto);
        Product newProduct = productRepository.save(product);
        return mapToDTO(newProduct);
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(
                () -> new PosAPIException(HttpStatus.NOT_FOUND, "Product not found")
        );
        return mapToDTO(product);
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public ProductDto updateProduct(ProductDto productDto, Long id) {
        Product product = productRepository.findById(id).orElseThrow(
                () -> new PosAPIException(HttpStatus.NOT_FOUND, "Product not found")
        );

        product.setProductName(productDto.getProductName());
        product.setBarcode(productDto.getBarcode());
        product.setSku(productDto.getSku());
        product.setCostPrice(productDto.getCostPrice());
        product.setSellingPrice(productDto.getSellingPrice());
        product.setQuantity(productDto.getQuantity());
        product.setReorderLevel(productDto.getReorderLevel());
        product.setImage(productDto.getImage());
        product.setDescription(productDto.getDescription());
        product.setStatus(productDto.getStatus());

        if(productDto.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDto.getCategoryId()).orElse(null);
            product.setCategory(category);
        }
        
        if(productDto.getBrandId() != null) {
            Brand brand = brandRepository.findById(productDto.getBrandId()).orElse(null);
            product.setBrand(brand);
        }

        Product updatedProduct = productRepository.save(product);
        return mapToDTO(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(
                () -> new PosAPIException(HttpStatus.NOT_FOUND, "Product not found")
        );
        productRepository.delete(product);
    }

    @Override
    public ProductDto getProductByBarcode(String barcode) {
        Product product = productRepository.findByBarcode(barcode).orElseThrow(
                () -> new PosAPIException(HttpStatus.NOT_FOUND, "Product not found with barcode: " + barcode)
        );
        return mapToDTO(product);
    }

    private ProductDto mapToDTO(Product product){
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setProductName(product.getProductName());
        productDto.setBarcode(product.getBarcode());
        productDto.setSku(product.getSku());
        if(product.getCategory() != null) productDto.setCategoryId(product.getCategory().getId());
        if(product.getBrand() != null) productDto.setBrandId(product.getBrand().getId());
        productDto.setCostPrice(product.getCostPrice());
        productDto.setSellingPrice(product.getSellingPrice());
        productDto.setQuantity(product.getQuantity());
        productDto.setReorderLevel(product.getReorderLevel());
        productDto.setImage(product.getImage());
        productDto.setDescription(product.getDescription());
        productDto.setStatus(product.getStatus());
        return productDto;
    }

    private Product mapToEntity(ProductDto productDto){
        Product product = new Product();
        product.setProductName(productDto.getProductName());
        product.setBarcode(productDto.getBarcode());
        product.setSku(productDto.getSku());
        
        if(productDto.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDto.getCategoryId()).orElse(null);
            product.setCategory(category);
        }
        
        if(productDto.getBrandId() != null) {
            Brand brand = brandRepository.findById(productDto.getBrandId()).orElse(null);
            product.setBrand(brand);
        }
        
        product.setCostPrice(productDto.getCostPrice());
        product.setSellingPrice(productDto.getSellingPrice());
        product.setQuantity(productDto.getQuantity());
        product.setReorderLevel(productDto.getReorderLevel());
        product.setImage(productDto.getImage());
        product.setDescription(productDto.getDescription());
        product.setStatus(productDto.getStatus());
        return product;
    }
}
""",
    "controller/ProductController.java": """package com.pos.pos.controller;

import com.pos.pos.dto.ProductDto;
import com.pos.pos.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ProductDto> createProduct(@Valid @RequestBody ProductDto productDto){
        return new ResponseEntity<>(productService.createProduct(productDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts(){
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id){
        return ResponseEntity.ok(productService.getProductById(id));
    }
    
    @GetMapping("/barcode/{barcode}")
    public ResponseEntity<ProductDto> getProductByBarcode(@PathVariable String barcode){
        return ResponseEntity.ok(productService.getProductByBarcode(barcode));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ProductDto> updateProduct(@Valid @RequestBody ProductDto productDto, @PathVariable Long id){
        return ResponseEntity.ok(productService.updateProduct(productDto, id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully.");
    }
}
"""
}

for filepath, content in files.items():
    with open(os.path.join(base_path, filepath), "w") as f:
        f.write(content)

print("Product Service and Controller created successfully.")
