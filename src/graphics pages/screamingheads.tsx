import React, { useRef } from 'react';
import '../App.css';
import Flag from '../gd-assets/Screaming heads/reformate/flag.png';
import Layout from '../gd-assets/Screaming heads/layout.png';
import NY from '../gd-assets/Screaming heads/reformate/ny.png';
import Star from '../gd-assets/Screaming heads/reformate/star.png';
import Tee from '../gd-assets/Screaming heads/reformate/tshirt.png';
import Front from '../gd-assets/Screaming heads/reformate/ls1front.png';
import tsFront from '../gd-assets/Screaming heads/reformate/ts1front.png';
import tsBack from '../gd-assets/Screaming heads/reformate/ts1back.png';
import Vest from '../gd-assets/Screaming heads/vestfront.png';
import one from '../gd-assets/Screaming heads/Promo material/1.png';
import two from '../gd-assets/Screaming heads/Promo material/2.png';
import three from '../gd-assets/Screaming heads/Promo material/3.png';
import four from '../gd-assets/Screaming heads/Promo material/4.png';
import five from '../gd-assets/Screaming heads/Promo material/5.png';
import { useNavigate } from 'react-router-dom';
import { useDominantGallerySection } from '../useDominantGallerySection';

const merchItems = [
  { src: Flag, alt: 'Flag', label: 'T-shirt Merch Graphic', className: 'graphics-item-flag' },
  { src: NY, alt: 'NY', label: 'NY Graphic', className: 'graphics-item-ny' },
  { src: Star, alt: 'Star', label: 'Star Graphic', className: 'graphics-item-star' },
  { src: Tee, alt: 'T-shirt', label: 'T-Shirt Design', className: 'graphics-item-tee' },
  { src: Front, alt: 'Long sleeve front', label: 'Long Sleeve Front', className: 'graphics-item-front' },
  { src: tsFront, alt: 'T-shirt front', label: 'T-Shirt Front', className: 'graphics-item-ts-front' },
  { src: tsBack, alt: 'T-shirt back', label: 'T-Shirt Back', className: 'graphics-item-ts-back' },
  { src: Vest, alt: 'Vest front', label: 'Vest Front', className: 'graphics-item-vest' },
  { src: Layout, alt: 'Layout', label: 'Mockups of some graphics on samples', className: 'graphics-item-layout' },
];

const promoItems = [
  { src: one, alt: 'Promo visual 1', label: 'Promo Visual 1', className: 'graphics-item-promo-one' },
  { src: two, alt: 'Promo visual 2', label: 'Promo Visual 2', className: 'graphics-item-promo-two' },
  { src: three, alt: 'Promo visual 3', label: 'Promo Visual 3', className: 'graphics-item-promo-three' },
  { src: four, alt: 'Promo visual 4', label: 'Promo Visual 4', className: 'graphics-item-promo-four' },
  { src: five, alt: 'Promo visual 5', label: 'Promo Visual 5', className: 'graphics-item-promo-five' },
];

const sectionCopy = {
  merch: {
    heading: 'Merch',
    body: 'Merch design was the driving force in this project so all graphics were made with screen printing in mind. The screaming heads being from the 70s means I had to ensure graphics I designed fit that time period. Taking inspiration from vintage t-shirts I made the following graphics.',
  },
  promo: {
    heading: 'Promo Visuals',
    body: 'For promo visuals I wanted to go for that same 70s style but to frame visuals around a "paparazzi at celebrity party". While having this theme I also wanted to put the viewer in the state of being at a wild party in the 70s. I acheived this by using actual celebrity parties. I hid graphics from merch items in the campaign in hopes it would make viewers look a bit longer trying to find more easter eggs.',
  },
} as const;

function Screamingheads() {
  const navigate = useNavigate();
  const galleryRef = useRef<HTMLDivElement>(null);
  const activeSection = useDominantGallerySection(galleryRef, ['merch', 'promo'], 'merch');
  const { heading, body } = sectionCopy[activeSection];

  return (
    <div className="Screaming">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate(-1)}
      >
        {'<<<'}
      </button>
      <div className="Screaming-content">
        <header className="Screaming-intro">
          <h1>Screaming Heads Merch and Promo Visuals</h1>
          <section>
            <h2>Screaming Heads</h2>
            <p>
              The screaming heads are a fictional british rock band from the 70s I created to work on a project that required design for both merch and promo visuals.
            </p>
          </section>
          <section>
            <h2>{heading}</h2>
            <p>{body}</p>
          </section>
        </header>
        <div className="Screaming-gallery" ref={galleryRef}>
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
            data-gallery-section="promo"
            className="Screaming-section-divider"
            style={{ gridRow: merchItems.length + 1 }}
          >
            <span className="Screaming-section-divider-line" aria-hidden="true" />
            <p>Promo Visuals</p>
          </div>
          {promoItems.map((item, index) => {
            const galleryIndex = merchItems.length + index;
            return (
              <div
                key={item.className}
                data-gallery-section="promo"
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

export default Screamingheads;
