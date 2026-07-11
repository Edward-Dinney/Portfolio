import { RefObject, useEffect, useState } from 'react';

function getVisibleHeight(element: HTMLElement, root: HTMLElement): number {
  const rootRect = root.getBoundingClientRect();
  const rect = element.getBoundingClientRect();
  const top = Math.max(rect.top, rootRect.top);
  const bottom = Math.min(rect.bottom, rootRect.bottom);
  return Math.max(0, bottom - top);
}

export function useGallerySectionVisible(
  galleryRef: RefObject<HTMLElement | null>,
  sectionId: string
): boolean {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const update = () => {
      let visibleHeight = 0;

      gallery.querySelectorAll<HTMLElement>(`[data-gallery-section="${sectionId}"]`).forEach((element) => {
        visibleHeight += getVisibleHeight(element, gallery);
      });

      setIsVisible(visibleHeight > 0);
    };

    update();
    gallery.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      gallery.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [galleryRef, sectionId]);

  return isVisible;
}

export function useDominantGallerySection<T extends string>(
  galleryRef: RefObject<HTMLElement | null>,
  sectionIds: T[],
  defaultSection: T
): T {
  const [activeSection, setActiveSection] = useState<T>(defaultSection);
  const sectionKey = sectionIds.join('|');

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const update = () => {
      const totals = new Map<T, number>();

      for (const sectionId of sectionIds) {
        totals.set(sectionId, 0);
      }

      gallery.querySelectorAll<HTMLElement>('[data-gallery-section]').forEach((element) => {
        const sectionId = element.dataset.gallerySection as T;
        if (!totals.has(sectionId)) return;
        totals.set(sectionId, (totals.get(sectionId) ?? 0) + getVisibleHeight(element, gallery));
      });

      let dominantSection = defaultSection;
      let maxVisible = -1;

      totals.forEach((visible, sectionId) => {
        if (visible > maxVisible) {
          maxVisible = visible;
          dominantSection = sectionId;
        }
      });

      setActiveSection(dominantSection);
    };

    update();
    gallery.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      gallery.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [galleryRef, defaultSection, sectionKey]);

  return activeSection;
}
