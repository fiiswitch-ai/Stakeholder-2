import { create } from 'zustand';
import type { CommunicationPlan, CommunicationHandler } from '../types/communication';

interface CommunicationStore {
  plans: CommunicationPlan[];
  handlers: CommunicationHandler[];
  addPlan: (plan: Omit<CommunicationPlan, 'id'>) => void;
  updatePlan: (id: string, plan: Partial<CommunicationPlan>) => void;
  removePlan: (id: string) => void;
  addHandler: (handler: Omit<CommunicationHandler, 'id'>) => void;
  removeHandler: (id: string) => void;
}

const mockHandlers: CommunicationHandler[] = [
  {
    id: '1',
    name: 'Alice Smith',
    role: 'Communications Coordinator',
    email: 'alice.s@company.com'
  },
  {
    id: '2',
    name: 'Bob Wilson',
    role: 'Stakeholder Relations Manager',
    email: 'bob.w@company.com'
  }
];

const mockPlans: CommunicationPlan[] = [
  {
    id: '1',
    title: 'Weekly Status Update',
    type: 'email',
    frequency: 'weekly',
    stakeholderIds: ['1', '2'],
    description: 'Weekly project status update for key stakeholders',
    template: 'Dear {stakeholder},\n\nHere is your weekly project status update...',
    nextScheduledDate: '2024-03-20',
    status: 'scheduled',
    aiSuggestions: [
      'Consider including more visual metrics',
      'Add section for upcoming milestones'
    ],
    handler: mockHandlers[0]
  },
  {
    id: '2',
    title: 'Monthly Steering Committee',
    type: 'meeting',
    frequency: 'monthly',
    stakeholderIds: ['1', '3', '4'],
    description: 'Monthly steering committee meeting with project sponsors',
    nextScheduledDate: '2024-04-01',
    status: 'scheduled',
    handler: mockHandlers[1]
  }
];

export const useCommunicationStore = create<CommunicationStore>((set) => ({
  plans: mockPlans,
  handlers: mockHandlers,
  addPlan: (plan) =>
    set((state) => ({
      plans: [
        ...state.plans,
        {
          ...plan,
          id: Math.random().toString(36).substr(2, 9),
        },
      ],
    })),
  updatePlan: (id, plan) =>
    set((state) => ({
      plans: state.plans.map((p) =>
        p.id === id ? { ...p, ...plan } : p
      ),
    })),
  removePlan: (id) =>
    set((state) => ({
      plans: state.plans.filter((p) => p.id !== id),
    })),
  addHandler: (handler) =>
    set((state) => ({
      handlers: [
        ...state.handlers,
        {
          ...handler,
          id: Math.random().toString(36).substr(2, 9),
        },
      ],
    })),
  removeHandler: (id) =>
    set((state) => ({
      handlers: state.handlers.filter((h) => h.id !== id),
    })),
}));