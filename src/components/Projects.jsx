import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React & Node.js",
      tags: ["React", "Node.js", "MongoDB"],
      size: "large"
    },
    {
      title: "Portfolio Website",
      description: "Minimalist portfolio design with smooth animations",
      tags: ["React", "Framer Motion", "CSS"],
      size: "small"
    },
    {
      title: "Task Manager",
      description: "Kanban-style productivity app with drag-and-drop",
      tags: ["React", "Firebase", "Tailwind"],
      size: "small"
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather visualization with API integration",
      tags: ["JavaScript", "Chart.js", "API"],
      size: "medium"
    },
    {
      title: "AI Image Generator",
      description: "Stable Diffusion web interface with Python backend",
      tags: ["Python", "Flask", "AI"],
      size: "medium"
    }
  ];

  return (
    <div className="projects-container">
      <h2 className="projects-heading">PROJECTS</h2>
      <div className="bento-grid">
        {projects.map((project, index) => (
          <div 
            key={index}
            className={`project-card ${project.size}`}
          >
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;