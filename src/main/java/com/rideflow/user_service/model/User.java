package com.rideflow.user_service.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(
            message = "Password is required"
    )
    @Size(
            min = 6,
            message =
                    "Password must be at least 6 characters"
    )
    @JsonProperty(
            access =
                    JsonProperty.Access.WRITE_ONLY
    )
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    public User() {
    }

    public User(
            String name,
            String email,
            String password) {

        this.name = name;
        this.email = email;
        this.password = password;
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

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(
            String password) {

        this.password = password;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}