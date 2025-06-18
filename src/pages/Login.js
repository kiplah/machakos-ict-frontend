import { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      setError('');
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="mb-3">Login</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            className="form-control"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
