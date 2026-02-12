import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-lg" style={{ backgroundColor: "#1e293b", borderBottom: "1px solid #334155" }}>
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center">
          {user && (
            <span className="navbar-text text-info fw-bold fs-4 me-3">
              Hello, {user.name}
            </span>
          )}
          <Link className="navbar-brand fw-bold text-white border-start ps-3" to="/">
            SmartWinnr Events
          </Link>
        </div>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-bookings">My Tickets</Link>
                </li>

                {user.role === "admin" && (
                  <li className="nav-item">
                    <Link className="nav-link text-warning" to="/add-event">Add Event</Link>
                  </li>
                )}

                <li className="nav-item">
                  <button 
                    className="btn btn-danger btn-sm ms-lg-3 px-3" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary btn-sm ms-lg-2 px-3" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;