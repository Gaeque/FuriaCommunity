package com.gaeque.furia.furia.Service;

import com.gaeque.furia.furia.DTOs.AuthRequest;
import com.gaeque.furia.furia.DTOs.AuthResponse;
import com.gaeque.furia.furia.DTOs.UserDTO;
import com.gaeque.furia.furia.Entity.User;
import com.gaeque.furia.furia.Repository.UserRepository;
import com.gaeque.furia.furia.Utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public void registerUser(UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }

        User newUser = new User();
        newUser.setUserName(userDTO.getUserName());
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        userRepository.save(newUser);
    }

    public AuthResponse login(AuthRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
            throw new RuntimeException("Credenciais inválidas.");
        }

        User user = userOpt.get();

        String token = JwtUtil.generateToken(user.getEmail());

        return new AuthResponse(true, user.getId(), user.getEmail(), token, user.getUserName());
    }
}
