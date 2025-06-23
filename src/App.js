import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import AdminApprovals from './pages/AdminApprovals';
import CreateAsset from './pages/CreateAsset';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Services from './pages/Services';
import About from './pages/About';
import ClerkDashboard from './pages/ClerkDashboard';
import LogMaintenance from './pages/LogMaintenance';
import ICTDashboard from './pages/ICTDashboard';
import AssignAsset from './pages/AssignAsset';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/approvals" element={<AdminApprovals />} />
        <Route path="/create-asset" element={<CreateAsset />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard/clerk" element={<ClerkDashboard />} />
        <Route path="/maintenance-log" element={<LogMaintenance />} />
        <Route path="/dashboard/ict" element={<ICTDashboard />} />
        <Route path="/dashboard/admin" element={<Dashboard />} />
        <Route path="/assign-asset/:userId" element={<AssignAsset />} />
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
