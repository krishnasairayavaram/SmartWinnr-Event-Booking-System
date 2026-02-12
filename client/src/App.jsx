import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddEvent from "./pages/AddEvent";
import Bookings from "./pages/Bookings";
import Success from "./pages/Success";
import Navbar from "./components/Navbar";

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/success" element={user ? <Success /> : <Navigate to="/login" />} />
          
          <Route 
            path="/my-bookings" 
            element={user ? <Bookings /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/add-event" 
            element={user?.role === 'admin' ? <AddEvent /> : <Navigate to="/" />} 
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;