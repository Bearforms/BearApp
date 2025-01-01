'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Workspace } from '@/types/workspace';

interface WorkspaceState {
  workspaces: Workspace[];
  activeWorkspace: Workspace;
  setActiveWorkspace: (workspace: Workspace) => void;
  addWorkspace: (workspace: Workspace) => void;
  updateWorkspace: (id: string, workspace: Partial<Workspace>) => void;
  deleteWorkspace: (id: string) => void;
}

const defaultWorkspaces: Workspace[] = [
  {
    id: 'personal',
    name: 'Personal',
    icon: null,
    description: 'Your personal workspace',
    isPublic: false,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'team',
    name: 'Team Workspace',
    icon: null,
    description: 'Collaborative workspace for the team',
    isPublic: true,
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z'
  },
  {
    id: 'company',
    name: 'Company HQ',
    icon: null,
    description: 'Main company workspace',
    isPublic: false,
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-03T00:00:00.000Z'
  },
];

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      workspaces: defaultWorkspaces,
      activeWorkspace: defaultWorkspaces[0],
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
          activeWorkspace:
            state.activeWorkspace.id === id
              ? { ...state.activeWorkspace, ...updates }
              : state.activeWorkspace,
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