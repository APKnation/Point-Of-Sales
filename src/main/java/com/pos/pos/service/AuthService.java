package com.pos.pos.service;

import com.pos.pos.dto.LoginDto;
import com.pos.pos.dto.RegisterDto;

public interface AuthService {
    String login(LoginDto loginDto);
    String register(RegisterDto registerDto);
}
