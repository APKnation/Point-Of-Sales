package com.pos.pos.controller;

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
