package com.pos.pos.service;

import com.pos.pos.dto.SaleDto;
import java.util.List;

public interface SaleService {
    SaleDto createSale(SaleDto saleDto, String cashierUsername);
    SaleDto getSaleById(Long id);
    List<SaleDto> getAllSales();
}
