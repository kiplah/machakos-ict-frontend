import { useState } from 'react';
import { register } from '../services/api';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone_number: '',
    role: 'clerk',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Registered! Wait for approval.');
    } catch (err) {
      alert('Registration failed.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Register</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            className="form-control"
            placeholder="Enter username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            className="form-control"
            placeholder="Enter phone number"
            onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="clerk">Clerk</option>
            <option value="ict">ICT Officer</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
