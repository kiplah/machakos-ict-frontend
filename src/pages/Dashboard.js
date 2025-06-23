import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem('access');
  if (!token) return navigate('/login');

  const user = jwtDecode(token);
  if (!user.is_superuser) {
    alert('Unauthorized. Only admins can access this page.');
    return navigate('/');
  }

  loadData();
}, []);

const [approvedUsers, setApprovedUsers] = useState([]);

const loadData = async () => {
  try {
    const [assetRes, userRes, approvedRes] = await Promise.all([
      API.get('assets/'),
      API.get('users/pending/'),
      API.get('users/approved/')
    ]);
    setAssets(assetRes.data);
    setPendingUsers(userRes.data);
    setApprovedUsers(approvedRes.data);
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
      <h2>👑 Admin Dashboard</h2>
      <hr />

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Asset Management</h5>
              <p>{assets.length} assets in the system.</p>
              <Link to="/create-asset" className="btn btn-sm btn-primary me-2">Create Asset</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">User Approvals</h5>
              <p>{pendingUsers.length} users pending approval.</p>
              <ul className="list-group">
                {pendingUsers.map(user => (
                  <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {user.username} ({user.role})
                    <button className="btn btn-sm btn-success" onClick={() => handleApprove(user.id)}>Approve</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
  <div className="card-body">
    <h5 className="card-title">Registered Users</h5>
    {approvedUsers.length === 0 ? (
      <p>No users approved yet.</p>
    ) : (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Assign Asset</th>
          </tr>
        </thead>
        <tbody>
          {approvedUsers.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/assign-asset/${user.id}`} className="btn btn-sm btn-secondary">
                  Assign
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>


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
