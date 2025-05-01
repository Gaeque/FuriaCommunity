package com.gaeque.furia.furia.Repository;

import com.gaeque.furia.furia.Entity.Profile;
import com.gaeque.furia.furia.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUser(User user);
    Optional<Profile> findByUserName(String userName);
    Optional<Profile> findByUserNameIgnoreCase(String userName);

}

