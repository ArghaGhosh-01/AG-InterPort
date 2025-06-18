import React from 'react';
const About = () => {
  return (
    <div id='about' className="about-container">
      <div className="heading-stack">
        <h1 className="about-heading">I AM</h1>
        <h1 className="about-heading">A FRONTEND DEVELOPER</h1>
        <h1 className="about-heading">FROM INDIA</h1>
      </div>

      <div className="about-sections">
        <div className="about-section">
          <div className="section-content">
            <h2>DISCOVER AND ANALYSIS</h2>
            <p>
              Good development goes beyond functionality—it defines user experience. 
              I begin by understanding your requirements through research and collaboration, 
              ensuring every technical decision serves a purpose.
            </p>
          </div>
          <div className="bullet-points">● ●</div>
        </div>

        <div className="about-section">
          <div className="section-content">
            <h2>DESIGN AND IMPLEMENT</h2>
            <p>
              Creativity meets clean code. From responsive interfaces to scalable components, 
              I ensure consistency across layouts and interactions, delivering solutions that 
              enhance engagement and performance.
            </p>
          </div>
          <div className="bullet-points">● ●</div>
        </div>

        <div className="about-section">
          <div className="section-content">
            <h2>DELIVER AND MONITOR</h2>
            <p>
              Development is more than deployment—it's about real-world impact. 
              I oversee smooth launches, optimizing every detail for functionality 
              and user experience, so your product doesn't just work—it excels.
            </p>
          </div>
          <div className="bullet-points">● ●</div>
        </div>
      </div>

      
    </div>
  );
};

export default About;