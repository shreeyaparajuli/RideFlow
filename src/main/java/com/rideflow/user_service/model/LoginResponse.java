package com.rideflow.user_service.model;

public class LoginResponse {

    private String token;
    private Long userId;
    private Role role;
    private Long driverId;

    public LoginResponse(
            String token,
            Long userId,
            Role role,
            Long driverId) {

        this.token = token;
        this.userId = userId;
        this.role = role;
        this.driverId = driverId;
    }

    public String getToken() {
        return token;
    }

    public Long getUserId() {
        return userId;
    }

    public Role getRole() {
        return role;
    }

    public Long getDriverId() {
        return driverId;
    }
}