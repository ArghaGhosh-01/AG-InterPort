import React from 'react';
import styled from 'styled-components';

const Projects = () => {
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

  return (
    <ProjectsContainer id="projects">
      <div className="heading-stack">
        <h1 className="about-heading">FEATURED</h1>
        <h1 className="about-heading">WORK *</h1>
      </div>

      <BentoGrid>
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            $width={project.width} 
            $bgImage={project.bgImage}
          >
            <ProjectContent>
              {/* Content can be added here if needed later */}
            </ProjectContent>
          </ProjectCard>
        ))}
      </BentoGrid>
    </ProjectsContainer>
  );
};

// Styled components
const ProjectsContainer = styled.section`
  max-width: 1200px;
  margin: 10vh auto;
  padding: 0 1.5rem;
  color: #fff;
  font-family: 'Helvetica Neue', sans-serif;
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
  width: 100%;
`;

const ProjectCard = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: url(${props => props.$bgImage}) center/cover no-repeat;
  border: 1px solid rgba(255, 255, 255, 0.1);
  grid-column: ${props => props.$width === 'wide' ? 'span 8' : 'span 4'};
  aspect-ratio: ${props => props.$width === 'wide' ? '2/1' : '1/1'};
  transition: transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    grid-column: span 12;
    aspect-ratio: 3/4;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const ProjectContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

export default Projects;