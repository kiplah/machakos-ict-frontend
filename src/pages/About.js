import React from 'react';
import './About.css';

function About() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">About the Machakos ICT System</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <p className="lead">
            The Machakos County ICT Asset Management System is a centralized digital platform designed to streamline
            the registration, assignment, maintenance, and audit of ICT resources across all county departments.
          </p>
          <p>
            This system was developed with the goal of enhancing transparency, improving resource tracking,
            and enabling real-time insights for better decision-making. Through this platform, county administrators
            and ICT officers can effectively manage their technological infrastructure while maintaining accountability
            and compliance.
          </p>
          <p>
            The project reflects Machakos County's commitment to digital transformation and service excellence
            in public administration.
          </p>
          <p>
            Key objectives include:
          </p>
          <ul>
            <li>📦 Comprehensive tracking of ICT assets</li>
            <li>🛠️ Streamlined maintenance and service logging</li>
            <li>👥 Secure user access and approval workflows</li>
            <li>📊 Reliable audit trails and reporting</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
