'use client';

import { useState, useCallback } from 'react';
import { getColorScale } from '@/lib/theme-utils';

type ColorScale = 'gray' | 'neutral' | 'slate' | 'zinc';

export function useColorScale(initialScale: ColorScale = 'gray') {
  const [currentScale, setCurrentScale] = useState<ColorScale>(initialScale);

  const switchColorScale = useCallback((newScale: ColorScale) => {
    setCurrentScale(newScale);
    // Here you could also persist the preference to localStorage
    localStorage.setItem('preferredColorScale', newScale);
  }, []);

  const colors = getColorScale(currentScale);

  return {
    currentScale,
    switchColorScale,
    colors
  };
}