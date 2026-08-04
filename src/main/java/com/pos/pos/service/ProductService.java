package com.pos.pos.service;

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
