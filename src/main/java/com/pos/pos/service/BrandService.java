package com.pos.pos.service;

import com.pos.pos.dto.BrandDto;
import java.util.List;

public interface BrandService {
    BrandDto createBrand(BrandDto dto);
    BrandDto getBrandById(Long id);
    List<BrandDto> getAllBrands();
    BrandDto updateBrand(BrandDto dto, Long id);
    void deleteBrand(Long id);
}
