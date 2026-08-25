import { useState } from "react";

function Register({ onBackToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Registration failed");
        return;
      }

      setMessage("Account created successfully!");

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.error(error);
      setMessage("Could not connect to server");
    }
  };

  return (
    <div className="auth-page">
      <div className="login-container">

        <div className="brand">
          <h1>RideFlow</h1>
          <p>Create your rider account</p>
        </div>

        <h2>Register</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            Create Account
          </button>
        </form>

        {message && (
          <p className="message">{message}</p>
        )}

        <div className="auth-switch">
          <span>Already have an account?</span>

          <button
            className="link-button"
            onClick={onBackToLogin}
          >
            Back to Login
          </button>
        </div>

      </div>
    </div>
  );
}

export default Register;