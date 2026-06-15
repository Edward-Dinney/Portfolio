import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();

  return (
    <div className="gallery-page">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate('/')}
      >
        {'<<<'}
      </button>
      <div className="contact">
        <div className="contact-panel">
          <div className="contact-content">
            <h1>Contacts</h1>
            <div className="contact-details">
              <span className="contact-label">Email:</span>
              <span className="contact-value">dinneyedward679@gmail.com</span>
              <span className="contact-label">Phone:</span>
              <span className="contact-value">0830674542</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
