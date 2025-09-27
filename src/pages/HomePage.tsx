import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FarmerButton } from '@/components/FarmerButton';
import { CropType } from './FarmerApp';
import { Sprout, CloudSun, Bell } from 'lucide-react';

interface HomePageProps {
  selectedCrop: CropType | null;
}

export const HomePage: React.FC<HomePageProps> = ({ selectedCrop }) => {
  const { t } = useLanguage();

  const getCropIcon = (crop: CropType | null) => {
    switch (crop) {
      case 'dragonFruit': return '🌵';
      case 'rice': return '🌾';
      case 'jute': return '🌿';
      case 'vegetables': return '🥬';
      default: return '🌱';
    }
  };

  const getCropName = (crop: CropType | null) => {
    switch (crop) {
      case 'dragonFruit': return t('dragonFruit');
      case 'rice': return t('rice');
      case 'jute': return t('jute');
      case 'vegetables': return t('vegetables');
      default: return t('selectCrop');
    }
  };

  return (
    <div className="p-4 pt-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">{t('appName')}</h1>
        <p className="text-lg text-muted-foreground">{t('welcome')}</p>
      </div>

      {/* Selected Crop Card */}
      {selectedCrop && (
        <div className="farmer-card p-6 mb-6 bg-gradient-to-r from-success/10 to-primary/10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{getCropIcon(selectedCrop)}</span>
            <div>
              <h2 className="text-2xl font-bold text-primary">{getCropName(selectedCrop)}</h2>
              <p className="text-muted-foreground">বর্তমান ফসল</p>
            </div>
          </div>
          
          {selectedCrop === 'dragonFruit' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sprout className="text-success" size={16} />
                <span className="text-sm">পরবর্তী পর্যায়: উদ্ভিদীয় বৃদ্ধি</span>
              </div>
              <div className="flex items-center gap-2">
                <CloudSun className="text-warning" size={16} />
                <span className="text-sm">আবহাওয়া: ভালো (২৮°C) good</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary mb-4">দ্রুত কাজ</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <FarmerButton
            variant="earth"
            size="lg"
            icon="📸"
            onClick={() => {}}
          >
            নতুন পর্যবেক্ষণ যোগ করুন
          </FarmerButton>
          
          <FarmerButton
            variant="harvest"
            size="lg"  
            icon="📚"
            onClick={() => {}}
          >
            জীবনচক্র গাইড দেখুন
          </FarmerButton>
          
          <FarmerButton
            variant="secondary"
            size="lg"
            icon="🔔"
            onClick={() => {}}
          >
            স্মরণীয় সেট করুন
          </FarmerButton>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="farmer-card p-4 mt-8 bg-muted/50">
        <p className="text-sm text-center text-muted-foreground">
          {t('privacyNote')}
        </p>
      </div>
    </div>
  );
};