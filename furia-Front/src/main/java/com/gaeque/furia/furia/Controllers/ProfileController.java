package com.gaeque.furia.furia.Controllers;

import com.gaeque.furia.furia.DTOs.ProfileDTO;
import com.gaeque.furia.furia.Entity.Profile;
import com.gaeque.furia.furia.Entity.User;
import com.gaeque.furia.furia.Repository.UserRepository;
import com.gaeque.furia.furia.Service.ProfileService;
import com.gaeque.furia.furia.Utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createOrUpdateProfile(
            @RequestBody ProfileDTO dto,
            @RequestHeader("Authorization") String token
    ) {
        String rawToken = token.replace("Bearer ", "");
        String email = jwtUtil.getUsernameFromToken(rawToken);
        profileService.saveOrUpdateProfile(email, dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<ProfileDTO> getProfile(
            @RequestHeader("Authorization") String token
    ) {
        String rawToken = token.replace("Bearer ", "").trim();
        String email = jwtUtil.getUsernameFromToken(rawToken);

        ProfileDTO profileDTO = profileService.getProfileByEmail(email);

        return ResponseEntity.ok(profileDTO);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchUser(@RequestParam String userName, @RequestHeader("Authorization") String token) {
        String currentEmail = jwtUtil.getUsernameFromToken(token.substring(7));
        User currentUser = userRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (currentUser.getUserName().equalsIgnoreCase(userName)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Você não pode se adicionar como amigo");
        }

        Optional<User> userOptional = userRepository.findByUserNameIgnoreCase(userName);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }

        return ResponseEntity.ok(userOptional.get().getUserName());
    }
}