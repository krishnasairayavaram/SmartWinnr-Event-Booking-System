import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    price: "",
    totalSeats: "",
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("price", eventData.price);
    formData.append("totalSeats", eventData.totalSeats);
    if (image) formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      await API.post("/event/add", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add event");
    }
  };

  return (
    <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4 fw-bold text-center" style={{ color: "#38bdf8" }}>Post New Event</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-muted">Event Title</label>
          <input type="text" className="form-control" required onChange={(e) => setEventData({...eventData, title: e.target.value})} />
        </div>
        <div className="mb-3">
          <label className="form-label text-muted">Description</label>
          <textarea className="form-control" required rows="3" onChange={(e) => setEventData({...eventData, description: e.target.value})}></textarea>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label text-muted">Date</label>
            <input type="date" className="form-control" required onChange={(e) => setEventData({...eventData, date: e.target.value})} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label text-muted">Price (₹)</label>
            <input type="number" className="form-control" required onChange={(e) => setEventData({...eventData, price: e.target.value})} />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label text-muted">Total Capacity</label>
          <input type="number" className="form-control" required onChange={(e) => setEventData({...eventData, totalSeats: e.target.value})} />
        </div>
        <div className="mb-4">
          <label className="form-label text-muted">Event Poster / Image</label>
          <input 
            type="file" 
            className="form-control" 
            accept="image/*" 
            onChange={(e) => setImage(e.target.files[0])} 
            required 
          />
        </div>

        <button type="submit" className="btn btn-warning w-100 fw-bold py-2 shadow">Create Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
