"use client";

export type PanelType = 'theme' | 'share' | 'settings' | null;

export interface PanelState {
  activePanel: PanelType;
  openPanel: (panel: PanelType) => void;
  closePanel: () => void;
}

export const createPanelManager = (
  setIsThemeSettingsOpen: (open: boolean) => void,
  setIsShareOpen: (open: boolean) => void,
  setIsSettingsOpen: (open: boolean) => void
) => {
  const openPanel = (panel: PanelType) => {
    // Close all panels
    setIsThemeSettingsOpen(false);
    setIsShareOpen(false);
    setIsSettingsOpen(false);

    // Open the requested panel
    switch (panel) {
      case 'theme':
        setIsThemeSettingsOpen(true);
        break;
      case 'share':
        setIsShareOpen(true);
        break;
      case 'settings':
        setIsSettingsOpen(true);
        break;
    }
  };

  const closePanel = () => {
    setIsThemeSettingsOpen(false);
    setIsShareOpen(false);
    setIsSettingsOpen(false);
  };

  return {
    openPanel,
    closePanel
  };
};