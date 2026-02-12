import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-4">
        <div className="card p-4 shadow-lg border-0">
          <h3 className="text-center mb-4 fw-bold" style={{ color: "#38bdf8" }}>Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-muted">Email Address</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label text-muted">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3 fw-bold">Login</button>
          </form>
          <div className="text-center">
            <p className="small mb-0 text-muted">Don't have an account? 
              <Link to="/register" className="ms-1 text-info text-decoration-none">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
