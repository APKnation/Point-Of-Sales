package com.pos.pos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    
    @NotBlank
    private String productName;
    private String barcode;
    private String sku;
    
    private Long categoryId;
    private Long brandId;
    
    @NotNull
    private BigDecimal costPrice;
    
    @NotNull
    private BigDecimal sellingPrice;
    
    @NotNull
    private Integer quantity;
    
    private Integer reorderLevel;
    private String image;
    private String description;
    private String status;
}
