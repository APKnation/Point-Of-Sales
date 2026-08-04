package com.pos.pos.service;

import com.pos.pos.dto.LoginDto;
import com.pos.pos.dto.RegisterDto;

import com.pos.pos.dto.JwtAuthResponse;

public interface AuthService {
    JwtAuthResponse login(LoginDto loginDto);
    String register(RegisterDto registerDto);
}
