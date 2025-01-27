'use client';

import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { Form, ThemeSettings, ThankYouSettings } from '@/types/form';
import { compressImage } from '@/lib/image-utils';
import { defaultThemeSettings, defaultThankYouSettings } from '@/lib/constants/theme-defaults';
import { createClient } from '@/supabase/client';

interface SaveStatus {
  saving: boolean;
  lastSaved: string | null;
  error: string | null;
  isSaved: boolean;
}

interface FormState {
  forms: Form[];
  form: Form | null;
  saveStatus: SaveStatus;
  setSaveStatus: (status: Partial<SaveStatus>) => void;
  initializeForms: (forms: Form[]) => void,
  setForm: (form: Form | null) => void,
  addForm: (form: Form) => void;
  updateForm: (id: string, updates: Partial<Form>) => Promise<boolean>;
  deleteForm: (id: string) => void;
  restoreForm: (id: string) => void;
  permanentlyDeleteForm: (id: string) => void;
  getForm: (id: string) => Form | undefined;
  getDeletedForms: () => Form[];
  updateResponseCount: (formId: string, count: number) => void;
}

export const useFormStore = create<FormState>()(
  subscribeWithSelector(persist(
    (set, get) => ({
      forms: [],
      form: null,
      saveStatus: {
        saving: false,
        lastSaved: null,
        error: null,
        isSaved: false,
      },

      initializeForms: forms => set({ forms }),
      setForm: form => set({ form }),
      addForm: (form) =>
        set((state) => ({
          forms: [
            ...state.forms,
            form,
          ],
        })),
      updateForm: async (id, updates) => {
        try {
          let processedUpdates = {
            ...updates,
          };

          // Handle theme settings updates
          if (updates.themeSettings) {
            processedUpdates.themeSettings = {
              ...defaultThemeSettings,
              ...updates.themeSettings
            };
          }

          // Handle thank you settings updates
          if (updates.thankYouSettings) {
            processedUpdates.thankYouSettings = {
              ...defaultThankYouSettings,
              ...updates.thankYouSettings
            };
          }

          // Process image uploads
          if (updates.themeSettings?.coverImage) {
            const compressed = await compressImage(
              updates.themeSettings.coverImage,
              800,
              600,
              0.7
            );
            processedUpdates.themeSettings = {
              ...(processedUpdates.themeSettings as ThemeSettings),
              coverImage: compressed,
            };
          }

          if (updates.themeSettings?.logo) {
            const compressed = await compressImage(
              updates.themeSettings.logo,
              200,
              200,
              0.7
            );
            processedUpdates.themeSettings = {
              ...(processedUpdates.themeSettings as ThemeSettings),
              logo: compressed,
            };
          }

          set((state) => ({
            forms: state.forms.map((form) =>
              form.id === id ? { ...form, ...processedUpdates } : form
            ),
            form: ({ ...state.form, ...processedUpdates as any })
          }));

          return true;
        } catch (error) {
          console.error('Error updating form:', error);
          throw error;
        }
      },
      deleteForm: (id) =>
        set((state) => ({
          forms: state.forms.map((form) =>
            form.id === id
              ? {
                ...form,
                deletedAt: new Date().toISOString(),
              }
              : form
          ),
        })),
      restoreForm: (id) =>
        set((state) => ({
          forms: state.forms.map((form) =>
            form.id === id
              ? {
                ...form,
                deletedAt: undefined,
                lastUpdated: new Date().toISOString(),
              }
              : form
          ),
        })),

      permanentlyDeleteForm: (id) =>
        set((state) => ({
          forms: state.forms.filter((form) => form.id !== id),
        })),

      getForm: (id) =>
        get().forms.find((form) => form.id === id && !form.deletedAt),

      getDeletedForms: () => get().forms.filter((form) => form.deletedAt),

      updateResponseCount: (formId, count) =>
        set((state) => ({
          forms: state.forms.map((form) =>
            form.id === formId ? { ...form, responses: count } : form
          ),
        })),

      setSaveStatus: (status: Partial<SaveStatus>) =>
        set((state) => ({
          saveStatus: { ...state.saveStatus, ...status },
        })),
    }),
    {
      name: 'form-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...persistedState,
            forms: persistedState.forms.map((form: Form) => ({
              ...form,
              themeSettings: {
                ...defaultThemeSettings,
                ...form.themeSettings
              },
              thankYouSettings: {
                ...defaultThankYouSettings,
                ...form.thankYouSettings
              },
              lastUpdated: form.lastUpdated || new Date().toISOString(),
            })),
          };
        }
        return persistedState;
      },
    }
  )
  )
);

const getChangedProperties = <T extends object>(oldObj: T, newObj: T): Partial<T> => {
  const changes: Partial<T> = {};
  Object.keys(newObj).forEach((key) => {
    const typedKey = key as keyof T;
    if (oldObj[typedKey] !== newObj[typedKey]) {
      changes[typedKey] = newObj[typedKey];
    }
  });
  return changes;
};


let saveTimeout: NodeJS.Timeout;
const SAVE_DELAY = 2000;

useFormStore.subscribe(
  // Select the properties you want to watch
  (state) => ({
    form: state.form,
  }),
  async (newState, oldState) => {
    // Clear any pending save
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    // Get changed properties
    const changes = getChangedProperties(oldState, newState);

    // If no changes, don't save
    if (Object.keys(changes).length === 0) return;

    // Set up debounced save
    saveTimeout = setTimeout(async () => {
      const store = useFormStore.getState();
      if (!store.form) return;
      store.setSaveStatus({ saving: true, isSaved: false });

      try {
        const result = await saveFormDb(store.form);

        store.setSaveStatus({
          saving: false,
          isSaved: true,
          lastSaved: new Date().toISOString(),
          error: result.error
        });

        setTimeout(() => {
          store.setSaveStatus({ isSaved: false });
        }, 2000);
      } catch (error: any) {
        store.setSaveStatus({
          saving: false,
          error: error.message
        });
      }
    }, SAVE_DELAY);
  }
);


async function saveFormDb(form: Form) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from('forms').update(form).eq("id", form.id).select("*").single();

    if (error) console.log("SAVING ERROR: ", error);

    return { success: error === null, data, error: error?.message };

  } catch (error: any) {
    return { success: false, data: null, error: error.message };
  }
}