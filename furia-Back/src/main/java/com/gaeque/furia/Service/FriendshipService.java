package com.gaeque.furia.Service;

import com.gaeque.furia.Entity.Friendship;
import com.gaeque.furia.Entity.Profile;
import com.gaeque.furia.Entity.User;
import com.gaeque.furia.Repository.FriendshipRepository;
import com.gaeque.furia.Repository.ProfileRepository;
import com.gaeque.furia.Repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FriendshipService {
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private FriendshipRepository friendshipRepository;
    @Autowired
    private UserRepository userRepository;

    public FriendshipService() {
    }

    public void sendFriendRequest(String userName, String friendUserName) {
        User sender = (User)this.userRepository.findByUserName(userName).orElseThrow(() -> new RuntimeException("User not found"));
        User receiver = (User)this.userRepository.findByUserName(friendUserName).orElseThrow(() -> new RuntimeException("Friend not found"));
        if (sender.equals(receiver)) {
            throw new RuntimeException("Não é possível enviar solicitação para si mesmo.");
        } else if (this.friendshipRepository.existsByUserAndFriendAndStatus(sender, receiver, "PENDING")) {
            throw new RuntimeException("Já existe uma solicitação de amizade pendente entre esses usuários.");
        } else {
            Friendship request = new Friendship();
            request.setUser(sender);
            request.setFriend(receiver);
            request.setStatus("PENDING");
            this.friendshipRepository.save(request);
        }
    }

    public void acceptFriendRequest(String userName, String friendUserName) {
        this.updateRequestStatus(userName, friendUserName, "ACCEPTED");
    }

    public void rejectFriendRequest(String userName, String friendUserName) {
        this.updateRequestStatus(userName, friendUserName, "REJECTED");
    }

    public boolean areFriends(String userName, String friendUserName) {
        User user = ((Profile)this.profileRepository.findByUserName(userName).orElseThrow(() -> new RuntimeException("User not found"))).getUser();
        User friend = ((Profile)this.profileRepository.findByUserName(friendUserName).orElseThrow(() -> new RuntimeException("Friend not found"))).getUser();
        return this.friendshipRepository.existsByUserAndFriendAndStatus(user, friend, "ACCEPTED") || this.friendshipRepository.existsByUserAndFriendAndStatus(friend, user, "ACCEPTED");
    }

    private void updateRequestStatus(String userName, String friendUserName, String status) {
        User user = ((Profile)this.profileRepository.findByUserName(userName).orElseThrow(() -> new RuntimeException("User not found"))).getUser();
        User friend = ((Profile)this.profileRepository.findByUserName(friendUserName).orElseThrow(() -> new RuntimeException("Friend not found"))).getUser();
        Friendship request = (Friendship)this.friendshipRepository.findByUserAndFriend(friend, user).orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(status);
        this.friendshipRepository.save(request);
    }

    public List<Friendship> getPendingRequests(User user) {
        return this.friendshipRepository.findByFriendAndStatus(user, "PENDING");
    }
}
