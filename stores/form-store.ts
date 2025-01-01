'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Form, ThemeSettings, ThankYouSettings } from '@/types/form';
import { compressImage } from '@/lib/image-utils';
import { defaultThemeSettings, defaultThankYouSettings } from '@/lib/constants/theme-defaults';

interface FormState {
  forms: Form[];
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
  persist(
    (set, get) => ({
      forms: [],
      
      addForm: (form) =>
        set((state) => ({
          forms: [
            ...state.forms,
            {
              ...form,
              themeSettings: {
                ...defaultThemeSettings,
                ...form.themeSettings
              },
              thankYouSettings: {
                ...defaultThankYouSettings,
                ...form.thankYouSettings
              },
              lastUpdated: new Date().toISOString(),
            },
          ],
        })),

      updateForm: async (id, updates) => {
        try {
          let processedUpdates = {
            ...updates,
            lastUpdated: new Date().toISOString(),
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
              ...processedUpdates.themeSettings,
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
              ...processedUpdates.themeSettings,
              logo: compressed,
            };
          }

          set((state) => ({
            forms: state.forms.map((form) =>
              form.id === id ? { ...form, ...processedUpdates } : form
            ),
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
);