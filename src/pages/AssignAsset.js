import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

function AssignAsset() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [assets, setAssets] = useState([]);
  const [form, setForm] = useState({ asset_id: '', department: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userRes = await API.get('users/approved/');
      const selectedUser = userRes.data.find(u => u.id === parseInt(userId));
      setUser(selectedUser);

      const assetRes = await API.get('assets/');
      // filter unassigned assets only
      const unassigned = assetRes.data.filter(a => a.status !== 'assigned');
      setAssets(unassigned);
    } catch (err) {
      console.error(err);
      alert('Error loading data.');
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      await API.patch(`assets/${form.asset_id}/assign/`, {
        user_id: user.id,
        department: form.department
      });
      setMessage('✅ Asset assigned successfully!');
      setTimeout(() => navigate('/dashboard/admin'), 2000);
    } catch (err) {
      console.error(err);
      alert('Assignment failed.');
    }
  };

  if (!user) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4">Assign Asset to {user.username} ({user.role})</h3>

      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleAssign}>
        <div className="mb-3">
          <label className="form-label">Select Asset</label>
          <select
            className="form-select"
            onChange={(e) => setForm({ ...form, asset_id: e.target.value })}
            required
          >
            <option value="">-- Choose an asset --</option>
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name} ({asset.type})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            className="form-control"
            placeholder="e.g. ICT, Finance, Transport"
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Assign Asset</button>
      </form>
    </div>
  );
}

export default AssignAsset;
