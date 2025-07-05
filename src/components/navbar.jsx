import React, { useState, useEffect } from 'react';
import Logo from '../Images/logo.png';

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
      
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 10); // Update every 10ms for smooth milliseconds
    
    return () => clearInterval(interval);
  }, []);

  const handleContactClick = () => {
    window.location.href = 'mailto:argha7417@gmail.com';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img 
            src={Logo} 
            alt="Logo" 
            className="local-time" 
            style={{marginLeft:'10px', marginRight: '10px', height: '20px' }}
          />
        </div>
        
        <div className="navbar-contact">
          <button onClick={handleContactClick} className="contact-button">
            <span className="button-text">CONTACT NOW</span>
            <span className="button-hover"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;