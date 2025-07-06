import React, { useState, useEffect, useRef } from 'react';
import ProfilePhoto from './blog.png';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

// Enhanced scramble effect hook with scroll trigger
const useScramble = (text) => {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*';
  const footerRef = useRef(null);

  const scramble = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay((prev) =>
        text
          .split('')
          .map((char, i) => {
            if (i < iterations) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      iterations += 1 / 3;
      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, 30);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            scramble();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, [text]);

  return [display, scramble, footerRef];
};

const Footer = () => {
  const originalText = 'Frontend Developer & UI Designer';
  const [scrambledText, triggerScramble, footerRef] = useScramble(originalText);

  return (
    <footer className="portfolio-footer" ref={footerRef}>
      <div className="footer-content">
        <div className="footer-left">
          <h3 className="footer-name">ARGHA GHOSH</h3>
          <p
            className="footer-bio"
            onMouseEnter={triggerScramble}
            style={{ cursor: 'pointer', fontFamily: 'monospace' }}
          >
            {scrambledText}
          </p>

          <div className="social-links">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FaGithub className="social-icon" />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" />
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" />
            </a>
            <a href="mailto:argha7417@gmail.com">
              <FaEnvelope className="social-icon" />
            </a>
          </div>

          <p className="copyright">
            © {new Date().getFullYear()} Argha Ghosh. All rights reserved.
          </p>
        </div>

        <div className="footer-right">
          <img src={ProfilePhoto} alt="Argha Ghosh" className="profile-photo" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;