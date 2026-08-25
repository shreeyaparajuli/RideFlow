import { useEffect, useState } from "react";

function RiderDashboard() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [message, setMessage] = useState("");
  const [rides, setRides] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const loadRides = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/rides",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setMessage("Could not load rides");
        return;
      }

      const data = await response.json();

      const userRides = data.filter(
        (ride) =>
          String(ride.userId) === String(userId)
      );

      setRides(userRides);

    } catch (error) {
      console.error(error);
      setMessage("Could not connect to server");
    }
  };

  useEffect(() => {
    loadRides();
  }, []);

  const requestRide = async (e) => {
    e.preventDefault();

    if (!pickup || !destination) {
      setMessage(
        "Please enter pickup and destination"
      );
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/rides/user/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            pickup,
            destination,
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        console.error(text);
        setMessage("Could not request ride");
        return;
      }

      const data = await response.json();

      setMessage(
        `Ride requested! Status: ${data.status}`
      );

      setPickup("");
      setDestination("");

      await loadRides();

    } catch (error) {
      console.error(error);
      setMessage("Could not connect to server");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const statusClass = (status) => {
    if (status === "REQUESTED")
      return "status status-requested";

    if (status === "ACCEPTED")
      return "status status-accepted";

    if (status === "IN_PROGRESS")
      return "status status-in-progress";

    if (status === "COMPLETED")
      return "status status-completed";

    if (status === "CANCELLED")
      return "status status-cancelled";

    return "status";
  };

  return (
    <div className="rider-dashboard">

      <div className="dashboard-header">
        <div>
          <h1>RideFlow</h1>
          <p>Rider Dashboard</p>
        </div>

        <button onClick={logout}>
          Logout
        </button>
      </div>

      <div className="dashboard-card">
        <h2>Request a Ride</h2>

        <form onSubmit={requestRide}>
          <input
            type="text"
            placeholder="Pickup location"
            value={pickup}
            onChange={(e) =>
              setPickup(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) =>
              setDestination(e.target.value)
            }
          />

          <button
            className="primary-button"
            type="submit"
          >
            Request Ride
          </button>
        </form>

        <p className="message">{message}</p>
      </div>

      <div className="dashboard-card">
        <h2>Your Rides</h2>

        {rides.length === 0 ? (
          <p>No rides yet.</p>
        ) : (
          rides.map((ride) => (
            <div
              className="ride-card"
              key={ride.id}
            >

              <p>
                <strong>Pickup:</strong>{" "}
                {ride.pickup}
              </p>

              <p>
                <strong>Destination:</strong>{" "}
                {ride.destination}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={statusClass(
                    ride.status
                  )}
                >
                  {ride.status}
                </span>
              </p>

              {ride.driverName && (
                <p>
                  <strong>Driver:</strong>{" "}
                  {ride.driverName}
                </p>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default RiderDashboard;