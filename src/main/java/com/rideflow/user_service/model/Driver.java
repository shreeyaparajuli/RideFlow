package com.rideflow.user_service.model;

import jakarta.persistence.*;

@Entity
@Table(name = "drivers")
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String vehicle;

    public Driver() {
    }

    public Driver(String name, String email, String vehicle) {
        this.name = name;
        this.email = email;
        this.vehicle = vehicle;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getVehicle() {
        return vehicle;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setVehicle(String vehicle) {
        this.vehicle = vehicle;
    }
}
