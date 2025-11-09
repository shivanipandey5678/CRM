export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'WON' | 'LOST';

export interface Activity {
  id: string;
  type: 'note' | 'call' | 'meeting';
  content: string;
  createdAt: Date;
  createdBy: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: LeadStatus;
  owner: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  activities: Activity[];
}
