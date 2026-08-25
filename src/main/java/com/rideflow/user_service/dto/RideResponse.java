package com.rideflow.user_service.dto;

import com.rideflow.user_service.model.RideStatus;

public class RideResponse {

    private Long id;
    private String pickup;
    private String destination;
    private RideStatus status;

    private Long userId;
    private String userName;

    private Long driverId;
    private String driverName;

    public RideResponse(
            Long id,
            String pickup,
            String destination,
            RideStatus status,
            Long userId,
            String userName,
            Long driverId,
            String driverName) {

        this.id = id;
        this.pickup = pickup;
        this.destination = destination;
        this.status = status;
        this.userId = userId;
        this.userName = userName;
        this.driverId = driverId;
        this.driverName = driverName;
    }

    public Long getId() {
        return id;
    }

    public String getPickup() {
        return pickup;
    }

    public String getDestination() {
        return destination;
    }

    public RideStatus getStatus() {
        return status;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public Long getDriverId() {
        return driverId;
    }

    public String getDriverName() {
        return driverName;
    }
}
