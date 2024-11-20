export type RiskStatus = 'identified' | 'analyzing' | 'mitigating' | 'monitoring' | 'closed';
export type RiskProbability = 'low' | 'medium' | 'high';
export type RiskImpact = 'low' | 'medium' | 'high';
export type RiskCategory = 'communication' | 'stakeholder' | 'technical' | 'organizational' | 'external';

export interface RiskResponse {
  id: string;
  type: 'avoid' | 'mitigate' | 'transfer' | 'accept';
  description: string;
  owner: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: string;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  category: RiskCategory;
  probability: RiskProbability;
  impact: RiskImpact;
  status: RiskStatus;
  owner: string;
  dateIdentified: string;
  dateUpdated: string;
  stakeholderIds: string[];
  responses: RiskResponse[];
  triggers: string[];
  aiSuggestions?: string[];
}