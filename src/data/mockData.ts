import { Lead, LeadStatus } from '@/types/lead';

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Aman Sharma',
    email: 'aman@gmail.com',
    phone: '+91 98765 43210',
    company: 'TechStart Solutions',
    status: 'NEW',
    owner: 'Priya',
    ownerId: 'sales_exec_1',
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-01'),
    activities: [
      {
        id: 'a1',
        type: 'note',
        content: 'Initial contact made via LinkedIn',
        createdAt: new Date('2024-11-01'),
        createdBy: 'Priya',
      },
    ],
  },
  {
    id: '2',
    name: 'Karan Mehta',
    email: 'karanmehta@xyz.com',
    phone: '+91 98765 43211',
    company: 'XYZ Enterprises',
    status: 'CONTACTED',
    owner: 'Ravi',
    ownerId: 'manager_1',
    createdAt: new Date('2024-10-28'),
    updatedAt: new Date('2024-11-05'),
    activities: [
      {
        id: 'a2',
        type: 'call',
        content: 'Discovery call completed. Interested in premium tier.',
        createdAt: new Date('2024-11-05'),
        createdBy: 'Ravi',
      },
      {
        id: 'a3',
        type: 'note',
        content: 'Send pricing proposal by EOD',
        createdAt: new Date('2024-11-05'),
        createdBy: 'Ravi',
      },
    ],
  },
  {
    id: '3',
    name: 'Shipra Verma',
    email: 'shipra@startup.in',
    phone: '+91 98765 43212',
    company: 'Startup India',
    status: 'QUALIFIED',
    owner: 'Priya',
    ownerId: 'sales_exec_1',
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date('2024-11-07'),
    activities: [
      {
        id: 'a4',
        type: 'meeting',
        content: 'Product demo scheduled for next week',
        createdAt: new Date('2024-11-07'),
        createdBy: 'Priya',
      },
      {
        id: 'a5',
        type: 'call',
        content: 'Budget confirmed: $50k annual contract',
        createdAt: new Date('2024-11-06'),
        createdBy: 'Priya',
      },
    ],
  },
  {
    id: '4',
    name: 'Raju Kumar',
    email: 'rajukumar@abc.com',
    phone: '+91 98765 43213',
    company: 'ABC Corporation',
    status: 'WON',
    owner: 'Meena',
    ownerId: 'admin_1',
    createdAt: new Date('2024-09-15'),
    updatedAt: new Date('2024-11-03'),
    activities: [
      {
        id: 'a6',
        type: 'meeting',
        content: 'Contract signed! Payment received.',
        createdAt: new Date('2024-11-03'),
        createdBy: 'Meena',
      },
      {
        id: 'a7',
        type: 'note',
        content: 'Onboarding scheduled for Nov 15',
        createdAt: new Date('2024-11-03'),
        createdBy: 'Meena',
      },
    ],
  },
  {
    id: '5',
    name: 'Nidhi Agarwal',
    email: 'nidhi@brandify.io',
    phone: '+91 98765 43214',
    company: 'Brandify',
    status: 'LOST',
    owner: 'Ravi',
    ownerId: 'manager_1',
    createdAt: new Date('2024-10-10'),
    updatedAt: new Date('2024-11-04'),
    activities: [
      {
        id: 'a8',
        type: 'call',
        content: 'Lost to competitor - pricing was main concern',
        createdAt: new Date('2024-11-04'),
        createdBy: 'Ravi',
      },
      {
        id: 'a9',
        type: 'note',
        content: 'Follow up in 6 months for renewal cycle',
        createdAt: new Date('2024-11-04'),
        createdBy: 'Ravi',
      },
    ],
  },
];

export const getLeadsByStatus = (status?: LeadStatus) => {
  if (!status) return mockLeads;
  return mockLeads.filter((lead) => lead.status === status);
};

export const getLeadById = (id: string) => {
  return mockLeads.find((lead) => lead.id === id);
};
