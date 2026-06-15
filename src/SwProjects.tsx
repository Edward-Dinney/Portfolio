import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import projects from './swProjectList';

function Sw() {
  const navigate = useNavigate();

  return (
    <div className="gallery-page">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate('/')}
      >
        {'<<<'}
      </button>
      <div className="projects-layout">
        <div className="projects-sidebar">
          <div className="projects-grid">
            {projects.map((project) => (
              <a
                key={project.url}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-item"
              >
                <img src={project.image} alt={project.title} loading="lazy" />
                <span className="project-title">{project.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sw;
