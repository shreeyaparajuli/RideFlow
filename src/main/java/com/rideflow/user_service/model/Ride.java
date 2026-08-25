package com.rideflow.user_service.model;

import com.rideflow.user_service.model.RideStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "rides")
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pickup;
    private String destination;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    @Enumerated(EnumType.STRING)
    private RideStatus status = RideStatus.REQUESTED;

    public Ride() {
    }

    public Ride(String pickup, String destination, User user) {
        this.pickup = pickup;
        this.destination = destination;
        this.user = user;
        this.status = RideStatus.REQUESTED;
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

    public User getUser() {
        return user;
    }

    public RideStatus getStatus() {
        return status;
    }

    public void setPickup(String pickup) {
        this.pickup = pickup;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setStatus(RideStatus status) {
        this.status = status;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }
}