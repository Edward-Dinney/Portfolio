import React, { useLayoutEffect, useMemo, useRef } from 'react';
import '../App.css';
import angels from '../gd-assets/Tees/angels.png';
import backPrint from '../gd-assets/Tees/back print.png';
import band from '../gd-assets/Tees/band.png';
import dontChaseAlternateTimelines from '../gd-assets/Tees/dont chase alternate timelines.png';
import heir2 from '../gd-assets/Tees/heir2.png';
import iconwip5 from '../gd-assets/Tees/iconwip5.png';
import insides from '../gd-assets/Tees/insides.png';
import karne from '../gd-assets/Tees/karne.png';
import mechs3 from '../gd-assets/Tees/mechs 3.png';
import monsters from '../gd-assets/Tees/monsters.png';
import newG from '../gd-assets/Tees/new g.png';
import newLogo from '../gd-assets/Tees/New Logo.png';
import prt from '../gd-assets/Tees/prt.png';
import redMask from '../gd-assets/Tees/red mask.png';
import stare from '../gd-assets/Tees/stare.png';
import { useNavigate } from 'react-router-dom';

const teeItems = [
  { src: angels, alt: 'Angels tee design', label: 'Angels', className: 'tees-item-angels' },
  { src: backPrint, alt: 'Back print tee design', label: 'Back Print', className: 'tees-item-back-print' },
  { src: band, alt: 'Band tee design', label: 'Band', className: 'tees-item-band' },
  { src: dontChaseAlternateTimelines, alt: "Don't chase alternate timelines tee design", label: "Don't Chase Alternate Timelines", className: 'tees-item-dont-chase' },
  { src: heir2, alt: 'Heir hoodie design', label: 'Heir', className: 'tees-item-heir2' },
  { src: iconwip5, alt: 'Icon work in progress', label: 'Icon WIP', className: 'tees-item-iconwip5' },
  { src: insides, alt: 'Insides AOP design', label: 'Insides', className: 'tees-item-insides' },
  { src: karne, alt: 'Karne Skate design', label: 'Karne', className: 'tees-item-karne' },
  { src: mechs3, alt: 'Mechs mosaic design', label: 'Mechs', className: 'tees-item-mechs3' },
  { src: monsters, alt: 'Monsters tee design', label: 'Monsters', className: 'tees-item-monsters' },
  { src: newG, alt: 'Collage tee design', label: 'New G', className: 'tees-item-new-g' },
  { src: newLogo, alt: 'New logo tee design', label: 'New Logo', className: 'tees-item-new-logo' },
  { src: prt, alt: 'PRT tee design', label: 'PRT', className: 'tees-item-prt' },
  { src: redMask, alt: 'Red mask tee design', label: 'Red Mask', className: 'tees-item-red-mask' },
  { src: stare, alt: 'Stare design', label: 'Stare', className: 'tees-item-stare' },
];

const LOOP_COPIES = 3;

function Tees() {
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);

  const loopItems = useMemo(
    () =>
      Array.from({ length: LOOP_COPIES }, (_, copyIndex) =>
        teeItems.map((item) => ({
          ...item,
          key: `${item.className}-${copyIndex}`,
        }))
      ).flat(),
    []
  );

  useLayoutEffect(() => {
    const sidebar = sidebarRef.current;
    const grid = gridRef.current;
    if (!sidebar || !grid) return;

    const syncSetWidth = (preservePosition = false) => {
      const nextSetWidth = grid.scrollWidth / LOOP_COPIES;
      if (!nextSetWidth) return;

      if (preservePosition && setWidthRef.current) {
        const offset = sidebar.scrollLeft % setWidthRef.current;
        setWidthRef.current = nextSetWidth;
        sidebar.scrollLeft = nextSetWidth + offset;
        return;
      }

      setWidthRef.current = nextSetWidth;
      sidebar.scrollLeft = nextSetWidth;
    };

    const onScroll = () => {
      const setWidth = setWidthRef.current;
      if (!setWidth) return;

      if (sidebar.scrollLeft <= 1) {
        sidebar.scrollLeft += setWidth;
      } else if (sidebar.scrollLeft >= setWidth * 2 - 1) {
        sidebar.scrollLeft -= setWidth;
      }
    };

    syncSetWidth();
    sidebar.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => syncSetWidth(true);
    window.addEventListener('resize', onResize);

    const resizeObserver = new ResizeObserver(() => syncSetWidth(true));
    resizeObserver.observe(grid);

    return () => {
      sidebar.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="gallery-page Tees">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate(-1)}
      >
        {'<<<'}
      </button>
      <div className="projects-layout">
        <div className="projects-sidebar Tees-scroll" ref={sidebarRef}>
          <div className="projects-grid" ref={gridRef}>
            {loopItems.map((item, index) => (
              <div key={item.key} className={`project-item ${item.className}`}>
                <span className="project-item-label">{item.alt}</span>
                <div className="project-item-media">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading={index < 5 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tees;
