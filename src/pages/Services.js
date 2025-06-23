import React from 'react';
import './Services.css';

function Services() {
  const serviceList = [
    {
      title: 'Asset Registration',
      icon: 'bi-box-seam',
      desc: 'Easily register all ICT assets into the system with structured categories and details.'
    },
    {
      title: 'Asset Assignment',
      icon: 'bi-person-check',
      desc: 'Assign assets to specific departments or officers and track responsibility.'
    },
    {
      title: 'Maintenance Logging',
      icon: 'bi-tools',
      desc: 'Log maintenance activities, set schedules, and monitor servicing history.'
    },
    {
      title: 'User Management',
      icon: 'bi-people',
      desc: 'Manage user roles, approve new users, and enforce access controls securely.'
    },
    {
      title: 'Audit & Reporting',
      icon: 'bi-bar-chart-line',
      desc: 'Generate reports, track system usage, and maintain audit trails for transparency.'
    },
    {
      title: 'Dashboard Analytics',
      icon: 'bi-graph-up',
      desc: 'Visual insights to monitor asset distribution, maintenance trends, and more.'
    },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Our Services</h2>
      <div className="row">
        {serviceList.map((s, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 text-center shadow-sm">
              <div className="card-body">
                <i className={`bi ${s.icon} display-4 text-primary mb-3`}></i>
                <h5 className="card-title">{s.title}</h5>
                <p className="card-text">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
