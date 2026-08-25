# RideFlow
RideFlow is a rideshare application that allows riders to request rides and drivers to accept and manage them through complete ride lifecycle.
The project demonstrates full-stack development using React, Java, Spring Boot, PostgreSQL, REST APIs, JWT authentication, and role based authorization.

## Features 
User login and registration
JWT Authentication
BCrypt password security
Role based access for riders and drivers
Request and view rides
Separate rider and driver dashboards

## Tech Stack 
### Frontend: React, JavaScript, CSS, Vite
### Backend: Java, SpringBoot, Spring Security, Spring Data JPA
### Database: PostgreSQL
### Tools: Git, GitHub, Postman, Intellij, VS Code


## How It Works

Rider requests a ride

Ride status: REQUESTED

Driver accepts the ride

Ride status: ACCEPTED

Driver starts the ride

Ride status: IN_PROGRESS

Driver completes the ride

Ride status: COMPLETED


## Running the Project

Clone the repository:

git clone https://github.com/shreeyaparajuli/RideFlow.git

Run the Spring Boot backend, then start the frontend:

cd frontend
npm install
npm run dev

## What's Next

I plan to continue improving RideFlow by adding maps, real-time location tracking, ride pricing, and deployment




