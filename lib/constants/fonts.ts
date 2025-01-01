'use client';

export interface GoogleFont {
  id: string;
  name: string;
  value: string;
  category: 'sans-serif' | 'serif' | 'display' | 'handwriting' | 'monospace';
  weights: number[];
  url: string;
  subsets?: string[];
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
}

export const GOOGLE_FONTS: GoogleFont[] = [
  {
    id: 'inter',
    name: 'Inter',
    value: 'Inter',
    category: 'sans-serif',
    weights: [300, 400, 500, 600, 700],
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    subsets: ['latin'],
    display: 'swap'
  },
  {
    id: 'roboto',
    name: 'Roboto',
    value: 'Roboto',
    category: 'sans-serif',
    weights: [300, 400, 500, 700],
    url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
    subsets: ['latin'],
    display: 'swap'
  },
  {
    id: 'open-sans',
    name: 'Open Sans',
    value: 'Open Sans',
    category: 'sans-serif',
    weights: [300, 400, 500, 600, 700],
    url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap',
    subsets: ['latin'],
    display: 'swap'
  },
  {
    id: 'lato',
    name: 'Lato',
    value: 'Lato',
    category: 'sans-serif',
    weights: [300, 400, 700],
    url: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap',
    subsets: ['latin'],
    display: 'swap'
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    value: 'Montserrat',
    category: 'sans-serif',
    weights: [300, 400, 500, 600, 700],
    url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap',
    subsets: ['latin'],
    display: 'swap'
  },
  {
    id: 'poppins',
    name: 'Poppins',
    value: 'Poppins',
    category: 'sans-serif',
    weights: [300, 400, 500, 600, 700],
    url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    subsets: ['latin'],
    display: 'swap'
  },
  {
    id: 'playfair-display',
    name: 'Playfair Display',
    value: 'Playfair Display',
    category: 'serif',
    weights: [400, 500, 600, 700],
    url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap',
    subsets: ['latin'],
    display: 'swap'
  },
  {
    id: 'merriweather',
    name: 'Merriweather',
    value: 'Merriweather',
    category: 'serif',
    weights: [300, 400, 700],
    url: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap',
    subsets: ['latin'],
    display: 'swap'
  },
  {
    id: 'source-code-pro',
    name: 'Source Code Pro',
    value: 'Source Code Pro',
    category: 'monospace',
    weights: [400, 500, 600],
    url: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap',
    subsets: ['latin'],
    display: 'swap'
  }
];