package com.rideflow.user_service.service;

import com.rideflow.user_service.model.Driver;
import com.rideflow.user_service.model.Ride;
import com.rideflow.user_service.model.RideStatus;
import com.rideflow.user_service.model.User;

import com.rideflow.user_service.repository.DriverRepository;
import com.rideflow.user_service.repository.RideRepository;
import com.rideflow.user_service.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RideService {

    private final RideRepository rideRepository;
    private final UserRepository userRepository;
    private final DriverRepository driverRepository;

    public RideService(
            RideRepository rideRepository,
            UserRepository userRepository,
            DriverRepository driverRepository) {

        this.rideRepository = rideRepository;
        this.userRepository = userRepository;
        this.driverRepository = driverRepository;
    }

    public Ride createRide(Long userId, Ride ride) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ride.setUser(user);

        return rideRepository.save(ride);
    }

    public List<Ride> getAllRides() {
        return rideRepository.findAll();
    }

    public Ride updateRideStatus(Long rideId, RideStatus newStatus) {

        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        RideStatus currentStatus = ride.getStatus();

        if (currentStatus == RideStatus.REQUESTED &&
                newStatus != RideStatus.ACCEPTED &&
                newStatus != RideStatus.CANCELLED) {
            throw new RuntimeException("Requested ride can only be accepted or cancelled");
        }

        if (currentStatus == RideStatus.ACCEPTED &&
                newStatus != RideStatus.IN_PROGRESS &&
                newStatus != RideStatus.CANCELLED) {
            throw new RuntimeException("Accepted ride can only start or be cancelled");
        }

        if (currentStatus == RideStatus.IN_PROGRESS &&
                newStatus != RideStatus.COMPLETED) {
            throw new RuntimeException("Ride in progress can only be completed");
        }

        if (currentStatus == RideStatus.COMPLETED ||
                currentStatus == RideStatus.CANCELLED) {
            throw new RuntimeException("This ride cannot be changed anymore");
        }

        ride.setStatus(newStatus);

        return rideRepository.save(ride);
    }

    public Ride acceptRide(Long rideId, Long driverId) {

        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        ride.setDriver(driver);
        ride.setStatus(RideStatus.ACCEPTED);

        return rideRepository.save(ride);
    }
}