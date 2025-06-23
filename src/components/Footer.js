import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 pt-4 pb-3">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Logo + Name */}
          <div className="col-md-4 mb-3">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-2">
              <img
                src="/images/county_crest.png"
                alt="Machakos County"
                style={{ height: '40px', marginRight: '10px' }}
              />
              <h5 className="mb-0 fw-bold">Machakos ICT System</h5>
            </div>
            <p className="small text-light">
              Digitally transforming service delivery with integrity and efficiency.
              
              Powering smart county governance through digital innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li><Link to="/services" className="text-white text-decoration-none">Services</Link></li>
              <li><Link to="/about" className="text-white text-decoration-none">About</Link></li>
              <li><Link to="/contact" className="text-white text-decoration-none">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Contact Us</h6>
            <p className="mb-1 small">Email: <a href="mailto:ict@machakos.go.ke" className="text-white text-decoration-underline">ict@machakos.go.ke</a></p>
            <p className="mb-0 small">Phone: +254 703924936</p>
            <p className="mb-0 small">Location: Machakos Town, Kenya</p>
          </div>
        </div>

        <hr className="border-secondary" />
        <div className="text-center small text-muted">
          &copy; {new Date().getFullYear()} County Government of Machakos. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
