package com.petcare.service;

import com.petcare.dto.AuthResponse;
import com.petcare.dto.LoginRequest;
import com.petcare.dto.RegisterRequest;
import com.petcare.model.User;
import com.petcare.repository.UserRepository;
import com.petcare.util.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest req) {
        Optional<User> exists = userRepository.findByEmail(req.getEmail());
        if (exists.isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }

        String hashed = passwordEncoder.encode(req.getSenha());
        User user = new User(req.getNome(), req.getEmail(), hashed, req.getTipo());
        User saved = userRepository.save(user);
        String token = jwtUtil.generateToken(saved);
        return new AuthResponse(saved.getId(), saved.getNome(), saved.getEmail(), saved.getTipo(), token);
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail()).orElseThrow(() -> new RuntimeException("Credenciais inválidas"));
        if (!passwordEncoder.matches(req.getSenha(), user.getSenha())) {
            throw new RuntimeException("Credenciais inválidas");
        }
        String token = jwtUtil.generateToken(user);
        return new AuthResponse(user.getId(), user.getNome(), user.getEmail(), user.getTipo(), token);
    }
}
