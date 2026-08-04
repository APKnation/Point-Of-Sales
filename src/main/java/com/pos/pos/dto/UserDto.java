package com.pos.pos.dto;

import lombok.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String fullName;
    private String username;
    private String email;
    private String phone;
    private boolean isActive;
    private Set<String> roles;
}
