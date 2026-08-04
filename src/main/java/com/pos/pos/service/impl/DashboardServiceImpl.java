package com.pos.pos.service.impl;

import com.pos.pos.dto.DashboardDto;
import com.pos.pos.repository.*;
import com.pos.pos.service.DashboardService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final SupplierRepository supplierRepository;
    private final SaleRepository saleRepository;

    public DashboardServiceImpl(ProductRepository productRepository,
                                CustomerRepository customerRepository,
                                SupplierRepository supplierRepository,
                                SaleRepository saleRepository) {
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.supplierRepository = supplierRepository;
        this.saleRepository = saleRepository;
    }

    @Override
    public DashboardDto getDashboardStats() {
        DashboardDto dto = new DashboardDto();
        dto.setTotalProducts(productRepository.count());
        dto.setTotalCustomers(customerRepository.count());
        dto.setTotalSuppliers(supplierRepository.count());
        dto.setLowStockProducts(productRepository.findAll().stream()
                .filter(p -> p.getQuantity() != null && p.getReorderLevel() != null
                        && p.getQuantity() > 0 && p.getQuantity() <= p.getReorderLevel())
                .count());
        dto.setOutOfStockProducts(productRepository.findAll().stream()
                .filter(p -> p.getQuantity() != null && p.getQuantity() <= 0)
                .count());
        dto.setTodaySales(BigDecimal.ZERO);
        dto.setMonthlySales(BigDecimal.ZERO);
        return dto;
    }
}
