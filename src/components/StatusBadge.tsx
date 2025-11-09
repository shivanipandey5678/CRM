import { LeadStatus } from '@/types/lead';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: LeadStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const variants: Record<LeadStatus, { className: string; label: string }> = {
    NEW: { className: 'bg-blue-100 text-blue-800 hover:bg-blue-100', label: 'New' },
    CONTACTED: { className: 'bg-purple-100 text-purple-800 hover:bg-purple-100', label: 'Contacted' },
    QUALIFIED: { className: 'bg-amber-100 text-amber-800 hover:bg-amber-100', label: 'Qualified' },
    WON: { className: 'bg-green-100 text-green-800 hover:bg-green-100', label: 'Won' },
    LOST: { className: 'bg-red-100 text-red-800 hover:bg-red-100', label: 'Lost' },
  };

  const variant = variants[status];

  return (
    <Badge variant="secondary" className={variant.className}>
      {variant.label}
    </Badge>
  );
};
