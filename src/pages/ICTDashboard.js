import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

function ICTDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) return navigate('/login');

    const user = jwtDecode(token);
    if (user.role !== 'ict') {
      alert('Unauthorized. Only ICT Officers can view this page.');
      navigate('/');
    }
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">💻 ICT Officer Dashboard</h2>
      <p>Welcome! As an ICT Officer, you can:</p>

      <ul className="list-group mb-4">
        <li className="list-group-item">🔎 Audit asset activity and logs</li>
        <li className="list-group-item">🧾 Generate asset reports</li>
        <li className="list-group-item">🛡️ Oversee maintenance operations</li>
      </ul>

      <div className="d-flex gap-3">
        <Link to="/audit-logs" className="btn btn-outline-primary">View Logs</Link>
        <Link to="/reports" className="btn btn-outline-secondary">Generate Reports</Link>
      </div>
    </div>
  );
}

export default ICTDashboard;
