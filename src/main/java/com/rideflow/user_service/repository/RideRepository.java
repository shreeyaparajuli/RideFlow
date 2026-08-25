package com.rideflow.user_service.repository;

import com.rideflow.user_service.model.Ride;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RideRepository extends JpaRepository<Ride, Long> {
}
