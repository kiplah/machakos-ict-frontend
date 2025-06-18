import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function CreateAsset() {
  const [form, setForm] = useState({
    name: '',
    type: '',
    condition: 'New',
    acquisition_date: '',
    value: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('assets/', form);
      alert('Asset created!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to create asset. Make sure you are an admin.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Add New Asset</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Asset Name</label>
          <input
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <input
            className="form-control"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Condition</label>
          <select
            className="form-select"
            value={form.condition}
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Damaged">Damaged</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Acquisition Date</label>
          <input
            type="date"
            className="form-control"
            value={form.acquisition_date}
            onChange={(e) => setForm({ ...form, acquisition_date: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Value (KSh)</label>
          <input
            type="number"
            className="form-control"
            value={form.value}
            onChange={(e) => setForm({ ...form, value: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Save Asset</button>
      </form>
    </div>
  );
}

export default CreateAsset;
