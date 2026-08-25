import { useEffect, useState } from "react";

function DriverDashboard() {
  const [rides, setRides] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const driverId =
    localStorage.getItem("driverId");

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

      const usefulRides = data.filter(
        (ride) =>
          ride.status === "REQUESTED" ||
          ride.status === "ACCEPTED" ||
          ride.status === "IN_PROGRESS"
      );

      setRides(usefulRides);

    } catch (error) {
      console.error(error);
      setMessage("Could not connect to server");
    }
  };

  useEffect(() => {
    loadRides();
  }, []);

  const acceptRide = async (rideId) => {
    try {
      setMessage("Accepting ride...");

      const response = await fetch(
        `http://localhost:8080/api/rides/${rideId}/accept/${driverId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const text = await response.text();

      if (!response.ok) {
        setMessage(
          `Could not accept ride: ${text}`
        );
        return;
      }

      setMessage("Ride accepted!");

      await loadRides();

    } catch (error) {
      console.error(error);
      setMessage("Could not connect to server");
    }
  };

  const updateStatus = async (
    rideId,
    status
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/rides/${rideId}/status?status=${status}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const text = await response.text();

      if (!response.ok) {
        setMessage(
          `Could not update ride: ${text}`
        );
        return;
      }

      setMessage(
        `Ride status changed to ${status}`
      );

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
    <div className="driver-dashboard">

      <div className="dashboard-header">
        <div>
          <h1>RideFlow</h1>
          <p>Driver Dashboard</p>
        </div>

        <button onClick={logout}>
          Logout
        </button>
      </div>

      <div className="dashboard-card">
        <h2>Active Rides</h2>

        <p className="message">{message}</p>

        {rides.length === 0 ? (
          <p>No active rides.</p>
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
                <strong>Rider:</strong>{" "}
                {ride.userName || "Unknown"}
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

              {ride.status === "REQUESTED" && (
                <button
                  className="action-button"
                  onClick={() =>
                    acceptRide(ride.id)
                  }
                >
                  Accept Ride
                </button>
              )}

              {ride.status === "ACCEPTED" && (
                <button
                  className="action-button"
                  onClick={() =>
                    updateStatus(
                      ride.id,
                      "IN_PROGRESS"
                    )
                  }
                >
                  Start Ride
                </button>
              )}

              {ride.status ===
                "IN_PROGRESS" && (
                <button
                  className="action-button"
                  onClick={() =>
                    updateStatus(
                      ride.id,
                      "COMPLETED"
                    )
                  }
                >
                  Complete Ride
                </button>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default DriverDashboard;