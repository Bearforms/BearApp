export interface Workspace {
  id: string;
  name: string;
  description?: string;
  icon: string | null;
  isPublic?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface WorkspaceMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  avatar: string | null;
}