export type CommunicationType = 'email' | 'meeting' | 'report' | 'presentation' | 'newsletter';
export type CommunicationFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'adhoc';
export type CommunicationStatus = 'draft' | 'scheduled' | 'sent' | 'completed';

export interface CommunicationHandler {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface CommunicationPlan {
  id: string;
  title: string;
  type: CommunicationType;
  frequency: CommunicationFrequency;
  stakeholderIds: string[];
  description: string;
  template?: string;
  nextScheduledDate?: string;
  status: CommunicationStatus;
  lastSent?: string;
  aiSuggestions?: string[];
  handler?: CommunicationHandler;
}