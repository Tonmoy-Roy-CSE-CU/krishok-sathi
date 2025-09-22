import React from 'react';
import { FarmerButton } from './FarmerButton';
import { cn } from '@/lib/utils';

interface CropCardProps {
  name: string;
  icon: string;
  selected?: boolean;
  onClick: () => void;
  className?: string;
}

export const CropCard: React.FC<CropCardProps> = ({
  name,
  icon,
  selected = false,
  onClick,
  className,
}) => {
  return (
    <div className={cn('farmer-card p-1', className)}>
      <FarmerButton
        onClick={onClick}
        variant={selected ? 'earth' : 'secondary'}
        size="xl"
        className={cn(
          'w-full h-32 flex-col gap-2',
          selected && 'ring-2 ring-primary'
        )}
        icon={<span className="text-4xl">{icon}</span>}
      >
        <span className="font-semibold">{name}</span>
      </FarmerButton>
    </div>
  );
};