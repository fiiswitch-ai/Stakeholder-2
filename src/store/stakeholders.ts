import { create } from 'zustand';
import type { Stakeholder } from '../types/stakeholder';
import { mockStakeholders } from '../data/mockStakeholders';

interface StakeholderStore {
  stakeholders: Stakeholder[];
  addStakeholder: (stakeholder: Omit<Stakeholder, 'id'>) => void;
  updateStakeholder: (id: string, stakeholder: Partial<Stakeholder>) => void;
  removeStakeholder: (id: string) => void;
}

export const useStakeholderStore = create<StakeholderStore>((set) => ({
  stakeholders: mockStakeholders,
  addStakeholder: (stakeholder) =>
    set((state) => ({
      stakeholders: [
        ...state.stakeholders,
        {
          ...stakeholder,
          id: Math.random().toString(36).substr(2, 9),
        },
      ],
    })),
  updateStakeholder: (id, stakeholder) =>
    set((state) => ({
      stakeholders: state.stakeholders.map((s) =>
        s.id === id ? { ...s, ...stakeholder } : s
      ),
    })),
  removeStakeholder: (id) =>
    set((state) => ({
      stakeholders: state.stakeholders.filter((s) => s.id !== id),
    })),
}));