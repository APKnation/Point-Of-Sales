package com.pos.pos.service;

import com.pos.pos.dto.SupplierDto;
import java.util.List;

public interface SupplierService {
    SupplierDto createSupplier(SupplierDto dto);
    SupplierDto getSupplierById(Long id);
    List<SupplierDto> getAllSuppliers();
    SupplierDto updateSupplier(SupplierDto dto, Long id);
    void deleteSupplier(Long id);
}
