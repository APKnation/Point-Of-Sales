package com.pos.pos.service.impl;

import com.pos.pos.dto.ExpenseDto;
import com.pos.pos.entity.Expense;
import com.pos.pos.exception.PosAPIException;
import com.pos.pos.repository.ExpenseRepository;
import com.pos.pos.service.ExpenseService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseServiceImpl(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @Override
    public ExpenseDto createExpense(ExpenseDto dto) {
        Expense expense = new Expense();
        expense.setExpenseName(dto.getExpenseName()); expense.setAmount(dto.getAmount());
        expense.setCategory(dto.getCategory()); expense.setExpenseDate(dto.getExpenseDate());
        expense.setDescription(dto.getDescription());
        return mapToDto(expenseRepository.save(expense));
    }

    @Override
    public ExpenseDto getExpenseById(Long id) {
        return mapToDto(expenseRepository.findById(id)
                .orElseThrow(() -> new PosAPIException(HttpStatus.NOT_FOUND, "Expense not found")));
    }

    @Override
    public List<ExpenseDto> getAllExpenses() {
        return expenseRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public ExpenseDto updateExpense(ExpenseDto dto, Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new PosAPIException(HttpStatus.NOT_FOUND, "Expense not found"));
        expense.setExpenseName(dto.getExpenseName()); expense.setAmount(dto.getAmount());
        expense.setCategory(dto.getCategory()); expense.setExpenseDate(dto.getExpenseDate());
        expense.setDescription(dto.getDescription());
        return mapToDto(expenseRepository.save(expense));
    }

    @Override
    public void deleteExpense(Long id) {
        expenseRepository.delete(expenseRepository.findById(id)
                .orElseThrow(() -> new PosAPIException(HttpStatus.NOT_FOUND, "Expense not found")));
    }

    private ExpenseDto mapToDto(Expense e) {
        ExpenseDto dto = new ExpenseDto();
        dto.setId(e.getId()); dto.setExpenseName(e.getExpenseName()); dto.setAmount(e.getAmount());
        dto.setCategory(e.getCategory()); dto.setExpenseDate(e.getExpenseDate()); dto.setDescription(e.getDescription());
        return dto;
    }
}
