import { useEffect, useState } from 'react';
import { getPendingUsers, approveUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

function AdminApprovals() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) return navigate('/login');

    loadPendingUsers();
  }, []);

  const loadPendingUsers = async () => {
    try {
      const res = await getPendingUsers();
      setPendingUsers(res.data);
    } catch (err) {
      alert('Unauthorized. Admins only.');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await approveUser(userId);
      alert('User approved!');
      setPendingUsers(prev => prev.filter(u => u.id !== userId));
    } catch (err) {
      alert('Approval failed.');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Pending User Approvals</h3>
      <hr />
      {loading ? (
        <p>Loading...</p>
      ) : pendingUsers.length === 0 ? (
        <p>No users awaiting approval.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-success btn-sm" onClick={() => handleApprove(user.id)}>
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminApprovals;
