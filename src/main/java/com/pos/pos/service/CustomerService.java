package com.pos.pos.service;

import com.pos.pos.dto.CustomerDto;
import java.util.List;

public interface CustomerService {
    CustomerDto createCustomer(CustomerDto customerDto);
    CustomerDto getCustomerById(Long id);
    List<CustomerDto> getAllCustomers();
    CustomerDto updateCustomer(CustomerDto customerDto, Long id);
    void deleteCustomer(Long id);
}
