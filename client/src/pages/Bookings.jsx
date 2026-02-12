import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Bookings = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/event/my-bookings", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setHistory(Array.isArray(res.data) ? res.data : []); 
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          navigate("/login");
          return;
        }
        
        console.error("Failed to load history", err);
        setError("Could not load your tickets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [logout, navigate]);

  if (loading) return <div className="text-center mt-5">Loading History...</div>;
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-4">My Tickets</h3>
      {history.length === 0 ? (
        <div className="alert alert-info">You haven't booked any events yet.</div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>Event Name</th>
                <th>Seats</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((b) => (
                <tr key={b._id}>
                  <td className="fw-bold">{b.eventId?.title || "Event Deleted"}</td>
                  <td>{b.seatsBooked}</td>
                  <td className="text-success fw-bold">
                    ₹{b.seatsBooked * (b.eventId?.price || 0)}
                  </td>
                  <td><span className="badge bg-success">Confirmed</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Bookings;
