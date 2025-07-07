import React, { useState, useEffect, useRef } from 'react';

const FullWidthName = () => {
  const [displayContent, setDisplayContent] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const fullText = "ARGHA GHOSH";
  const animationDelay = 100;
  const hoverTransitionDelay = 50;
  const exploreBtnRef = useRef(null);
  const btnTextRef = useRef(null);
  const arrowContainerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const content = [];
    
    for (let i = 0; i < fullText.length; i++) {
      const char = fullText[i];
      const isSpace = char === ' ';
      
      content.push(
        <span 
          key={`char-${i}`} 
          className={`name-letter`}
          style={{
            animationDelay: `${i * animationDelay}ms`,
            opacity: 0,
            display: 'inline-block',
            position: 'relative',
            width: isSpace ? '0.5em' : 'auto',
            minWidth: isSpace ? '0.5em' : 'auto',
            '--hover-delay': `${(i - hoverIndex) * hoverTransitionDelay}ms`,
          }}
          onMouseEnter={() => setHoverIndex(i)}
          onMouseLeave={() => setHoverIndex(-1)}
          data-char={char}
          data-index={i}
        >
          {!isSpace && (
            <>
              <span className={`normal-char ${hoverIndex >= 0 && i >= hoverIndex ? 'hidden' : ''}`}>
                {char}
              </span>
              <span className={`outline-effect ${hoverIndex >= 0 && i >= hoverIndex ? 'visible' : ''}`}>
                {char}
              </span>
            </>
          )}
        </span>
      );
    }
    
    setDisplayContent(content);
  }, [hoverIndex]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const triggerPoint = window.innerHeight * 0.8;
        if (rect.top < triggerPoint && rect.bottom > 0) {
          setIsButtonVisible(true);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      
      const distanceX = (x - centerX) / centerX;
      const distanceY = (y - centerY) / centerY;
      
      btnText.style.transform = `translate(${distanceX * 10}px, ${distanceY * 5}px)`;
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

  const handleExploreClick = (e) => {
    e.currentTarget.classList.add('clicked');
    setTimeout(() => {
      e.currentTarget.classList.remove('clicked');
    }, 500);
    setTimeout(() => {
      window.open('https://drive.google.com/file/d/1BlPIvhSgcrdGe4CXLfh82sjSeEs-sgBU/view?usp=sharing', '_blank');
    }, 300);
  };

  return (
    <div className="full-width-container" ref={containerRef}>
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
        className={`explore-btn ${isButtonVisible ? 'visible' : ''}`}
        onClick={handleExploreClick}
      >
        <span ref={btnTextRef} className="btn-text">View Resume</span>
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
          z-index: 100;
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
          white-space: pre;
          margin: 0;
          padding: 0.3em 0 0 0;
          width: 100%;
          text-align: center;
          position: relative;
        }

        .name-letter {
          display: inline-block;
          transform: translateY(20px);
          animation: letterAppear 0.6s ease forwards;
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        @keyframes letterAppear {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .name-letter:hover {
          transform: translateY(-40px);
        }

        .normal-char {
          display: inline-block;
          transition: opacity 0.3s ease;
        }

        .normal-char.hidden {
          opacity: 0;
          transition-delay: calc(var(--hover-delay));
        }

        .outline-effect {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          color:black;
          -webkit-text-stroke: 2px white;
          text-stroke: 2px white;
          z-index: -1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .outline-effect.visible {
          opacity: 1;
          transition-delay: calc(var(--hover-delay));
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
          display: flex;
          align-items: center;
          gap: 10px;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.3s ease;
        }

        .explore-btn.visible {
          opacity: 1;
        }

        .explore-btn:hover {
          color: black;
          background-color: white;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .explore-btn.clicked {
          animation: buttonClick 0.5s ease;
        }

        @keyframes buttonClick {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
          }
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