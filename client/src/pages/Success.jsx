import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("processing");
  const hasBooked = useRef(false);

  useEffect(() => {
    const finalizeBooking = async () => {
      const eventId = searchParams.get("eventId");
      const seatsBooked = searchParams.get("seats");
      if (eventId && seatsBooked && !hasBooked.current) {
        hasBooked.current = true; 
        try {
          const token = localStorage.getItem("token");
          await axios.post(
            "http://localhost:5000/api/event/bookings",
            { eventId, seatsBooked: Number(seatsBooked) },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setStatus("success");
        } catch (err) {
          setStatus("error");
        }
      }
    };
    finalizeBooking();
  }, [searchParams]);

  return (
    <div className="container text-center mt-5">
      <div className="card shadow-lg p-5 border-0 rounded-4 mx-auto" style={{ maxWidth: "500px" }}>
        {status === "processing" && <h2 style={{ color: "#38bdf8" }}>Verifying Payment...</h2>}
        {status === "success" && (
          <>
            <div className="display-1 text-success mb-3">✅</div>
            <h2 className="fw-bold">Payment Successful!</h2>
            <p className="text-muted mt-3">Your tickets are confirmed and seats reserved.</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="display-1 text-danger mb-3">❌</div>
            <h2 className="fw-bold">Booking Error</h2>
            <p className="text-muted mt-3">Please contact support regarding your transaction.</p>
          </>
        )}
        <hr className="my-4" style={{ backgroundColor: "#334155" }} />
        <div className="d-grid gap-2">
          <Link to="/my-bookings" className="btn btn-primary btn-lg fw-bold">View My Tickets</Link>
          <Link to="/" className="btn btn-outline-light">Return to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Success;