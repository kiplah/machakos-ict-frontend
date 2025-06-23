import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

function ClerkDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) return navigate('/login');

    const user = jwtDecode(token);
    if (user.role !== 'clerk') {
      alert('Unauthorized. Only clerks can view this page.');
      navigate('/');
    }
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">👨‍💼 Clerk Dashboard</h2>
      <p>Welcome! As a Clerk, you can manage the following:</p>

      <div className="row mt-4">
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-box-seam display-4 text-primary"></i>
              <h5 className="mt-3">Create Asset</h5>
              <p>Register new ICT equipment into the system.</p>
              <Link to="/create-asset" className="btn btn-sm btn-primary mt-2">Go</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-tools display-4 text-success"></i>
              <h5 className="mt-3">Log Maintenance</h5>
              <p>Record repair and service activities for assets.</p>
              <Link to="/maintenance-log" className="btn btn-sm btn-success mt-2">Log</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-list-check display-4 text-warning"></i>
              <h5 className="mt-3">My Assets</h5>
              <p>View all assets assigned to your department or user.</p>
              <Link to="/my-assets" className="btn btn-sm btn-warning mt-2">View</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClerkDashboard;
