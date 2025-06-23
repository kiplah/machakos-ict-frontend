import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('access');
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-white');
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-white');
    } else {
      document.body.classList.remove('bg-dark', 'text-white');
    }
  }, [darkMode]);

  const handleNavClick = () => {
    const collapseElement = document.getElementById('navMenu');
    if (collapseElement && collapseElement.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(collapseElement, { toggle: false });
      bsCollapse.hide();
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'} shadow-sm fixed-top`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={handleNavClick}>
          <img src="/images/county_crest.png" alt="Machakos County" style={{ height: '40px', marginRight: '10px' }} />
          <span className="fw-bold">Machakos ICT System</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleNavClick}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services" onClick={handleNavClick}>Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={handleNavClick}>About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={handleNavClick}>Contact</Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard" onClick={handleNavClick}>Dashboard</Link>
              </li>
            )}
            <li className="nav-item">
              <button onClick={toggleDarkMode} className="btn btn-sm btn-outline-secondary ms-2">
                🌙 {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
          </ul>

          {!isAuthenticated ? (
            <div className="d-flex ms-3">
              <Link to="/login" className="btn btn-outline-primary me-2" onClick={handleNavClick}>Login</Link>
              <Link to="/register" className="btn btn-primary" onClick={handleNavClick}>Register</Link>
            </div>
          ) : (
            <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
