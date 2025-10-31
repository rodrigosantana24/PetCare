package com.petcare.controller;

import com.petcare.dto.AuthResponse;
import com.petcare.dto.LoginRequest;
import com.petcare.dto.RegisterRequest;
import com.petcare.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Validated @RequestBody RegisterRequest req) {
        AuthResponse resp = userService.register(req);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Validated @RequestBody LoginRequest req) {
        AuthResponse resp = userService.login(req);
        return ResponseEntity.ok(resp);
    }
}
