import type { ColorKey, ResourceType } from './types';

export interface ColorPalette {
  book: string;
  bookLight: string;
  bookDark: string;
  spine: string;
  text: string;
  accent: string;
  bg: string;
  bgSoft: string;
  ring: string;
  glow: string;
}

export const COLOR_PALETTES: Record<ColorKey, ColorPalette> = {
  'dusty-blue': {
    book: '#8ba9c2',
    bookLight: '#a8c0d6',
    bookDark: '#6b8aa8',
    spine: '#6b8aa8',
    text: '#2d4a63',
    accent: '#5a7a9a',
    bg: '#eef3f8',
    bgSoft: '#f5f8fb',
    ring: '#8ba9c2',
    glow: 'rgba(139,169,194,0.35)',
  },
  sage: {
    book: '#a3b899',
    bookLight: '#b9c9b0',
    bookDark: '#7d9a6f',
    spine: '#7d9a6f',
    text: '#3d5235',
    accent: '#6b8a5c',
    bg: '#eef2ea',
    bgSoft: '#f5f8f3',
    ring: '#a3b899',
    glow: 'rgba(163,184,153,0.35)',
  },
  'muted-coral': {
    book: '#d49b8c',
    bookLight: '#e0b3a6',
    bookDark: '#b67a6b',
    spine: '#b67a6b',
    text: '#6b3d30',
    accent: '#b06754',
    bg: '#f8eeea',
    bgSoft: '#fbf5f2',
    ring: '#d49b8c',
    glow: 'rgba(212,155,140,0.35)',
  },
  lavender: {
    book: '#b5a8d0',
    bookLight: '#c9bee0',
    bookDark: '#9485b5',
    spine: '#9485b5',
    text: '#4a3d6b',
    accent: '#7e6ba3',
    bg: '#f2eef8',
    bgSoft: '#f8f5fb',
    ring: '#b5a8d0',
    glow: 'rgba(181,168,208,0.35)',
  },
  amber: {
    book: '#d4b97a',
    bookLight: '#e0cca0',
    bookDark: '#b89a55',
    spine: '#b89a55',
    text: '#6b5226',
    accent: '#a88a3e',
    bg: '#f8f3e8',
    bgSoft: '#fbf7f0',
    ring: '#d4b97a',
    glow: 'rgba(212,185,122,0.35)',
  },
  terracotta: {
    book: '#c98a6b',
    bookLight: '#d6a489',
    bookDark: '#a8694a',
    spine: '#a8694a',
    text: '#6b3920',
    accent: '#a8694a',
    bg: '#f7eee8',
    bgSoft: '#fbf5f0',
    ring: '#c98a6b',
    glow: 'rgba(201,138,107,0.35)',
  },
  'warm-yellow': {
    book: '#e0c878',
    bookLight: '#ead899',
    bookDark: '#c4a852',
    spine: '#c4a852',
    text: '#6b5420',
    accent: '#b89a3e',
    bg: '#faf5e8',
    bgSoft: '#fdf9f0',
    ring: '#e0c878',
    glow: 'rgba(224,200,120,0.35)',
  },
  'dusty-rose': {
    book: '#c9a0a8',
    bookLight: '#d6b8bf',
    bookDark: '#a87c85',
    spine: '#a87c85',
    text: '#6b3d45',
    accent: '#a06a73',
    bg: '#f7eef0',
    bgSoft: '#fbf5f6',
    ring: '#c9a0a8',
    glow: 'rgba(201,160,168,0.35)',
  },
  'soft-teal': {
    book: '#8ab8b5',
    bookLight: '#a4cecb',
    bookDark: '#6a9a96',
    spine: '#6a9a96',
    text: '#2d5250',
    accent: '#5a8a86',
    bg: '#eaf4f3',
    bgSoft: '#f2f9f8',
    ring: '#8ab8b5',
    glow: 'rgba(138,184,181,0.35)',
  },
  'soft-clay': {
    book: '#b8a590',
    bookLight: '#ccbbaa',
    bookDark: '#96826b',
    spine: '#96826b',
    text: '#524435',
    accent: '#8a7660',
    bg: '#f4f0ea',
    bgSoft: '#f9f6f2',
    ring: '#b8a590',
    glow: 'rgba(184,165,144,0.35)',
  },
};

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  book: 'Book',
  article: 'Article',
  video: 'Video',
  podcast: 'Podcast',
  organization: 'Organization',
  helpline: 'Helpline',
};
