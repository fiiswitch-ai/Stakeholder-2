export type StakeholderInfluence = 'low' | 'medium' | 'high';
export type StakeholderInterest = 'low' | 'medium' | 'high';
export type StakeholderCategory = 'internal' | 'external' | 'key' | 'secondary';

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  organization: string;
  email: string;
  phone?: string;
  influence: StakeholderInfluence;
  interest: StakeholderInterest;
  category: StakeholderCategory;
  notes?: string;
  lastContact?: string;
  engagementScore: number;
  communicationPreference: string[];
}