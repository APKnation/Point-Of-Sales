package com.pos.pos.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {
    private Long id;
    private String customerName;
    private String phone;
    private String email;
    private String address;
    private Integer loyaltyPoints;
}
