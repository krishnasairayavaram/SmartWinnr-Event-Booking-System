import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      login(res.data.user, res.data.token); 
      navigate("/"); 
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <div className="card shadow-lg p-4 border-0">
          <h3 className="text-center mb-4 fw-bold" style={{ color: "#38bdf8" }}>Create Account</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-muted">Full Name</label>
              <input type="text" className="form-control" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="mb-3">
              <label className="form-label text-muted">Email</label>
              <input type="email" className="form-control" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="mb-3">
              <label className="form-label text-muted">Password</label>
              <input type="password" className="form-control" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            </div>
            <div className="mb-3">
              <label className="form-label text-muted">Register as</label>
              <select className="form-select" onChange={(e) => setFormData({...formData, role: e.target.value})}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success w-100 fw-bold">Register & Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;