import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LogMaintenance() {
  const [assets, setAssets] = useState([]);
  const [form, setForm] = useState({
    asset: '',
    description: '',
    date: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const token = localStorage.getItem('access');
        const res = await axios.get('/api/assets/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssets(res.data);
      } catch (err) {
        setMessage('❌ Failed to load assets.');
      }
    };
    fetchAssets();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access');
      await axios.post(`/api/assets/${form.asset}/maintenance/`, {
        description: form.description,
        date: form.date,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('✅ Maintenance logged successfully!');
    } catch (err) {
      setMessage('❌ Failed to log maintenance.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="mb-3">Log Asset Maintenance</h3>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Select Asset</label>
          <select name="asset" className="form-control" required onChange={handleChange}>
            <option value="">-- Select --</option>
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name} ({asset.category})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea name="description" className="form-control" required onChange={handleChange}></textarea>
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input type="date" name="date" className="form-control" required onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success w-100">Log Maintenance</button>
      </form>
    </div>
  );
}

export default LogMaintenance;
