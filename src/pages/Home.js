import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
  className="hero-section text-white d-flex align-items-center"
  style={{ backgroundImage: `url('/images/ict_office.jpeg')` }}
>
  <div className="container">
    <div className="row">
      <div className="col-md-6" data-aos="fade-right">
        <div className="bg-dark bg-opacity-75 p-5 rounded">
          <h1 className="display-5 fw-bold">Smart ICT Asset Management for Machakos County</h1>
          <p className="lead mt-3">Digitizing governance. Enhancing transparency. Enabling real-time decisions.</p>
          <div className="mt-4">
            <Link to="/register" className="btn btn-outline-light btn-lg me-3">Register Now</Link>
            <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Carousel */}
      <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {[
            { src: '/images/maintenance.jpeg', caption: 'Track and log every maintenance operation with precision.' },
            { src: '/images/dashboard.jpeg', caption: 'View insights in real-time with the admin dashboard.' },
            { src: '/images/ict_office.jpeg', caption: 'Built to streamline ICT workflows across departments.' }
          ].map((item, i) => (
            <div className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i}>
              <img src={item.src} className="d-block w-100" alt={`Slide ${i + 1}`} />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                <h5>{item.caption}</h5>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" />
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" />
        </button>
      </div>

      {/* Value Proposition */}
      <section className="py-5 bg-white text-center">
        <div className="container">
          <h2 className="mb-4" data-aos="fade-up">Why This System Matters</h2>
          <div className="row">
            {[
              { icon: 'shield-check', title: 'Accountability', desc: 'Assets and users are recorded transparently.' },
              { icon: 'speedometer2', title: 'Efficiency', desc: 'Automated workflows for fast service delivery.' },
              { icon: 'globe', title: 'Accessibility', desc: 'Available 24/7 to authorized users from any device.' }
            ].map((f, i) => (
              <div className="col-md-4 mb-4" key={i} data-aos="fade-up" data-aos-delay={`${i * 100}`}>
                <i className={`bi bi-${f.icon} display-4 text-primary`}></i>
                <h5 className="mt-3">{f.title}</h5>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4" data-aos="fade-up">Key Features</h2>
          <div className="row">
            {[
              { icon: 'bi-hdd-network', title: 'Asset Registry', desc: 'Digitally log all ICT assets with categories, status & value.' },
              { icon: 'bi-clipboard-data', title: 'Maintenance Tracking', desc: 'Manage service records and monitor repairs efficiently.' },
              { icon: 'bi-person-lines-fill', title: 'User Workflow', desc: 'Role-based access control and approval flows.' },
              { icon: 'bi-graph-up', title: 'Reports & Logs', desc: 'Audit everything from a clean admin interface.' }
            ].map((f, i) => (
              <div className="col-md-3 mb-4" key={i} data-aos="fade-up" data-aos-delay={`${i * 100}`}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <i className={`${f.icon} display-5 text-primary mb-3`}></i>
                    <h5 className="card-title">{f.title}</h5>
                    <p className="card-text">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container text-center">
          <p className="mb-1">© {new Date().getFullYear()} Machakos County ICT Department</p>
          <small>Digitally transforming service delivery with integrity and efficiency.</small>
        </div>
      </footer>
    </div>
  );
}

export default Home;
