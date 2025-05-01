package com.gaeque.furia.furia.Service;

import com.gaeque.furia.furia.DTOs.ProfileDTO;
import com.gaeque.furia.furia.Entity.Profile;
import com.gaeque.furia.furia.Entity.User;
import com.gaeque.furia.furia.Repository.ProfileRepository;
import com.gaeque.furia.furia.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    public void saveOrUpdateProfile(String email, ProfileDTO dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Profile profile = profileRepository.findByUser(user).orElse(new Profile());
        profile.setUser(user);
        profile.setUserName(dto.getUserName());
        profile.setBio(dto.getBio());
        profile.setPhone(dto.getPhone());
        profile.setBirthDate(dto.getBirthDate());
        profile.setInstagram(dto.getInstagram());
        profile.setGamersClub(dto.getGamersClub());
        profile.setTwitch(dto.getTwitch());


        profileRepository.save(profile);

    }

    public ProfileDTO getProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Perfil não encontrado"));

        ProfileDTO dto = new ProfileDTO();
        dto.setUserName(profile.getUserName());
        dto.setBio(profile.getBio());
        dto.setPhone(profile.getPhone());
        dto.setBirthDate(profile.getBirthDate());
        dto.setInstagram(profile.getInstagram());
        dto.setGamersClub(profile.getGamersClub());
        dto.setTwitch(profile.getTwitch());


        return dto;
    }


    public Optional<Profile> findByUserNameIgnoreCase(String userName) {
        return profileRepository.findByUserNameIgnoreCase(userName);
    }

}
