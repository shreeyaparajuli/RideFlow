package com.rideflow.user_service.controller;

import com.rideflow.user_service.model.LoginRequest;
import com.rideflow.user_service.model.LoginResponse;
import com.rideflow.user_service.model.User;
import com.rideflow.user_service.security.JwtService;
import com.rideflow.user_service.service.UserService;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import com.rideflow.user_service.dto.UserResponse;
import com.rideflow.user_service.model.Driver;
import com.rideflow.user_service.model.Role;
import com.rideflow.user_service.repository.DriverRepository;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final DriverRepository driverRepository;

    public UserController(
            UserService userService,
            JwtService jwtService,
            DriverRepository driverRepository) {

        this.userService = userService;
        this.jwtService = jwtService;
        this.driverRepository = driverRepository;
    }

    @PostMapping
    public UserResponse createUser(@Valid @RequestBody User user) {

        User savedUser = userService.createUser(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole()
        );
    }

    @GetMapping
    public List<UserResponse> getAllUsers() {

        return userService.getAllUsers()
                .stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole()
                ))
                .toList();
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        User user = userService.login(
                request.getEmail(),
                request.getPassword()
        );

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole()
        );

        Long driverId = null;

        if (user.getRole() == Role.DRIVER) {

            driverId = driverRepository
                    .findByEmail(user.getEmail())
                    .map(Driver::getId)
                    .orElse(null);
        }

        return new LoginResponse(
                token,
                user.getId(),
                user.getRole(),
                driverId
        );
    }

}






