import os

base_path = "src/main/java/com/pos/pos/dto"
os.makedirs(base_path, exist_ok=True)

dtos = {
    "LoginDto.java": """package com.pos.pos.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginDto {
    @NotBlank(message = "Username or Email is required")
    private String usernameOrEmail;
    
    @NotBlank(message = "Password is required")
    private String password;
}
""",
    "RegisterDto.java": """package com.pos.pos.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {
    @NotBlank(message = "Name is required")
    private String fullName;
    
    @NotBlank(message = "Username is required")
    private String username;
    
    @NotBlank(message = "Email is required")
    @Email
    private String email;
    
    @NotBlank(message = "Password is required")
    private String password;
}
""",
    "JwtAuthResponse.java": """package com.pos.pos.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String role;
}
""",
    "ProductDto.java": """package com.pos.pos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    
    @NotBlank
    private String productName;
    private String barcode;
    private String sku;
    
    private Long categoryId;
    private Long brandId;
    
    @NotNull
    private BigDecimal costPrice;
    
    @NotNull
    private BigDecimal sellingPrice;
    
    @NotNull
    private Integer quantity;
    
    private Integer reorderLevel;
    private String image;
    private String description;
    private String status;
}
"""
}

for filename, content in dtos.items():
    with open(os.path.join(base_path, filename), "w") as f:
        f.write(content)

print("DTOs created successfully.")
