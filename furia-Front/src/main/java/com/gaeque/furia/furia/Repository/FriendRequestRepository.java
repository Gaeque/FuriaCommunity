package com.gaeque.furia.furia.Repository;

import com.gaeque.furia.furia.Entity.Friendship;
import com.gaeque.furia.furia.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FriendRequestRepository extends JpaRepository<Friendship, Long> {
    Optional<Friendship> findByUserAndFriend(User user, User friend);
    boolean existsByUserAndFriendAndStatus(User user, User friend, String status);
}