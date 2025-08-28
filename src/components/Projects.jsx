import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import Chocolate from "../assets/Chocolate.png";
import MetroFlow from "../assets/MetroFlow.png";

const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const projects = [
    {
      id: 1,
      width: "wide",
      bgImage: Chocolate,
      link: "https://argha7417.wixstudio.com/chocolate"
    },
    {
      id: 2,
      width: "narrow",
      bgImage: MetroFlow,
      link: "https://github.com/ArghaGhosh-01/MetroFlow"
    },
    {
      id: 3,
      width: "narrow",
      bgImage: "https://images.unsplash.com/photo-1530908295418-a12e326966ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 4,
      width: "wide",
      bgImage: MetroFlow,
      link: "https://github.com/ArghaGhosh-01/MetroFlow"
    },
    {
      id: 5,
      width: "wide",
      bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      link: "#"
    },
    {
      id: 6,
      width: "narrow",
      bgImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
  ];

  // Split heading into letters for animation
  const heading1 = "FEATURED";
  const heading2 = "WORK *";

  return (
    <div onMouseMove={handleMouseMove}>
      {/* Custom Cursor */}
      <CustomCursor
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          opacity: isHovering ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1 : 0.5})`
        }}
      >
        VIEW
      </CustomCursor>

      <ProjectsContainer 
        className="about-container"
        id="projects"
        ref={sectionRef}
      >
        <HeadingStack className="heading-stack">
          <AnimatedHeading className="about-heading">
            {heading1.split("").map((char, i) => (
              <motion.span 
                key={`h1-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: i * 0.02, type: "spring", stiffness: 100 }}
              >
                {char}
              </motion.span>
            ))}
          </AnimatedHeading>
          
          <AnimatedHeading className="about-heading">
            {heading2.split("").map((char, i) => (
              <motion.span 
                key={`h2-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: (i + heading1.length) * 0.02, type: "spring", stiffness: 100 }}
              >
                {char}
              </motion.span>
            ))}
          </AnimatedHeading>
        </HeadingStack>

        <BentoGrid>
          {projects.map((project, index) => (
            <ProjectLink 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              key={project.id}
              $width={project.width}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <ProjectCard 
                $width={project.width}
                $bgImage={project.bgImage}
                initial={{ 
                  opacity: 0, 
                  x: index % 2 === 0 ? -100 : 100
                }}
                animate={isInView ? { 
                  opacity: 1, 
                  x: 0
                } : { 
                  opacity: 0,
                  x: index % 2 === 0 ? -100 : 100
                }}
                transition={{ 
                  delay: 0.2 + index * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 }
                }}
              />
            </ProjectLink>
          ))}
        </BentoGrid>
      </ProjectsContainer>
    </div>
  );
};

// Styled components
const ProjectsContainer = styled(motion.section)`
  max-width: 1200px;
  margin: 15vh auto;
  padding: 1rem 2.2rem;
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

  span {
    display: inline-block;
    will-change: transform, opacity;
  }
`;

const BentoGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  width: 100%;
`;

const ProjectLink = styled.a`
  text-decoration: none;
  color: inherit;
  grid-column: ${props => props.$width === 'wide' ? 'span 8' : 'span 4'};
  cursor: none;
  
  @media (max-width: 768px) {
    grid-column: span 12;
  }
`;

const ProjectCard = styled(motion.div)`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: url(${props => props.$bgImage}) center/cover no-repeat;
  border: 1px solid rgba(255, 255, 255, 0.15);
  aspect-ratio: ${props => props.$width === 'wide' ? '2/1' : '1/1'};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  will-change: transform, opacity;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    aspect-ratio: 3/4;
  }
`;

const CustomCursor = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  background: white;
  color: black;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, opacity 0.2s ease;
  transform-origin: center;
`;

export default Projects;