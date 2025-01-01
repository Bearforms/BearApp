'use client';

import { useEffect } from 'react';
import { GOOGLE_FONTS } from '@/lib/constants/fonts';

export function useGoogleFonts(...fontFamilies: string[]) {
  useEffect(() => {
    const loadFont = async (fontFamily: string) => {
      const font = GOOGLE_FONTS.find(f => f.value === fontFamily);
      if (!font) return;

      // Check if font is already loaded
      const existingLink = document.querySelector(`link[href="${font.url}"]`);
      if (existingLink) return;

      // Preload font
      const link = document.createElement('link');
      link.href = font.url;
      link.rel = 'preload';
      link.as = 'style';
      document.head.appendChild(link);

      // Load font
      const styleLink = document.createElement('link');
      styleLink.href = font.url;
      styleLink.rel = 'stylesheet';
      document.head.appendChild(styleLink);

      // Add font-display property
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: '${font.value}';
          font-display: ${font.display || 'swap'};
        }
      `;
      document.head.appendChild(style);
    };

    // Load unique fonts
    const uniqueFonts = Array.from(new Set(fontFamilies));
    uniqueFonts.forEach(loadFont);

    // Cleanup function
    return () => {
      // Only remove fonts that are no longer needed by any component
      const links = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !uniqueFonts.some(font => href.includes(font))) {
          link.remove();
        }
      });
    };
  }, [fontFamilies]);
}