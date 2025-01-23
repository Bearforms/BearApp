'use client';

import { Workspace } from '@/types/supabase';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WorkspaceState {
  workspaces: Workspace[];
  activeWorkspace: string | null;
  setActiveWorkspace: (workspace: string | null) => void;
  addWorkspace: (workspace: Workspace) => void;
  updateWorkspace: (id: string, workspace: Partial<Workspace>) => void;
  deleteWorkspace: (id: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      workspaces: [],
      activeWorkspace: null,
      setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
      addWorkspace: (workspace) =>
        set((state) => ({
          workspaces: [...state.workspaces, workspace],
        })),
      updateWorkspace: (id, updates) =>
        set((state) => ({
          workspaces: state.workspaces.map((workspace) =>
            workspace.id === id ? { ...workspace, ...updates } : workspace
          ),
        })),
      deleteWorkspace: (id) =>
        set((state) => ({
          workspaces: state.workspaces.filter(
            (workspace) => workspace.id !== id
          ),
        })),
    }),
    {
      name: 'workspace-storage',
      version: 1,
    }
  )
);