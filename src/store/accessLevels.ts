import { create } from 'zustand';

export interface AccessLevelPermissions {
  viewStakeholders: boolean;
  editStakeholders: boolean;
  viewCommunications: boolean;
  editCommunications: boolean;
  viewRisks: boolean;
  editRisks: boolean;
  viewReports: boolean;
  manageUsers: boolean;
}

export interface AccessLevel {
  id: string;
  name: string;
  permissions: AccessLevelPermissions;
}

interface AccessLevelStore {
  accessLevels: AccessLevel[];
  addAccessLevel: (level: Omit<AccessLevel, 'id'>) => void;
  updateAccessLevel: (id: string, updates: Partial<AccessLevel>) => void;
  removeAccessLevel: (id: string) => void;
}

const defaultAccessLevels: AccessLevel[] = [
  {
    id: '1',
    name: 'Administrator',
    permissions: {
      viewStakeholders: true,
      editStakeholders: true,
      viewCommunications: true,
      editCommunications: true,
      viewRisks: true,
      editRisks: true,
      viewReports: true,
      manageUsers: true,
    },
  },
  {
    id: '2',
    name: 'Project Manager',
    permissions: {
      viewStakeholders: true,
      editStakeholders: true,
      viewCommunications: true,
      editCommunications: true,
      viewRisks: true,
      editRisks: true,
      viewReports: true,
      manageUsers: false,
    },
  },
  {
    id: '3',
    name: 'Team Member',
    permissions: {
      viewStakeholders: true,
      editStakeholders: false,
      viewCommunications: true,
      editCommunications: false,
      viewRisks: true,
      editRisks: false,
      viewReports: true,
      manageUsers: false,
    },
  },
];

export const useAccessLevelStore = create<AccessLevelStore>((set) => ({
  accessLevels: defaultAccessLevels,
  addAccessLevel: (level) =>
    set((state) => ({
      accessLevels: [
        ...state.accessLevels,
        { ...level, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),
  updateAccessLevel: (id, updates) =>
    set((state) => ({
      accessLevels: state.accessLevels.map((level) =>
        level.id === id ? { ...level, ...updates } : level
      ),
    })),
  removeAccessLevel: (id) =>
    set((state) => ({
      accessLevels: state.accessLevels.filter((level) => level.id !== id),
    })),
}));