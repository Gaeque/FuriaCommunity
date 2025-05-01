package com.gaeque.furia.furia.Controllers;

import com.gaeque.furia.furia.Entity.Friendship;
import com.gaeque.furia.furia.Entity.User;
import com.gaeque.furia.furia.Repository.UserRepository;
import com.gaeque.furia.furia.Service.FriendshipService;
import com.gaeque.furia.furia.Utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/friends")
public class FriendshipController {

    @Autowired
    private FriendshipService friendshipService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/sendRequest")
    public ResponseEntity<Void> sendFriendRequest(@RequestParam String userName, @RequestParam String friendUserName) {

        friendshipService.sendFriendRequest(userName, friendUserName);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/acceptRequest")
    public ResponseEntity<Void> acceptFriendRequest(@RequestParam String userName, @RequestParam String friendUserName) {

        friendshipService.acceptFriendRequest(userName, friendUserName);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/rejectRequest")
    public ResponseEntity<Void> rejectFriendRequest(@RequestParam String userName, @RequestParam String friendUserName) {

        friendshipService.rejectFriendRequest(userName, friendUserName);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/areFriends")
    public ResponseEntity<Boolean> areFriends(@RequestParam String userName, @RequestParam String friendUserName) {

        boolean friends = friendshipService.areFriends(userName, friendUserName);
        return ResponseEntity.ok(friends);
    }

    @GetMapping("/getPendingRequests")
    public ResponseEntity<List<Map<String, Object>>> getPendingRequests(@RequestHeader("Authorization") String token) {
        String currentEmail = jwtUtil.getUsernameFromToken(token.substring(7));
        User currentUser = userRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        List<Friendship> pendingRequests = friendshipService.getPendingRequests(currentUser);

        List<Map<String, Object>> friendData = pendingRequests.stream()
                .map(friendship -> {
                    Map<String, Object> data = new HashMap<>();
                    // Aqui você agora vai pegar as informações do remetente (user) e não do amigo (friend)
                    data.put("id", friendship.getUser().getId());
                    data.put("userName", friendship.getUser().getUserName());
                    return data;
                })
                .distinct()
                .collect(Collectors.toList());

        return ResponseEntity.ok(friendData);
    }
}
