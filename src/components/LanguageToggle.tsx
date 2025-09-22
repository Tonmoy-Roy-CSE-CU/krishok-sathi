import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FarmerButton } from './FarmerButton';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      <FarmerButton
        variant={language === 'bn' ? 'earth' : 'secondary'}
        onClick={() => setLanguage('bn')}
        className="px-4 py-2 min-h-[48px] text-base"
      >
        বাংলা
      </FarmerButton>
      <FarmerButton
        variant={language === 'en' ? 'earth' : 'secondary'}
        onClick={() => setLanguage('en')}
        className="px-4 py-2 min-h-[48px] text-base"
      >
        English
      </FarmerButton>
    </div>
  );
};