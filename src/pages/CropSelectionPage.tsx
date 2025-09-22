import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CropCard } from '@/components/CropCard';
import { FarmerButton } from '@/components/FarmerButton';
import { CropType } from './FarmerApp';

interface CropSelectionPageProps {
  onCropSelect: (crop: CropType) => void;
}

export const CropSelectionPage: React.FC<CropSelectionPageProps> = ({ onCropSelect }) => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState<CropType | null>(null);

  const crops = [
    { type: 'dragonFruit' as CropType, name: t('dragonFruit'), icon: '🌵' },
    { type: 'rice' as CropType, name: t('rice'), icon: '🌾' },
    { type: 'jute' as CropType, name: t('jute'), icon: '🌿' },
    { type: 'vegetables' as CropType, name: t('vegetables'), icon: '🥬' },
  ];

  const handleConfirm = () => {
    if (selectedCrop) {
      onCropSelect(selectedCrop);
    }
  };

  return (
    <div className="p-4 pt-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">{t('appName')}</h1>
        <h2 className="text-xl font-semibold text-primary mb-4">{t('selectCrop')}</h2>
        <p className="text-muted-foreground">
          আপনার ফসল বেছে নিন এবং বিশেষজ্ঞ গাইডেন্স পান
        </p>
      </div>

      {/* Crop Selection Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {crops.map((crop) => (
          <CropCard
            key={crop.type}
            name={crop.name}
            icon={crop.icon}
            selected={selectedCrop === crop.type}
            onClick={() => setSelectedCrop(crop.type)}
          />
        ))}
      </div>

      {/* Featured: Dragon Fruit */}
      {selectedCrop === 'dragonFruit' && (
        <div className="farmer-card p-6 mb-6 gradient-earth">
          <div className="text-center text-white">
            <span className="text-4xl block mb-2">🌵</span>
            <h3 className="text-xl font-bold mb-2">ড্রাগন ফল - বিশেষ ফসল</h3>
            <p className="text-sm opacity-90">
              উচ্চ মূল্যের ফল, কম রক্ষণাবেক্ষণ, বছরব্যাপী ফলন
            </p>
          </div>
        </div>
      )}

      {/* Confirm Button */}
      {selectedCrop && (
        <div className="fixed bottom-24 left-4 right-4">
          <FarmerButton
            variant="earth"
            size="xl"
            onClick={handleConfirm}
            className="w-full"
            icon="✓"
          >
            নিশ্চিত করুন
          </FarmerButton>
        </div>
      )}

      {/* Benefits */}
      <div className="farmer-card p-4 bg-muted/50">
        <h4 className="font-semibold text-primary mb-2">অ্যাপের সুবিধা</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• বিশেষজ্ঞ পরামর্শ</li>
          <li>• পর্যায়ভিত্তিক গাইড</li>
          <li>• ছবি সহ পর্যবেক্ষণ</li>
          <li>• অফলাইন ব্যবহার</li>
        </ul>
      </div>
    </div>
  );
};