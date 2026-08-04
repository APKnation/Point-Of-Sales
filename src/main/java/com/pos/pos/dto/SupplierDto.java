package com.pos.pos.dto;

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
