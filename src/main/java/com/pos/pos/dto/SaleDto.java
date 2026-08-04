package com.pos.pos.dto;

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
