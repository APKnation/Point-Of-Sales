package com.pos.pos.service;

import com.pos.pos.dto.ExpenseDto;
import java.util.List;

public interface ExpenseService {
    ExpenseDto createExpense(ExpenseDto dto);
    ExpenseDto getExpenseById(Long id);
    List<ExpenseDto> getAllExpenses();
    ExpenseDto updateExpense(ExpenseDto dto, Long id);
    void deleteExpense(Long id);
}
