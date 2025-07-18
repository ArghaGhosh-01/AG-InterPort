import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { DiHtml5, DiCss3, DiJavascript, DiBootstrap, DiNodejs } from 'react-icons/di';
import { SiTailwindcss, SiExpress } from 'react-icons/si';

// Keyframes for liquid glass effect
const liquidShimmer = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [positions, setPositions] = useState([]);
  const containerRef = useRef(null);

  // Split heading into letters for animation
  const heading1 = "TECHNICAL";
  const heading2 = "SKILLS *";

  // Skill data with icons
  const skills = [
    { name: "HTML", icon: <DiHtml5 size={32} /> },
    { name: "CSS", icon: <DiCss3 size={32} /> },
    { name: "JS", icon: <DiJavascript size={32} /> },
    { name: "BOOTSTRAP", icon: <DiBootstrap size={32} /> },
    { name: "TAILWIND", icon: <SiTailwindcss size={32} /> },
    { name: "NODE JS", icon: <DiNodejs size={32} /> },
    { name: "EXPRESSJS", icon: <SiExpress size={32} /> }
  ];

  // Initialize random positions
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = 200;
      const newPositions = skills.map(() => ({
        x: Math.random() * (containerWidth - 100) + 50,
        y: Math.random() * (containerHeight - 100) + 50
      }));
      setPositions(newPositions);
    }
  }, []);

  // Animation for continuous random movement
  useEffect(() => {
    if (!isInView || positions.length === 0) return;

    const interval = setInterval(() => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = 200;
        const newPositions = positions.map(pos => {
          const moveX = (Math.random() * 100 - 50);
          const moveY = (Math.random() * 40 - 20);
          
          let newX = pos.x + moveX;
          let newY = pos.y + moveY;
          
          newX = Math.max(50, Math.min(containerWidth - 50, newX));
          newY = Math.max(50, Math.min(containerHeight - 50, newY));
          
          return { x: newX, y: newY };
        });
        setPositions(newPositions);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isInView, positions]);

  return (
    <SkillsContainer 
      id='skills' 
      className="skills-container"
      ref={ref}
    >
      <HeadingStack className="heading-stack">
        <AnimatedHeading className="skills-heading">
          {heading1.split("").map((char, i) => (
            <LetterSpan 
              key={`h1-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                delay: i * 0.02,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
            >
              {char}
            </LetterSpan>
          ))}
        </AnimatedHeading>
        
        <AnimatedHeading className="skills-heading">
          {heading2.split("").map((char, i) => (
            <LetterSpan 
              key={`h2-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                delay: (i + heading1.length) * 0.02,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
            >
              {char}
            </LetterSpan>
          ))}
        </AnimatedHeading>
      </HeadingStack>

      <SkillsCircleContainer ref={containerRef}>
        {skills.map((skill, index) => (
          <SkillCircle
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView && positions[index] ? { 
              opacity: 1, 
              scale: 1,
              x: positions[index]?.x || 0,
              y: positions[index]?.y || 0
            } : { opacity: 0, scale: 0 }}
            transition={{ 
              delay: 0.5 + index * 0.1,
              type: "spring",
              stiffness: 100,
              damping: 10,
              x: { duration: 2, ease: "easeInOut" },
              y: { duration: 2, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.1 }}
          >
            <GlassEffect />
            <SkillIcon>{skill.icon}</SkillIcon>
            <SkillName>{skill.name}</SkillName>
          </SkillCircle>
        ))}
      </SkillsCircleContainer>
    </SkillsContainer>
  );
};

// Styled components
const SkillsContainer = styled(motion.section)`
  max-width: 1200px;
  margin: 15vh auto;
  padding: 0 1.5rem;
  color: #fff;
  font-family: 'Helvetica Neue', sans-serif;
  overflow: hidden;
`;

const HeadingStack = styled.div`
  margin-bottom: 4rem;
`;

const AnimatedHeading = styled(motion.h1)`
  display: block;
  font-size: clamp(2rem, 8vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: -0.02em;
`;

const LetterSpan = styled(motion.span)`
  display: inline-block;
  will-change: transform, opacity;
`;

const SkillsCircleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  margin: 5rem 0;
  overflow: visible;
`;

const GlassEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.1)
  );
  background-size: 200% 200%;
  animation: ${liquidShimmer} 6s ease infinite;
  filter: blur(1px);
  z-index: 1;
`;

const SkillCircle = styled(motion.div)`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: translate(-50%, -50%);
  will-change: transform, opacity;
  overflow: hidden;
  box-shadow: 
    0 0 10px rgba(255, 255, 255, 0.1),
    0 0 20px rgba(255, 255, 255, 0.05);

  &:hover {
    backdrop-filter: blur(12px);
    box-shadow: 
      0 0 15px rgba(255, 255, 255, 0.2),
      0 0 30px rgba(255, 255, 255, 0.1);
  }
`;

const SkillIcon = styled.div`
  color: white;
  font-size: 2rem;
  margin-bottom: 0.3rem;
  z-index: 2;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const SkillName = styled.span`
  color: white;
  font-size: 0.7rem;
  font-weight: 300;
  text-transform: uppercase;
  z-index: 2;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
`;

export default Skills;