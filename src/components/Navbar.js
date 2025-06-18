import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('access');

  // ✅ Must be defined before used
  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Machakos ICT System</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Public pages */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            {/* Authenticated pages */}
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create-asset">Add Asset</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/approvals">Approvals</Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
