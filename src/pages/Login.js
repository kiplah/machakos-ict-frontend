import { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ Make sure this is installed

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      const access = res.data.access;
      const refresh = res.data.refresh;

      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      const user = jwtDecode(access);
console.log('Logged in user:', user);

if (user.is_superuser) {
  console.log('Redirecting to admin dashboard');
  navigate('/dashboard/admin');
} else if (user.role === 'clerk') {
  console.log('Redirecting to clerk dashboard');
  navigate('/dashboard/clerk');
} else if (user.role === 'ict') {
  console.log('Redirecting to ict dashboard');
  navigate('/dashboard/ict');
} else {
  console.log('Redirecting to home (fallback)');
  navigate('/');
}



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
