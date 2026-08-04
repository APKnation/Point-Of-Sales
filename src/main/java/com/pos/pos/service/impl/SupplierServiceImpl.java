package com.pos.pos.service.impl;

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
