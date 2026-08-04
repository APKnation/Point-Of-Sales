package com.pos.pos.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDto {
    private Long id;
    private String expenseName;
    private BigDecimal amount;
    private String category;
    private LocalDate expenseDate;
    private String description;
}
