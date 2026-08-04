import os

base_path = "src/main/java/com/pos/pos"

files = {
    "dto/SaleItemDto.java": """package com.pos.pos.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaleItemDto {
    private Long productId;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal discount;
    private BigDecimal total;
}
""",
    "dto/SaleDto.java": """package com.pos.pos.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaleDto {
    private Long id;
    private String receiptNumber;
    private Long customerId;
    private Long cashierId;
    private BigDecimal subTotal;
    private BigDecimal tax;
    private BigDecimal discount;
    private BigDecimal grandTotal;
    private String paymentMethod;
    private String notes;
    private LocalDateTime saleDate;
    private List<SaleItemDto> items;
}
""",
    "service/SaleService.java": """package com.pos.pos.service;

import com.pos.pos.dto.SaleDto;
import java.util.List;

public interface SaleService {
    SaleDto createSale(SaleDto saleDto, String cashierUsername);
    SaleDto getSaleById(Long id);
    List<SaleDto> getAllSales();
}
""",
    "service/impl/SaleServiceImpl.java": """package com.pos.pos.service.impl;

import com.pos.pos.dto.SaleDto;
import com.pos.pos.dto.SaleItemDto;
import com.pos.pos.entity.*;
import com.pos.pos.exception.PosAPIException;
import com.pos.pos.repository.*;
import com.pos.pos.service.SaleService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SaleServiceImpl implements SaleService {

    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final InventoryRepository inventoryRepository;

    public SaleServiceImpl(SaleRepository saleRepository, ProductRepository productRepository, 
                           CustomerRepository customerRepository, UserRepository userRepository,
                           InventoryRepository inventoryRepository) {
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    @Transactional
    public SaleDto createSale(SaleDto saleDto, String cashierUsername) {
        User cashier = userRepository.findByUsername(cashierUsername)
                .orElseThrow(() -> new PosAPIException(HttpStatus.NOT_FOUND, "Cashier not found"));

        Customer customer = null;
        if(saleDto.getCustomerId() != null) {
            customer = customerRepository.findById(saleDto.getCustomerId()).orElse(null);
        }

        Sale sale = new Sale();
        sale.setReceiptNumber(UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        sale.setCustomer(customer);
        sale.setCashier(cashier);
        sale.setSubTotal(saleDto.getSubTotal());
        sale.setTax(saleDto.getTax());
        sale.setDiscount(saleDto.getDiscount());
        sale.setGrandTotal(saleDto.getGrandTotal());
        sale.setPaymentMethod(saleDto.getPaymentMethod());
        sale.setNotes(saleDto.getNotes());
        
        List<SaleItem> saleItems = new ArrayList<>();
        
        for (SaleItemDto itemDto : saleDto.getItems()) {
            Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new PosAPIException(HttpStatus.NOT_FOUND, "Product not found"));
                    
            if (product.getQuantity() < itemDto.getQuantity()) {
                throw new PosAPIException(HttpStatus.BAD_REQUEST, "Insufficient stock for product: " + product.getProductName());
            }

            // Decrease Stock
            product.setQuantity(product.getQuantity() - itemDto.getQuantity());
            productRepository.save(product);

            // Record Inventory Movement
            Inventory inventory = new Inventory();
            inventory.setProduct(product);
            inventory.setTransactionType("OUT");
            inventory.setQuantity(itemDto.getQuantity());
            inventory.setRemarks("Sale " + sale.getReceiptNumber());
            inventoryRepository.save(inventory);

            SaleItem saleItem = new SaleItem();
            saleItem.setSale(sale);
            saleItem.setProduct(product);
            saleItem.setQuantity(itemDto.getQuantity());
            saleItem.setUnitPrice(itemDto.getUnitPrice());
            saleItem.setDiscount(itemDto.getDiscount());
            saleItem.setTotal(itemDto.getTotal());
            saleItems.add(saleItem);
        }
        
        sale.setItems(saleItems);
        Sale savedSale = saleRepository.save(sale);
        return mapToDTO(savedSale);
    }

    @Override
    public SaleDto getSaleById(Long id) {
        Sale sale = saleRepository.findById(id).orElseThrow(
                () -> new PosAPIException(HttpStatus.NOT_FOUND, "Sale not found")
        );
        return mapToDTO(sale);
    }

    @Override
    public List<SaleDto> getAllSales() {
        return saleRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private SaleDto mapToDTO(Sale sale){
        SaleDto dto = new SaleDto();
        dto.setId(sale.getId());
        dto.setReceiptNumber(sale.getReceiptNumber());
        if(sale.getCustomer() != null) dto.setCustomerId(sale.getCustomer().getId());
        if(sale.getCashier() != null) dto.setCashierId(sale.getCashier().getId());
        dto.setSubTotal(sale.getSubTotal());
        dto.setTax(sale.getTax());
        dto.setDiscount(sale.getDiscount());
        dto.setGrandTotal(sale.getGrandTotal());
        dto.setPaymentMethod(sale.getPaymentMethod());
        dto.setNotes(sale.getNotes());
        dto.setSaleDate(sale.getSaleDate());
        
        if (sale.getItems() != null) {
            dto.setItems(sale.getItems().stream().map(item -> {
                SaleItemDto itemDto = new SaleItemDto();
                itemDto.setProductId(item.getProduct().getId());
                itemDto.setQuantity(item.getQuantity());
                itemDto.setUnitPrice(item.getUnitPrice());
                itemDto.setDiscount(item.getDiscount());
                itemDto.setTotal(item.getTotal());
                return itemDto;
            }).collect(Collectors.toList()));
        }
        return dto;
    }
}
""",
    "controller/SaleController.java": """package com.pos.pos.controller;

import com.pos.pos.dto.SaleDto;
import com.pos.pos.service.SaleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @PostMapping
    public ResponseEntity<SaleDto> createSale(@RequestBody SaleDto saleDto, Authentication authentication){
        String username = authentication.getName();
        return new ResponseEntity<>(saleService.createSale(saleDto, username), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SaleDto>> getAllSales(){
        return ResponseEntity.ok(saleService.getAllSales());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SaleDto> getSaleById(@PathVariable Long id){
        return ResponseEntity.ok(saleService.getSaleById(id));
    }
}
"""
}

for filepath, content in files.items():
    with open(os.path.join(base_path, filepath), "w") as f:
        f.write(content)

print("Sale Service and Controller created successfully.")
