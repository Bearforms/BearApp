
import { create } from 'zustand';
import { useFormStore } from './form-store';

interface PopupState {
  openedHeaderPopup: "themeSettings" | "share" | "settings" | null;
  setOpenHeaderPopup: (type: "themeSettings" | "share" | "settings" | null) => void;

  thankYouPopupOpen: boolean;
  setThankYouPopupOpen: (open: boolean) => void;

  buttonSettingsPopupOpen: boolean;
  setButtonSettingsPopupOpen: (open: boolean) => void;

  resetAllPopups: () => void;
}

function resetSelectedField() {
  const formStore = useFormStore.getState();
  if (formStore.selectedField) {
    formStore.setSelectedField(null);
  }
}

export const usePopupStore = create<PopupState>()(
  (set) => ({
    openedHeaderPopup: null,
    thankYouPopupOpen: false,
    buttonSettingsPopupOpen: false,
    setOpenHeaderPopup: (type) => {
      set({ openedHeaderPopup: type, buttonSettingsPopupOpen: false, thankYouPopupOpen: false });
      resetSelectedField();
    },
    setThankYouPopupOpen: (open) => {
      set({ thankYouPopupOpen: open, buttonSettingsPopupOpen: false, openedHeaderPopup: null });
      resetSelectedField();
    },
    setButtonSettingsPopupOpen: (open) => {
      set({ buttonSettingsPopupOpen: open, thankYouPopupOpen: false, openedHeaderPopup: null });
      resetSelectedField();
    },
    resetAllPopups: () => set({
      openedHeaderPopup: null,
      thankYouPopupOpen: false,
      buttonSettingsPopupOpen: false
    })
  })
);