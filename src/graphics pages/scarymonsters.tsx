import React, { useRef } from 'react';
import '../App.css';
import logoSketch from '../gd-assets/Scary Monsters/1.jpg';
import dollsHoodie from '../gd-assets/Scary Monsters/2.png';
import dragonHero from '../gd-assets/Scary Monsters/3.png';
import graffitiHoodie from '../gd-assets/Scary Monsters/4.png';
import maynoothLogo from '../gd-assets/Scary Monsters/5.png';
import abstractGraphic from '../gd-assets/Scary Monsters/6.png';
import { useNavigate } from 'react-router-dom';
import { useGallerySectionVisible } from '../useDominantGallerySection';

const merchItems = [
  { src: logoSketch, alt: 'Scary Monsters logo sketch', label: 'Logo Design', className: 'scary-monsters-item-logo-sketch' },
  { src: maynoothLogo, alt: 'Maynooth U merch graphic', label: 'Maynooth U Merch Graphic', className: 'scary-monsters-item-maynooth' },
];

const campaignItems = [
  { src: dollsHoodie, alt: 'Scary Monsters sumo hoodie ad', label: 'Sumo Hoodie Ad', className: 'scary-monsters-item-dolls' },
  { src: graffitiHoodie, alt: 'Scary Monsters graffiti ad', label: 'Maynooth U Merch Ad #1', className: 'scary-monsters-item-graffiti' },
  { src: dragonHero, alt: 'Scary Monsters dragon campaign visual', label: 'Maynooth U Merch Ad #2', className: 'scary-monsters-item-dragon' },
  { src: abstractGraphic, alt: 'Scary Monsters tag graphic', label: 'Maynooth U Merch Visual (Inspired by The Thing)', className: 'scary-monsters-item-abstract' },
 ];

const sectionCopy = {
  merch: {
    heading: 'Merch & Logo',
    body: 'With merch the brand only had a university style sweatshirt to work with. When deciding on the design for the Maynooth U centered sweatshirt, I figured a cut based off "Maynooth University" would be so overdone. I designed the warped text shaped like vampire teeth below. I made a monster themed logo that connected a cartoony level of horror with up and coming branding, designed with the rough around the edges style of drawing that the brand wanted to achieve.',
  },
  campaign: {
    heading: 'Campaign Visuals',
    body: 'During the night shoot I aimed to get a horror tone for the brand. During which the night sky aided in emphasizing how eerie the night made everything I had brought along, especially one of the hoodies called the sumo hoodie.',
  },
} as const;

function Scarymonsters() {
  const navigate = useNavigate();
  const galleryRef = useRef<HTMLDivElement>(null);
  const merchVisible = useGallerySectionVisible(galleryRef, 'merch');
  const activeSection = merchVisible ? 'merch' : 'campaign';
  const { heading, body } = sectionCopy[activeSection];

  return (
    <div className="Scary-Monsters">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate(-1)}
      >
        {'<<<'}
      </button>
      <div className="Scary-Monsters-content">
        <header className="Scary-Monsters-intro">
          <h1>Scary Monsters Logo, Merch and Ad Campaign</h1>
          <section>
            <h2>Scary Monsters</h2>
            <p>
              Scary monsters is a clothing brand. I was asked to do some graphic design on a wide scale for the brand and define its visual style. I would achieve this by designing their logo, merch and the accompanying ad campaign.
            </p>
          </section>
          <section>
            <h2>{heading}</h2>
            <p>{body}</p>
          </section>
        </header>
        <div className="Scary-Monsters-gallery" ref={galleryRef}>
          {merchItems.map((item, index) => (
            <div
              key={item.className}
              data-gallery-section="merch"
              className={`graphics-item ${item.className} ${
                index % 2 === 0 ? 'graphics-item--zigzag-left' : 'graphics-item--zigzag-right'
              }`}
              style={{ gridRow: index + 1 }}
            >
              <div className="graphics-item-media">
                <img src={item.src} alt={item.alt} />
              </div>
              <div className="graphics-item-label">
                <span className="graphics-item-divider" aria-hidden="true" />
                <p>{item.label}</p>
              </div>
            </div>
          ))}
          <div
            data-gallery-section="campaign"
            className="Scary-Monsters-section-divider"
            style={{ gridRow: merchItems.length + 1 }}
          >
            <span className="Scary-Monsters-section-divider-line" aria-hidden="true" />
            <p>Campaign Visuals</p>
          </div>
          {campaignItems.map((item, index) => {
            const galleryIndex = merchItems.length + index;
            return (
              <div
                key={item.className}
                data-gallery-section="campaign"
                className={`graphics-item ${item.className} ${
                  galleryIndex % 2 === 0 ? 'graphics-item--zigzag-left' : 'graphics-item--zigzag-right'
                }`}
                style={{ gridRow: merchItems.length + 2 + index }}
              >
                <div className="graphics-item-media">
                  <img src={item.src} alt={item.alt} />
                </div>
                <div className="graphics-item-label">
                  <span className="graphics-item-divider" aria-hidden="true" />
                  <p>{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Scarymonsters;
