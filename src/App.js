import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import AdminApprovals from './pages/AdminApprovals';
import CreateAsset from './pages/CreateAsset';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/approvals" element={<AdminApprovals />} />
        <Route path="/create-asset" element={<CreateAsset />} />
      </Routes>
    </Router>
  );
}

export default App;
