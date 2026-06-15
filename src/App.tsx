import React from 'react';
import background from './assets/1.png';
import crouch from './assets/2.png';
import crouchRed from './assets/2 red.png';
import rifle from './assets/3.png';
import rifleRed from './assets/3 red.png';
import four from './assets/4.png';
import five from './assets/5.png';
import standing from './assets/6.png';
import standingRed from './assets/6 red.png';
import seven from './assets/7.png';
import paint from './assets/graphics2.gif';
import code from './assets/code2.gif';
import aboutme from './assets/pfp.png';
import Cv from './assets/Resume.pdf';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [fuzzSrc, setFuzzSrc] = React.useState("");
  const [fuzzLabel, setFuzzLabel] = React.useState("");

  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = Cv;
    link.download = 'EdwardDinneyCV.pdf';
    link.click();
  };
  
  return (
    <div className="App">
      <div className="Header">
      <div className="Title">
         <p>The Portfolio.</p>
      </div>
      </div> 
      <div className="stage">
      
        {fuzzSrc && (
          <div className="displayPreview">
            <img src={fuzzSrc} alt="selection preview" className="fuzz" />
            {fuzzLabel && <p className="displayLabel">{fuzzLabel}</p>}
          </div>
        )}
        <div className="stack">
        
        <img src={background} alt="background" className="background" />
        <img src={four} alt="layer 4" className="extra extra-four" />
        <img src={five} alt="layer 5" className="extra extra-five" />
        <img src={seven} alt="layer 7" className="extra extra-seven" />
        
        <div
          className="sprite sprite-standing hoverSwap"
          onMouseEnter={() => {
            setFuzzSrc(aboutme);
            setFuzzLabel("About me");
          }}
          onMouseLeave={() => {
            setFuzzSrc("");
            setFuzzLabel("");
          }}
        >
        <img src={standing} alt="standing" className="spriteImage normal" onClick={() => navigate('/info')} />
        <img src={standingRed} alt="standing red" className="spriteImage red" onClick={() => navigate('/info')} />
        </div>

        <div
          className="sprite sprite-rifle hoverSwap"
          onMouseEnter={() => {
            setFuzzSrc(code);
            setFuzzLabel("Coding Projects");
          }}
          onMouseLeave={() => {
            setFuzzSrc("");
            setFuzzLabel("");
          }}
        >
        <img src={rifle} alt="rifle" className="spriteImage normal" onClick={() => navigate('/sw-projects')} />
        <img src={rifleRed} alt="rifle red" className="spriteImage red" onClick={() => navigate('/sw-projects')} />
        </div>
        
        <div
          className="sprite sprite-crouch hoverSwap"
          onMouseEnter={() => {
            setFuzzSrc(paint);
            setFuzzLabel("Graphic Design");
          }}
          onMouseLeave={() => {
            setFuzzSrc("");
            setFuzzLabel("");
          }}
        >
        <img src={crouch} alt="crouch" className="spriteImage normal" onClick={() => navigate('/gd-projects')}/>
        <img src={crouchRed} alt="crouch red" className="spriteImage red" onClick={() => navigate('/gd-projects')}/>
        </div>
        
        </div>
        <p className="Instructions">Shoot to select a page.</p>
      </div>
      <div className="Footer">
          <button type="button" className='Resume' onClick={downloadPdf}>Resume</button>
          <button type="button" className='GitHub' onClick={() => window.open('https://github.com/Edward-Dinney')}>GitHub</button>
          <button type="button" className='Contact' onClick={() => navigate('/contact')}>Contact</button>
      </div>
    </div>
  );
}

export default App;
