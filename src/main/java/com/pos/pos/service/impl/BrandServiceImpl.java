package com.pos.pos.service.impl;

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
