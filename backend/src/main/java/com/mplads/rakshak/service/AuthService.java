package com.mplads.rakshak.service;

import com.mplads.rakshak.config.JwtTokenProvider;
import com.mplads.rakshak.dto.AuthRequest;
import com.mplads.rakshak.dto.AuthResponse;
import com.mplads.rakshak.model.Role;
import com.mplads.rakshak.model.User;
import com.mplads.rakshak.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuditService auditService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider tokenProvider,
            AuditService auditService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.auditService = auditService;
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NoSuchElementException("User not found with email: " + request.getEmail()));

        // For dev accounts allow direct match or passwordEncoder match
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword()) && !request.getPassword().equals(user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        String token = tokenProvider.generateToken(user.getEmail(), user.getRole().name());

        auditService.logAction(user.getEmail(), "LOGIN_SUCCESS", "USER", String.valueOf(user.getId()), "Successful login to MPLADS Rakshak Console");

        return new AuthResponse(
                token,
                user.getEmail(),
                user.getFullName(),
                user.getRole().name(),
                user.getDistrict(),
                user.getState(),
                user.getDepartment()
        );
    }
}
