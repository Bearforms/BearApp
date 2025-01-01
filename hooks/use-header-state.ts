'use client';

import { create } from 'zustand';

interface HeaderState {
  isThemeOpen: boolean;
  isPreviewOpen: boolean;
  isShareOpen: boolean;
  isSettingsOpen: boolean;
  setThemeOpen: (open: boolean) => void;
  setPreviewOpen: (open: boolean) => void;
  setShareOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
  resetState: () => void;
}

export const useHeaderState = create<HeaderState>((set) => ({
  isThemeOpen: false,
  isPreviewOpen: false,
  isShareOpen: false,
  isSettingsOpen: false,
  setThemeOpen: (open) => set({ isThemeOpen: open }),
  setPreviewOpen: (open) => set({ isPreviewOpen: open }),
  setShareOpen: (open) => set({ isShareOpen: open }),
  setSettingsOpen: (open) => set({ isSettingsOpen: open }),
  resetState: () => set({
    isThemeOpen: false,
    isPreviewOpen: false,
    isShareOpen: false,
    isSettingsOpen: false
  })
}));