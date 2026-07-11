import React from 'react';
import './App.css';
import { usePreloadImages } from './usePreloadImages';
import { useNavigate } from 'react-router-dom';
import projects, { type Project } from './gdProjectsList';

function Gd() {
  const navigate = useNavigate();
  const urls = React.useMemo(
    () => projects.flatMap((project) => [project.image, project.previewImage]),
    [],
  );
  usePreloadImages(urls);
  const [hoveredProject, setHoveredProject] = React.useState<Project | null>(null);
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [showCursorTag, setShowCursorTag] = React.useState(false);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const cursorTagRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const tag = cursorTagRef.current;
    if (!tag) return;
    tag.style.left = `${cursorPos.x + 12}px`;
    tag.style.top = `${cursorPos.y + 12}px`;
  }, [cursorPos.x, cursorPos.y, showCursorTag]);

  const handleItemEnter = (project: Project, event: React.MouseEvent) => {
    setHoveredProject(project);
    setCursorPos({ x: event.clientX, y: event.clientY });
    setShowCursorTag(true);
  };

  const handleItemMove = (event: React.MouseEvent) => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const rect = sidebar.getBoundingClientRect();
    const inSidebar =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    setShowCursorTag(inSidebar);
    if (inSidebar) {
      setCursorPos({ x: event.clientX, y: event.clientY });
    }
  };

  const handleItemLeave = () => {
    setHoveredProject(null);
    setShowCursorTag(false);
  };

  return (
    <div className="gallery-page">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate('/')}
      >
        {'<<<'}
      </button>
      <div className="gallery-layout">
      {/* LEFT */}
      <div className="gallery-sidebar" ref={sidebarRef}>
        <span className="gallery-side-label" aria-hidden="true">Projects</span>
        <div className="gallery-grid">
          {projects.map((project) => (
            <div
              key={project.url}
              className="gallery-item"
              onMouseEnter={(event) => handleItemEnter(project, event)}
              onMouseMove={handleItemMove}
              onMouseLeave={handleItemLeave}
              onClick={() => navigate(new URL(project.url).pathname)}
            >
              <img src={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="gallery-preview">
        {!hoveredProject && (
          <span className="gallery-side-label" aria-hidden="true">Preview</span>
        )}
        {hoveredProject ? (
          <div className="gallery-preview-content">
            <img src={hoveredProject.previewImage} alt={hoveredProject.title} />
            <div className="gallery-preview-caption">
              <h2 className="gallery-preview-title">{hoveredProject.title}</h2>
            </div>
          </div>
        ) : null}
      </div>
      </div>
      {showCursorTag && hoveredProject && (
        <div ref={cursorTagRef} className="gallery-cursor-tag">
          {hoveredProject.title}
        </div>
      )}
    </div>
  );
}

export default Gd;