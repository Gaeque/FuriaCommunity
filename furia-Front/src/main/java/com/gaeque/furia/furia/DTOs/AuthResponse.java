package com.gaeque.furia.furia.DTOs;

public class AuthResponse {
    private boolean isAuth;
    private Long id;
    private String email;
    private String token;
    private String userName;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public AuthResponse() {}

    public AuthResponse(boolean isAuth, Long id, String email, String token, String userName) {
        this.isAuth = isAuth;
        this.id = id;
        this.email = email;
        this.token = token;
        this.userName =  userName;
    }

    public boolean isAuth() {
        return isAuth;
    }

    public void setAuth(boolean auth) {
        isAuth = auth;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
