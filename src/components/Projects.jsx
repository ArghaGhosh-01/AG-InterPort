import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const projects = [
    {
      id: 1,
      title: "Interactive Dashboard",
      description: "Stream-friendly designed dashboard with multiple interactions",
      tags: ["UI/UX", "Web App"],
      width: "wide",
      bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: "Airpods Max",
      subtitle: "Symphonic Boom",
      description: "3D Interactive Experience for Visual Appeal",
      tags: ["3D Design", "Product"],
      width: "narrow",
      bgImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Intraairbroad",
      subtitle: "Weather app that shows what you need",
      description: "Dark, cross-platform surface with intuitive UI",
      tags: ["Mobile App", "Weather"],
      width: "narrow",
      temp: "32°C",
      location: "Dubai",
      bgImage: "https://images.unsplash.com/photo-1530908295418-a12e326966ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Connect - Website Revamp",
      description: "Award-winning animations and smooth interactions",
      tags: ["Web Design", "Animation"],
      width: "wide",
      features: [
        "Award-Winning Animations",
        "Hackathon Winning Project"
      ],
      bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  // Split heading into letters for animation
  const heading1 = "FEATURED";
  const heading2 = "WORK *";

  return (
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
              transition={{ delay: i * 0.02, type: "spring" }}
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
              transition={{ delay: (i + heading1.length) * 0.02, type: "spring" }}
            >
              {char}
            </motion.span>
          ))}
        </AnimatedHeading>
      </HeadingStack>

      <BentoGrid>
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id}
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
          >
            <ProjectOverlay />
            <ProjectContent>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <Tags>
                {project.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </Tags>
            </ProjectContent>
          </ProjectCard>
        ))}
      </BentoGrid>
    </ProjectsContainer>
  );
};

// Styled components
const ProjectsContainer = styled(motion.section)`
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

const ProjectCard = styled(motion.div)`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: url(${props => props.$bgImage}) center/cover no-repeat;
  border: 1px solid rgba(255, 255, 255, 0.15);
  grid-column: ${props => props.$width === 'wide' ? 'span 8' : 'span 4'};
  aspect-ratio: ${props => props.$width === 'wide' ? '2/1' : '1/1'};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  will-change: transform, opacity;
  filter: grayscale(100%) contrast(110%) brightness(90%);
  transition: filter 0.3s ease, transform 0.3s ease;

  &:hover {
    filter: grayscale(0%) contrast(100%) brightness(100%);
  }

  @media (max-width: 768px) {
    grid-column: span 12;
    aspect-ratio: 3/4;
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const ProjectContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  ${ProjectCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  span {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 0.25rem 0.75rem;
    border-radius: 100px;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

export default Projects;