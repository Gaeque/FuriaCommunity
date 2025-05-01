package com.gaeque.furia.furia.Controllers;


import com.gaeque.furia.furia.DTOs.AuthRequest;
import com.gaeque.furia.furia.DTOs.AuthResponse;
import com.gaeque.furia.furia.DTOs.UserDTO;
import com.gaeque.furia.furia.Entity.Profile;
import com.gaeque.furia.furia.Entity.User;
import com.gaeque.furia.furia.Repository.ProfileRepository;
import com.gaeque.furia.furia.Repository.UserRepository;
import com.gaeque.furia.furia.Service.UserService;
import com.gaeque.furia.furia.Utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest authRequest) {

        if (userRepository.findByEmail(authRequest.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email já registrado");
        }

        if (userRepository.findByUserName(authRequest.getUserName()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome de usuário já está em uso");
        }

        User newUser = new User();
        newUser.setUserName(authRequest.getUserName());
        newUser.setEmail(authRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(authRequest.getPassword()));

        userRepository.save(newUser);

        Profile profile = new Profile();
        profile.setUser(newUser); // seta o userId (chave estrangeira)
        profile.setUserName(newUser.getUserName()); // copia o userName

        profileRepository.save(profile); // salva o perfil

        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário registrado com sucesso");
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody User loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Credenciais inválidas");
        }
        String token = JwtUtil.generateToken(user.getEmail());

        return new AuthResponse(true, user.getId(), user.getEmail(), token, user.getUserName());
    }

}
