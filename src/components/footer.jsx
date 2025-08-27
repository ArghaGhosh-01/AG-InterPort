import React, { useEffect, useRef, useState } from 'react';

const Footer = () => {
  // Function to open social links
  const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Function for smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scramble effect implementation
  const footerRef = useRef(null);
  const scrambleRef = useRef(null);
  const [scrambledText, setScrambledText] = useState('');
  const originalText = "HAVE A PROJECT IN MIND?";
  const chars = "abcdefghi!<>-_\\/[]{}—=+*^?#__________";

  const animateScramble = (targetText, speed) => {
    let iterations = 0;
    const interval = setInterval(() => {
      setScrambledText(prev => {
        let output = '';
        for (let i = 0; i < targetText.length; i++) {
          if (i < iterations) {
            output += targetText[i];
          } else {
            output += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        return output;
      });

      if (iterations >= targetText.length) clearInterval(interval);
      iterations += 1 / 3;
    }, speed);
  };

  const resetAndAnimate = () => {
    // First reset to scrambled state
    let initialScramble = '';
    for (let i = 0; i < originalText.length; i++) {
      initialScramble += chars[Math.floor(Math.random() * chars.length)];
    }
    setScrambledText(initialScramble);
    
    // Then animate to original
    setTimeout(() => {
      animateScramble(originalText, 30);
    }, 100);
  };

  const handleHover = () => {
    animateScramble(originalText, 50);
  };

  useEffect(() => {
    // Initialize with scrambled text
    resetAndAnimate();

    // Set up Intersection Observer to trigger animation when footer comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            resetAndAnimate();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the footer is visible
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <div className="footer-container" ref={footerRef}>
      <header className="footer-header">
        <div aria-label="copyright notice" role="contentinfo">
          © {new Date().getFullYear()}
        </div>
        <button 
          aria-label="Back to top" 
          className="back-to-top" 
          onClick={scrollToTop}
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <path d="M12 16V8M12 8L8 12M12 8L16 12" />
          </svg>
        </button>
      </header>

      <main className="footer-main-content">
        <p 
          className="intro-text" 
          ref={scrambleRef}
          onMouseEnter={handleHover}
        >
          {scrambledText}
        </p>
        <h1 className="headline" aria-label="Let's Talk">
          <span className="headline-line">LET'S</span>
          <span className="headline-line">TALK !</span>
        </h1>
        <div className="btn-container" role="navigation" aria-label="Social links">
          <button className="social-btn" type="button" onClick={() => openLink('https://github.com/ArghaGhosh-01')}>
            GITHUB
          </button>
          <button className="social-btn" type="button" onClick={() => openLink('https://www.linkedin.com/in/argha-ghosh-94496a226/')}>
            LINKEDIN
          </button>
          <button className="social-btn" type="button" onClick={() => openLink('https://x.com/arghaUXDev')}>
            X
          </button>
        </div>
      </main>

      <footer className="footer-bottom">
        <p>
          Designed<span>           &</span><br />
          Developed by <span>Argha Ghosh</span>
        </p>
      </footer>

      <style jsx>{`
        /* Reset and base */
        .footer-container {
          margin: 0;
          background: transparent;
          color: #eee;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.4;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1rem 2rem;
        }

        /* Header styles */
        .footer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: clamp(0.75rem, 1vw, 0.875rem);
          user-select: none;
        }

        /* Back to top button styles */
        .back-to-top {
          background: #222;
          border-radius: 50%;
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border: none;
          color: #eee;
          font-weight: 700;
          font-size: 1.25rem;
          transition: background-color 0.3s ease;
        }
        .back-to-top:hover, .back-to-top:focus {
          background: #444;
          outline: none;
        }
        .back-to-top svg {
          stroke: #eee;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          width: 16px;
          height: 16px;
        }

        /* Main content styles */
        .footer-main-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 1200px;
          margin: 2rem auto 0 auto;
          width: 100%;
        }

        .intro-text {
          font-size: clamp(0.75rem, 1vw, 1rem);
          letter-spacing: 0.03em;
          margin-bottom: 0.25em;
          font-weight: 500;
          color: #aaa;
          cursor: default;
          transition: all 0.3s ease;
        }

        .intro-text:hover {
          color: #eee;
        }

        /* Headline styles */
        .headline {
          font-weight: 900;
          font-size: clamp(4rem, 15vw, 10rem);
          line-height: 1;
          letter-spacing: 0.02em;
          color: black;
          -webkit-text-stroke: 2.5px #eee;
          text-stroke: 2.5px #eee;
          user-select: none;
          margin-top: 0;
          margin-bottom: 2rem;
          overflow-wrap: normal;
        }

        .headline-line {
          display: block;
        }

        /* Buttons container */
        .btn-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        /* Buttons style */
        .social-btn {
          background: white;
          border: 1.5px solid #eee;
          border-radius: 9999px;
          color: black;
          font-weight: 600;
          padding: 0.5rem 1.8rem;
          font-size: clamp(0.75rem, 0.9vw, 1rem);
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
          user-select: none;
        }
        .social-btn:hover,
        .social-btn:focus {
          background-color: black;
          color: white;
          outline: none;
        }

        /* Footer bottom styles */
        .footer-bottom {
          font-size: clamp(0.7rem, 1vw, 0.9rem);
          text-align: right;
          color: #aaa;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          padding-bottom: 1rem;
          font-weight: 400;
          user-select: none;
        }

        .footer-bottom span {
          font-weight: 700;
          color: #eee;
        }

        /* Responsive tweaks */
        @media (max-width: 768px) {
          .headline {
            font-size: clamp(3rem, 20vw, 8rem);
            -webkit-text-stroke: 2px #eee;
            text-stroke: 2px #eee;
          }
          
          .headline-line {
            display: block;
            white-space: nowrap;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            padding: 1rem;
          }
          
          .headline {
            font-size: clamp(2.5rem, 18vw, 6rem);
            -webkit-text-stroke: 1.5px #eee;
            text-stroke: 1.5px #eee;
          }
          
          .footer-bottom {
            text-align: left;
          }
          
          .btn-container {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Footer;