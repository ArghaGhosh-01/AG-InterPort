import React, { useState, useEffect, useRef } from 'react';

const FullWidthName = () => {
  const [displayContent, setDisplayContent] = useState([]);
  const fullText = "ARGHA GHOSH";
  const typingSpeed = 100;
  const exploreBtnRef = useRef(null);
  const btnTextRef = useRef(null);
  const arrowContainerRef = useRef(null);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        const content = [];
        const currentText = fullText.substring(0, currentIndex);
        
        for (let i = 0; i < currentText.length; i++) {
          const char = currentText[i];
          if (char === ' ') {
            content.push(' ');
          } else {
            content.push(
              <span key={`char-${i}`} className="name-letter">
                {char}
              </span>
            );
          }
        }
        
        setDisplayContent(content);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const btn = exploreBtnRef.current;
    const btnText = btnTextRef.current;
    const arrowContainer = arrowContainerRef.current;

    if (!btn || !btnText || !arrowContainer) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate distance from center (normalized to -1 to 1)
      const distanceX = (x - centerX) / centerX;
      const distanceY = (y - centerY) / centerY;
      
      // Magnetic effect - text moves toward cursor
      btnText.style.transform = `translate(${distanceX * 10}px, ${distanceY * 5}px)`;
      
      // Arrow moves opposite direction for parallax effect
      arrowContainer.style.transform = `translate(${-distanceX * 5}px, ${-distanceY * 3}px)`;
    };

    const handleMouseLeave = () => {
      btnText.style.transform = 'translate(0, 0)';
      arrowContainer.style.transform = 'translate(0, 0)';
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleExploreClick = () => {
    console.log("Explore button clicked!");
  };

  return (
    <div className="full-width-container">
      <h1 className="full-width-name">{displayContent}</h1>
      
      <div 
        className="down-arrow"
        onClick={scrollToAbout}
        aria-label="Scroll to about section"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      <button 
        ref={exploreBtnRef}
        className="explore-btn"
        onClick={handleExploreClick}
      >
        <span ref={btnTextRef} className="btn-text">Lets Talk</span>
        <div ref={arrowContainerRef} className="arrow-container">
          <div className="arrow-tail"></div>
          <svg className="arrow-head" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      <style jsx>{`
        .full-width-container {
          width: 100vw;
          margin-top: 0;
          overflow: hidden;
          background-color: transparent;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 10vh;
        }

        .full-width-name {
          font-family: 'Helvetica', Arial, sans-serif;
          font-weight: bold;
          font-size: 10vw;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.01em;
          white-space: nowrap;
          margin: 0;
          padding: 0.3em 0 0 0;
          width: 100%;
          text-align: center;
          position: relative;
        }

        .name-letter {
          display: inline-block;
          transition: transform 0.2s ease;
        }

        .name-letter:hover {
          transform: translateY(-40px);
        }

        .down-arrow {
          margin-top: 2rem;
          cursor: pointer;
          color: white;
          transition: all 0.3s ease;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          animation: bounce 2s infinite;
        }

        .down-arrow:hover {
          color: black;
          background-color: white;
        }

        .down-arrow svg {
          width: 24px;
          height: 24px;
        }

        .explore-btn {
          position: relative;
          margin-top: 3rem;
          padding: 15px 40px;
          font-size: 1rem;
          font-weight: 600;
          color: white;
          background-color: black;
          border: 1px solid white;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          overflow: hidden;
        }

        .explore-btn:hover {
          color: black;
          background-color: white;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .btn-text {
          transition: transform 0.2s ease-out;
          will-change: transform;
        }

        .arrow-container {
          position: relative;
          width: 24px;
          height: 18px;
          display: flex;
          align-items: center;
          transition: transform 0.2s ease-out;
          will-change: transform;
        }

        .arrow-tail {
          position: absolute;
          left: 0;
          width: 0;
          height: 2px;
          background: currentColor;
          transition: all 0.3s ease;
        }

        .arrow-head {
          width: 12px;
          height: 12px;
          transition: all 0.3s ease;
        }

        .explore-btn:hover .arrow-tail {
          width: 16px;
        }

        .explore-btn:hover .arrow-head {
          transform: translateX(16px);
        }

        .explore-btn:active {
          transform: translateY(1px);
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
};

export default FullWidthName;