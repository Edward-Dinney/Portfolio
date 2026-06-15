import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function Info() {
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
      <div className="info">
        <div className="info-panel">
          <div className="info-content">
            <h1>About Me</h1>
            <p>
              I'm Edward Dinney, a recent graduate of Maynooth University with a degree in Multimedia, Mobile, and Web Development.
              I have professional experience as both a Front-End Developer and Graphic Designer,
              and I'm eager to continue expanding my skills across a wider range of media disciplines.
              What attracts me most to this field is the challenge of combining strong visual design with seamless functionality.
              I enjoy creating experiences that are not only aesthetically appealing but also intuitive and engaging to use.
              Much of my design inspiration comes from video games, particularly the distinctive and innovative work of Grasshopper Manufacture.
              Their creative approach has greatly influenced the way I think about design and user experiences.
              This portfolio serves as a record of both my past projects and future work,
              allowing me to showcase my growth as a designer and developer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
