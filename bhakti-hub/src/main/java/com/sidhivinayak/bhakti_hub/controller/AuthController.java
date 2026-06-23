package com.sidhivinayak.bhakti_hub.controller;

import com.sidhivinayak.bhakti_hub.entity.User;
import com.sidhivinayak.bhakti_hub.repository.UserRepository;
import com.sidhivinayak.bhakti_hub.config.JwtUtil;
import com.sidhivinayak.bhakti_hub.dto.AuthResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String register(@RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "Email already exists!";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("CUSTOMER");

        userRepository.save(user);

        return "User registered successfully!";
    }

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid password");
        }

        String token = jwtUtil.generateToken(
                existingUser.getEmail(),
                existingUser.getRole()
        );

        AuthResponse response = new AuthResponse(
                token,
                existingUser.getEmail(),
                existingUser.getRole(),
                existingUser.getName()
        );

        return ResponseEntity.ok(response);
    }
}