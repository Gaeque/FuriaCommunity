package com.gaeque.furia.furia.DTOs;

import java.time.LocalDate;

public class ProfileDTO {
    private String userName;
    private String bio;
    private String phone;
    private LocalDate birthDate;
    private String instagram;
    private String gamersClub;
    private String twitch;
    private String cs2;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getInstagram() {
        return instagram;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    public String getGamersClub() {
        return gamersClub;
    }

    public void setGamersClub(String gamersClub) {
        this.gamersClub = gamersClub;
    }

    public String getTwitch() {
        return twitch;
    }

    public void setTwitch(String twitch) {
        this.twitch = twitch;
    }

    public String getCs2() {
        return cs2;
    }

    public void setCs2(String cs2) {
        this.cs2 = cs2;
    }

}