package com.pos.pos.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDto {
    private BigDecimal todaySales;
    private BigDecimal monthlySales;
    private Long totalProducts;
    private Long lowStockProducts;
    private Long outOfStockProducts;
    private Long totalCustomers;
    private Long totalSuppliers;
}
