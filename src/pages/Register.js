import { useState } from 'react';
import { register } from '../services/api';
import { Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone_number: '',
    role: 'clerk',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('✅ Registered! Wait for approval.');
      setErrors({});
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ non_field_errors: ['Registration failed. Please try again.'] });
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Register</h3>

      {errors.non_field_errors && (
        <div className="alert alert-danger">{errors.non_field_errors[0]}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            name="username"
            className="form-control"
            placeholder="Enter username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          {errors.username && <div className="text-danger small">{errors.username[0]}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          {errors.email && <div className="text-danger small">{errors.email[0]}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            name="phone_number"
            className="form-control"
            placeholder="Enter phone number"
            onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
            required
          />
          {errors.phone_number && <div className="text-danger small">{errors.phone_number[0]}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            name="role"
            className="form-select"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="clerk">Clerk</option>
            <option value="ict">ICT Officer</option>
          </select>
          {errors.role && <div className="text-danger small">{errors.role[0]}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          {errors.password && <div className="text-danger small">{errors.password[0]}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
        <div className="text-center mt-3">
  Already registered? <Link to="/login">Login here</Link>
</div>

      </form>
    </div>
  );
}

export default Register;
