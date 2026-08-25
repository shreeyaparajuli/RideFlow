import { useState } from "react";
import "./App.css";
import RiderDashboard from "./RiderDashboard";
import DriverDashboard from "./DriverDashboard";
import Register from "./Register";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        setMessage(data.error || "Invalid email or password");
        return;
      }

      // Remove any old login information first
      localStorage.clear();

      // Save fresh login information
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", String(data.userId));
      localStorage.setItem("role", data.role);

      if (data.role === "DRIVER" && data.driverId != null) {
        localStorage.setItem("driverId", String(data.driverId));
      }

      console.log("LOGIN ROLE:", data.role);

      setLoggedIn(true);

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setMessage("Could not connect to server");
    }
  };

  // Logged-in screen
  if (loggedIn) {
    const role = localStorage.getItem("role");

    console.log("STORED ROLE:", role);

    if (role === "DRIVER") {
      return <DriverDashboard />;
    }

    return <RiderDashboard />;
  }

  // Registration screen
  if (showRegister) {
    return (
      <Register
        onBackToLogin={() => setShowRegister(false)}
      />
    );
  }

  // Login screen
  return (
    <div className="auth-page">
      <div className="login-container">

        <div className="brand">
          <h1>RideFlow</h1>
          <p>Simple rides. Smooth journeys.</p>
        </div>

        <h2>Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="primary-button"
            type="submit"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="message">{message}</p>
        )}

        <div className="auth-switch">
          <span>Don't have an account?</span>

          <button
            className="link-button"
            onClick={() => setShowRegister(true)}
          >
            Create Account
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;