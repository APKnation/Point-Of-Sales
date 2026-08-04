package com.pos.pos.service.impl;

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
