import { useEffect, useState } from 'react';

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

export function usePreloadImages(urls: string[]) {
  const [ready, setReady] = useState(urls.length === 0);

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
        if (!cancelled) setReady(true); // still show page if one fails
      });

    return () => {
      cancelled = true;
    };
  }, [urls]);

  return ready;
}