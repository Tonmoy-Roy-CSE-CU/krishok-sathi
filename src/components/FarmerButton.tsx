import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FarmerButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'earth' | 'harvest';
  size?: 'default' | 'lg' | 'xl';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const FarmerButton: React.FC<FarmerButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'default',
  disabled = false,
  className,
  icon,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'earth':
        return 'gradient-earth text-primary-foreground hover:opacity-90';
      case 'harvest':
        return 'gradient-harvest text-accent-foreground hover:opacity-90';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
      default:
        return 'bg-primary text-primary-foreground hover:bg-primary/90';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'lg':
        return 'min-h-[72px] text-xl px-8';
      case 'xl':
        return 'min-h-[80px] text-2xl px-10';
      default:
        return 'min-h-[64px] text-lg px-6';
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'farmer-button font-medium',
        getVariantClasses(),
        getSizeClasses(),
        icon && 'flex items-center gap-3',
        className
      )}
    >
      {icon && <span className="text-2xl">{icon}</span>}
      {children}
    </Button>
  );
};