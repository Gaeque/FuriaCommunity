package com.gaeque.furia.furia.Repository;

import com.gaeque.furia.furia.Entity.Friendship;
import com.gaeque.furia.furia.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

    Optional<Friendship> findByUserAndFriend(User user, User friend);
    boolean existsByUserAndFriendAndStatus(User user, User friend, String status);
    List<Friendship> findByFriendAndStatus(User friend, String status);
}