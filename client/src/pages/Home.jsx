import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);
  const [seatCount, setSeatCount] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/event/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events");
    }
  };

  const handleBook = async (eventId) => {
    if (!user) return navigate("/login");

    const numSeats = seatCount[eventId] || 1;
    const selectedEvent = events.find((e) => e._id === eventId);

    try {
      const token = localStorage.getItem("token");
      const res = await API.post("/payment/create-checkout",
        { event: selectedEvent, seatsBooked: Number(numSeats) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed.");
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4 fw-bold" style={{ color: "#f8fafc" }}>Upcoming Events</h2>
      <div className="row">
        {events.map((event) => {
          const seatsLeft = event.totalSeats - event.bookedSeats;
          const isSoldOut = seatsLeft <= 0;
          const eventImage = (event.images && event.images.length > 0 && event.images[0]) 
                             ? event.images[0] 
                             : "https://via.placeholder.com/400x200?text=No+Image";

          return (
            <div className="col-md-4 mb-4" key={event._id}>
              <div className="card shadow-lg h-100 border-0 overflow-hidden">
                <img
                  src={eventImage}
                  className="card-img-top"
                  alt={event.title}
                  style={{ height: "200px", objectFit: "cover", opacity: "0.9" }}
                />
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title fw-bold" style={{ color: "#38bdf8" }}>{event.title}</h5>
                  </div>
                  
                  <div className="mb-2 small fw-bold" style={{ color: "#a78bfa" }}>
                    📅 {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>

                  <p className="card-text text-muted small flex-grow-1">{event.description}</p>
                  
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="fw-bold fs-5" style={{ color: "#fbbf24" }}>₹{event.price}</span>
                      <span className={`badge ${isSoldOut ? "bg-danger" : "bg-info text-dark"}`}>
                        {isSoldOut ? "Sold Out" : `${seatsLeft} seats left`}
                      </span>
                    </div>
                    {!isSoldOut && (
                      <div className="d-flex align-items-center gap-2">
                        <div className="flex-shrink-0">
                          <label className="small text-muted d-block">Qty:</label>
                          <input
                            type="number"
                            className="form-control"
                            style={{ width: "70px" }}
                            min="1"
                            max={seatsLeft}
                            defaultValue="1"
                            onChange={(e) => setSeatCount({ ...seatCount, [event._id]: e.target.value })}
                          />
                        </div>
                        <button className="btn btn-primary w-100 mt-4 fw-bold" onClick={() => handleBook(event._id)}>
                          Book Now
                        </button>
                      </div>
                    )}
                    {isSoldOut && <button className="btn btn-secondary w-100 fw-bold" disabled>Fully Booked</button>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
