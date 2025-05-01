package com.gaeque.furia.furia.Service;

import com.gaeque.furia.furia.Entity.Friendship;
import com.gaeque.furia.furia.Entity.User;
import com.gaeque.furia.furia.Repository.FriendRequestRepository;
import com.gaeque.furia.furia.Repository.FriendshipRepository;
import com.gaeque.furia.furia.Repository.ProfileRepository;
import com.gaeque.furia.furia.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class FriendshipService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private FriendshipRepository friendshipRepository;

    @Autowired
    private UserRepository userRepository;


    public void sendFriendRequest(String userName, String friendUserName) {
        User sender = userRepository.findByUserName(userName)
                .orElseThrow(() -> new RuntimeException("User not found"));

        User receiver = userRepository.findByUserName(friendUserName)
                .orElseThrow(() -> new RuntimeException("Friend not found"));

        if (sender.equals(receiver)) {
            throw new RuntimeException("Não é possível enviar solicitação para si mesmo.");
        }

        if (friendshipRepository.existsByUserAndFriendAndStatus(sender, receiver, "PENDING")) {
            throw new RuntimeException("Já existe uma solicitação de amizade pendente entre esses usuários.");
        }
        Friendship request = new Friendship();
        request.setUser(sender);
        request.setFriend(receiver);
        request.setStatus("PENDING");

        friendshipRepository.save(request);
    }


    public void acceptFriendRequest(String userName, String friendUserName) {
        updateRequestStatus(userName, friendUserName, "ACCEPTED");
    }

    public void rejectFriendRequest(String userName, String friendUserName) {
        updateRequestStatus(userName, friendUserName, "REJECTED");
    }

    public boolean areFriends(String userName, String friendUserName) {
        User user = profileRepository.findByUserName(userName)
                .orElseThrow(() -> new RuntimeException("User not found")).getUser();
        User friend = profileRepository.findByUserName(friendUserName)
                .orElseThrow(() -> new RuntimeException("Friend not found")).getUser();

        return friendshipRepository.existsByUserAndFriendAndStatus(user, friend, "ACCEPTED")
                || friendshipRepository.existsByUserAndFriendAndStatus(friend, user, "ACCEPTED");
    }

    private void updateRequestStatus(String userName, String friendUserName, String status) {
        User user = profileRepository.findByUserName(userName)
                .orElseThrow(() -> new RuntimeException("User not found")).getUser();
        User friend = profileRepository.findByUserName(friendUserName)
                .orElseThrow(() -> new RuntimeException("Friend not found")).getUser();

        Friendship request = friendshipRepository
                .findByUserAndFriend(friend, user)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(status);
        friendshipRepository.save(request);
    }

    public List<Friendship> getPendingRequests(User user) {
        return friendshipRepository.findByFriendAndStatus(user, "PENDING");
    }
}
