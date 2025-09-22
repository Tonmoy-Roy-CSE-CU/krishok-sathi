import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Home, Sprout, Camera, Bell, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { t } = useLanguage();

  const tabs = [
    { id: 'home', label: t('home'), icon: Home },
    { id: 'lifecycle', label: t('lifecycle'), icon: Sprout },
    { id: 'observations', label: t('observations'), icon: Camera },
    { id: 'reminders', label: t('reminders'), icon: Bell },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  return (
    <nav className="farmer-card p-2 fixed bottom-4 left-4 right-4 z-50">
      <div className="grid grid-cols-5 gap-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              'flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-200',
              activeTab === id
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted text-muted-foreground'
            )}
          >
            <Icon size={20} />
            <span className="text-xs font-medium truncate">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};