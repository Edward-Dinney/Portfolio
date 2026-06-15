import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

const graphicsContext = (require as any).context(
  './graphics',
  false,
  /\.(png|jpe?g|webp|gif)$/i,
) as { keys: () => string[]; (id: string): string };

function imageUrls(): string[] {
  return graphicsContext.keys().map((key) => graphicsContext(key) as string);
}

function Gd() {
  const navigate = useNavigate();
  const urls = React.useMemo(imageUrls, []);
  const [hoveredImage, setHoveredImage] = React.useState<string | null>(null);

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
      <div className="gallery-sidebar">
        <div className="gallery-grid">
          {urls.map((src) => (
            <div
              key={src}
              className="gallery-item"
              onMouseEnter={() => setHoveredImage(src)}
              onClick={() => window.open(src, '_blank', 'noopener,noreferrer')}
            >
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="gallery-preview">
        {hoveredImage ? (
          <img src={hoveredImage} alt="" />
        ) : (
          <div className="preview-placeholder">
            Hover an image
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default Gd;