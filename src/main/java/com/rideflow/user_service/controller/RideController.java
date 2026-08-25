package com.rideflow.user_service.controller;

import com.rideflow.user_service.model.Ride;
import com.rideflow.user_service.model.RideStatus;
import com.rideflow.user_service.service.RideService;
import org.springframework.web.bind.annotation.*;
import com.rideflow.user_service.dto.RideResponse;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
public class RideController {

    private final RideService rideService;

    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @PostMapping("/user/{userId}")
    public Ride createRide(
            @PathVariable Long userId,
            @RequestBody Ride ride) {

        return rideService.createRide(userId, ride);
    }


    @GetMapping
    public List<RideResponse> getAllRides() {

        return rideService.getAllRides()
                .stream()
                .map(ride -> new RideResponse(
                        ride.getId(),
                        ride.getPickup(),
                        ride.getDestination(),
                        ride.getStatus(),

                        ride.getUser() != null
                                ? ride.getUser().getId()
                                : null,

                        ride.getUser() != null
                                ? ride.getUser().getName()
                                : null,

                        ride.getDriver() != null
                                ? ride.getDriver().getId()
                                : null,

                        ride.getDriver() != null
                                ? ride.getDriver().getName()
                                : null
                ))
                .toList();
    }

    @PutMapping("/{rideId}/status")
    public Ride updateRideStatus(
            @PathVariable Long rideId,
            @RequestParam RideStatus status) {

        return rideService.updateRideStatus(rideId, status);
    }
    @PutMapping("/{rideId}/accept/{driverId}")
    public Ride acceptRide(
            @PathVariable Long rideId,
            @PathVariable Long driverId) {

        return rideService.acceptRide(rideId, driverId);
    }
}
