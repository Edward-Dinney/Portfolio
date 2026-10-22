import React from 'react';
import '../css/shared.css';
import '../css/sw-projects.css';
import { useNavigate } from 'react-router-dom';
import { usePreloadImages } from '../usePreloadImages';
import projects from '../swProjectList';

function Sw() {
  const navigate = useNavigate();
  const urls = React.useMemo(
    () => projects.map((project) => project.image),
    [],
  );
  usePreloadImages(urls);

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
                <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                {/* <span className="project-title">{project.title}</span> */}
              </a>
            ))}
          </div>
        </div>
        <p className="Instructions Instructions-projects">Click to view projects</p>
      </div>
    </div>
  );
}

export default Sw;
