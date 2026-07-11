import { useEffect, useState } from 'react';

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

export function prefetchImage(src: string): void {
  const img = new Image();
  img.src = src;
}

export function usePreloadImages(urls: string[]) {
  const [ready, setReady] = useState(urls.length === 0);
  const urlKey = urls.join('|');

  useEffect(() => {
    if (urls.length === 0) {
      setReady(true);
      return;
    }

    let cancelled = false;
    setReady(false);

    Promise.all(urls.map(preloadImage))
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [urlKey, urls]);

  return ready;
}

export function useIdlePreloadImages(urls: string[]) {
  const urlKey = urls.join('|');

  useEffect(() => {
    if (urls.length === 0) return;

    const preload = () => {
      urls.forEach(prefetchImage);
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      const id = idleWindow.requestIdleCallback(preload);
      return () => idleWindow.cancelIdleCallback?.(id);
    }

    const id = window.setTimeout(preload, 300);
    return () => window.clearTimeout(id);
  }, [urlKey, urls]);
}