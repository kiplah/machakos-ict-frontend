import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) return navigate('/login');
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [assetRes, userRes] = await Promise.all([
        API.get('assets/'),
        API.get('users/pending/')
      ]);
      setAssets(assetRes.data);
      setPendingUsers(userRes.data);
    } catch (err) {
      console.error(err);
      alert('Session expired or unauthorized.');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.patch(`users/${id}/approve/`);
      setPendingUsers(pendingUsers.filter(u => u.id !== id));
    } catch {
      alert('Approval failed.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <hr />

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Asset Management</h5>
              <p>{assets.length} assets in the system.</p>
              <Link to="/create-asset" className="btn btn-sm btn-primary me-2">Create Asset</Link>
              {/* You can later add "Assign" or "Maintenance" links here */}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">User Approvals</h5>
              <p>{pendingUsers.length} users pending approval.</p>
              {pendingUsers.length > 0 && (
                <ul className="list-group">
                  {pendingUsers.map(user => (
                    <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{user.username} ({user.role})</span>
                      <button className="btn btn-sm btn-success" onClick={() => handleApprove(user.id)}>
                        Approve
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Display all assets in a table */}
      {assets.length > 0 && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">All Assets</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Condition</th>
                </tr>
              </thead>
              <tbody>
                {assets.map(asset => (
                  <tr key={asset.id}>
                    <td>{asset.name}</td>
                    <td>{asset.type}</td>
                    <td>{asset.status}</td>
                    <td>{asset.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
