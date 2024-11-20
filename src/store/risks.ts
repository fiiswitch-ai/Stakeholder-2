import { create } from 'zustand';
import type { Risk, RiskResponse } from '../types/risk';

interface RiskStore {
  risks: Risk[];
  addRisk: (risk: Omit<Risk, 'id' | 'dateIdentified' | 'dateUpdated'>) => void;
  updateRisk: (id: string, risk: Partial<Risk>) => void;
  removeRisk: (id: string) => void;
  addResponse: (riskId: string, response: Omit<RiskResponse, 'id'>) => void;
  updateResponse: (riskId: string, responseId: string, response: Partial<RiskResponse>) => void;
  removeResponse: (riskId: string, responseId: string) => void;
}

const mockRisks: Risk[] = [
  {
    id: '1',
    title: 'Stakeholder Communication Breakdown',
    description: 'Key stakeholders not receiving timely project updates',
    category: 'communication',
    probability: 'medium',
    impact: 'high',
    status: 'mitigating',
    owner: 'John Smith',
    dateIdentified: '2024-03-01',
    dateUpdated: '2024-03-15',
    stakeholderIds: ['1', '2'],
    responses: [
      {
        id: '1',
        type: 'mitigate',
        description: 'Implement weekly status update meetings',
        owner: 'Alice Smith',
        status: 'in-progress',
        dueDate: '2024-03-30'
      }
    ],
    triggers: ['Missed deadlines', 'Stakeholder complaints'],
    aiSuggestions: [
      'Consider implementing an automated notification system',
      'Review communication channels effectiveness'
    ]
  },
  {
    id: '2',
    title: 'Stakeholder Requirements Conflict',
    description: 'Different stakeholder groups have conflicting project requirements',
    category: 'stakeholder',
    probability: 'high',
    impact: 'high',
    status: 'analyzing',
    owner: 'Sarah Johnson',
    dateIdentified: '2024-03-10',
    dateUpdated: '2024-03-15',
    stakeholderIds: ['1', '3', '4'],
    responses: [],
    triggers: ['Requirement change requests', 'Stakeholder meetings'],
    aiSuggestions: [
      'Schedule stakeholder alignment workshop',
      'Create requirement traceability matrix'
    ]
  }
];

export const useRiskStore = create<RiskStore>((set) => ({
  risks: mockRisks,
  addRisk: (risk) =>
    set((state) => ({
      risks: [
        ...state.risks,
        {
          ...risk,
          id: Math.random().toString(36).substr(2, 9),
          dateIdentified: new Date().toISOString().split('T')[0],
          dateUpdated: new Date().toISOString().split('T')[0],
        },
      ],
    })),
  updateRisk: (id, risk) =>
    set((state) => ({
      risks: state.risks.map((r) =>
        r.id === id
          ? {
              ...r,
              ...risk,
              dateUpdated: new Date().toISOString().split('T')[0],
            }
          : r
      ),
    })),
  removeRisk: (id) =>
    set((state) => ({
      risks: state.risks.filter((r) => r.id !== id),
    })),
  addResponse: (riskId, response) =>
    set((state) => ({
      risks: state.risks.map((r) =>
        r.id === riskId
          ? {
              ...r,
              responses: [
                ...r.responses,
                { ...response, id: Math.random().toString(36).substr(2, 9) },
              ],
              dateUpdated: new Date().toISOString().split('T')[0],
            }
          : r
      ),
    })),
  updateResponse: (riskId, responseId, response) =>
    set((state) => ({
      risks: state.risks.map((r) =>
        r.id === riskId
          ? {
              ...r,
              responses: r.responses.map((resp) =>
                resp.id === responseId ? { ...resp, ...response } : resp
              ),
              dateUpdated: new Date().toISOString().split('T')[0],
            }
          : r
      ),
    })),
  removeResponse: (riskId, responseId) =>
    set((state) => ({
      risks: state.risks.map((r) =>
        r.id === riskId
          ? {
              ...r,
              responses: r.responses.filter((resp) => resp.id !== responseId),
              dateUpdated: new Date().toISOString().split('T')[0],
            }
          : r
      ),
    })),
}));