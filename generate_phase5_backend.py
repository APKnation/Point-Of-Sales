import os

base_path = "src/main/java/com/pos/pos"

files = {
    "dto/SupplierDto.java": """package com.pos.pos.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SupplierDto {
    private Long id;
    private String companyName;
    private String contactPerson;
    private String phone;
    private String email;
    private String address;
}
""",
    "dto/ExpenseDto.java": """package com.pos.pos.dto;

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
""",
    "dto/BrandDto.java": """package com.pos.pos.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BrandDto {
    private Long id;
    private String name;
    private String description;
}
""",
    "dto/UserDto.java": """package com.pos.pos.dto;

import lombok.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String fullName;
    private String username;
    private String email;
    private String phone;
    private boolean isActive;
    private Set<String> roles;
}
""",
    "dto/DashboardDto.java": """package com.pos.pos.dto;

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
""",
    "service/SupplierService.java": """package com.pos.pos.service;

import com.pos.pos.dto.SupplierDto;
import java.util.List;

public interface SupplierService {
    SupplierDto createSupplier(SupplierDto dto);
    SupplierDto getSupplierById(Long id);
    List<SupplierDto> getAllSuppliers();
    SupplierDto updateSupplier(SupplierDto dto, Long id);
    void deleteSupplier(Long id);
}
""",
    "service/ExpenseService.java": """package com.pos.pos.service;

import com.pos.pos.dto.ExpenseDto;
import java.util.List;

public interface ExpenseService {
    ExpenseDto createExpense(ExpenseDto dto);
    ExpenseDto getExpenseById(Long id);
    List<ExpenseDto> getAllExpenses();
    ExpenseDto updateExpense(ExpenseDto dto, Long id);
    void deleteExpense(Long id);
}
""",
    "service/BrandService.java": """package com.pos.pos.service;

import com.pos.pos.dto.BrandDto;
import java.util.List;

public interface BrandService {
    BrandDto createBrand(BrandDto dto);
    BrandDto getBrandById(Long id);
    List<BrandDto> getAllBrands();
    BrandDto updateBrand(BrandDto dto, Long id);
    void deleteBrand(Long id);
}
""",
    "service/DashboardService.java": """package com.pos.pos.service;

import com.pos.pos.dto.DashboardDto;

public interface DashboardService {
    DashboardDto getDashboardStats();
}
""",
    "service/impl/SupplierServiceImpl.java": """package com.pos.pos.service.impl;

import com.pos.pos.dto.SupplierDto;
import com.pos.pos.entity.Supplier;
import com.pos.pos.exception.PosAPIException;
import com.pos.pos.repository.SupplierRepository;
import com.pos.pos.service.SupplierService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;

    public SupplierServiceImpl(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @Override
    public SupplierDto createSupplier(SupplierDto dto) {
        Supplier supplier = new Supplier();
        supplier.setCompanyName(dto.getCompanyName());
        supplier.setContactPerson(dto.getContactPerson());
        supplier.setPhone(dto.getPhone());
        supplier.setEmail(dto.getEmail());
        supplier.setAddress(dto.getAddress());
        return mapToDto(supplierRepository.save(supplier));
    }

    @Override
    public SupplierDto getSupplierById(Long id) {
        return mapToDto(supplierRepository.findById(id)
                .orElseThrow(() -> new PosAPIException(HttpStatus.NOT_FOUND, "Supplier not found")));
    }

    @Override
    public List<SupplierDto> getAllSuppliers() {
        return supplierRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public SupplierDto updateSupplier(SupplierDto dto, Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new PosAPIException(HttpStatus.NOT_FOUND, "Supplier not found"));
        supplier.setCompanyName(dto.getCompanyName());
        supplier.setContactPerson(dto.getContactPerson());
        supplier.setPhone(dto.getPhone());
        supplier.setEmail(dto.getEmail());
        supplier.setAddress(dto.getAddress());
        return mapToDto(supplierRepository.save(supplier));
    }

    @Override
    public void deleteSupplier(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new PosAPIException(HttpStatus.NOT_FOUND, "Supplier not found"));
        supplierRepository.delete(supplier);
    }

    private SupplierDto mapToDto(Supplier s) {
        SupplierDto dto = new SupplierDto();
        dto.setId(s.getId()); dto.setCompanyName(s.getCompanyName());
        dto.setContactPerson(s.getContactPerson()); dto.setPhone(s.getPhone());
        dto.setEmail(s.getEmail()); dto.setAddress(s.getAddress());
        return dto;
    }
}
""",
    "service/impl/ExpenseServiceImpl.java": """package com.pos.pos.service.impl;

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
""",
    "service/impl/BrandServiceImpl.java": """package com.pos.pos.service.impl;

import com.pos.pos.dto.BrandDto;
import com.pos.pos.entity.Brand;
import com.pos.pos.exception.PosAPIException;
import com.pos.pos.repository.BrandRepository;
import com.pos.pos.service.BrandService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;

    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @Override public BrandDto createBrand(BrandDto dto) {
        Brand b = new Brand(); b.setName(dto.getName()); b.setDescription(dto.getDescription());
        return mapToDto(brandRepository.save(b));
    }

    @Override public BrandDto getBrandById(Long id) {
        return mapToDto(brandRepository.findById(id)
                .orElseThrow(() -> new PosAPIException(HttpStatus.NOT_FOUND, "Brand not found")));
    }

    @Override public List<BrandDto> getAllBrands() {
        return brandRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override public BrandDto updateBrand(BrandDto dto, Long id) {
        Brand b = brandRepository.findById(id)
                .orElseThrow(() -> new PosAPIException(HttpStatus.NOT_FOUND, "Brand not found"));
        b.setName(dto.getName()); b.setDescription(dto.getDescription());
        return mapToDto(brandRepository.save(b));
    }

    @Override public void deleteBrand(Long id) {
        brandRepository.delete(brandRepository.findById(id)
                .orElseThrow(() -> new PosAPIException(HttpStatus.NOT_FOUND, "Brand not found")));
    }

    private BrandDto mapToDto(Brand b) {
        BrandDto dto = new BrandDto(); dto.setId(b.getId()); dto.setName(b.getName()); dto.setDescription(b.getDescription());
        return dto;
    }
}
""",
    "service/impl/DashboardServiceImpl.java": """package com.pos.pos.service.impl;

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
""",
    "controller/SupplierController.java": """package com.pos.pos.controller;

import com.pos.pos.dto.SupplierDto;
import com.pos.pos.service.SupplierService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    private final SupplierService supplierService;

    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @PostMapping
    public ResponseEntity<SupplierDto> create(@RequestBody SupplierDto dto) {
        return new ResponseEntity<>(supplierService.createSupplier(dto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SupplierDto>> getAll() {
        return ResponseEntity.ok(supplierService.getAllSuppliers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(supplierService.getSupplierById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierDto> update(@RequestBody SupplierDto dto, @PathVariable Long id) {
        return ResponseEntity.ok(supplierService.updateSupplier(dto, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        supplierService.deleteSupplier(id);
        return ResponseEntity.ok("Supplier deleted.");
    }
}
""",
    "controller/ExpenseController.java": """package com.pos.pos.controller;

import com.pos.pos.dto.ExpenseDto;
import com.pos.pos.service.ExpenseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public ResponseEntity<ExpenseDto> create(@RequestBody ExpenseDto dto) {
        return new ResponseEntity<>(expenseService.createExpense(dto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ExpenseDto>> getAll() {
        return ResponseEntity.ok(expenseService.getAllExpenses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpenseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(expenseService.getExpenseById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseDto> update(@RequestBody ExpenseDto dto, @PathVariable Long id) {
        return ResponseEntity.ok(expenseService.updateExpense(dto, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.ok("Expense deleted.");
    }
}
""",
    "controller/BrandController.java": """package com.pos.pos.controller;

import com.pos.pos.dto.BrandDto;
import com.pos.pos.service.BrandService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
public class BrandController {

    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @PostMapping
    public ResponseEntity<BrandDto> create(@RequestBody BrandDto dto) {
        return new ResponseEntity<>(brandService.createBrand(dto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BrandDto>> getAll() {
        return ResponseEntity.ok(brandService.getAllBrands());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BrandDto> update(@RequestBody BrandDto dto, @PathVariable Long id) {
        return ResponseEntity.ok(brandService.updateBrand(dto, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        brandService.deleteBrand(id);
        return ResponseEntity.ok("Brand deleted.");
    }
}
""",
    "controller/DashboardController.java": """package com.pos.pos.controller;

import com.pos.pos.dto.DashboardDto;
import com.pos.pos.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<DashboardDto> getDashboard() {
        return ResponseEntity.ok(dashboardService.getDashboardStats());
    }
}
"""
}

for filepath, content in files.items():
    with open(os.path.join(base_path, filepath), "w") as f:
        f.write(content)

print("Phase 5 backend complete: Supplier, Brand, Expense, Dashboard services and controllers created.")
