import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FarmerButton } from '@/components/FarmerButton';
import { CropType } from './FarmerApp';
import { Sprout, Droplets, Beaker, AlertTriangle } from 'lucide-react';

interface LifecyclePageProps {
  selectedCrop: CropType | null;
}

const dragonFruitStages = [
  {
    id: 'propagation',
    icon: '🌱',
    nameKey: 'propagation',
    descKey: 'propagationDesc',
    duration: '২-৪ সপ্তাহ',
    tips: [
      'রোগমুক্ত কাটিং নির্বাচন করুন',
      'ছায়াযুক্ত স্থানে রোপণ করুন',
      'মাটি সামান্য আর্দ্র রাখুন'
    ]
  },
  {
    id: 'vegetative',
    icon: '🌿',
    nameKey: 'vegetativeGrowth',
    descKey: 'vegetativeDesc',
    duration: '৬-১২ মাস',
    tips: [
      'নিয়মিত পানি দিন',
      'জৈব সার প্রয়োগ করুন',
      'আগাছা পরিষ্কার রাখুন'
    ]
  },
  {
    id: 'flowering',
    icon: '🌸',
    nameKey: 'flowering',
    descKey: 'floweringDesc',
    duration: '১-২ মাস',
    tips: [
      'হাত পরাগায়ন করুন',
      'রাতে ফুল ফোটে',
      'পুষ্টি বৃদ্ধি করুন'
    ]
  },
  {
    id: 'fruiting',
    icon: '🍓',
    nameKey: 'fruiting',
    descKey: 'fruitingDesc',
    duration: '৩০-৪৫ দিন',
    tips: [
      'ফল সাপোর্ট দিন',
      'নিয়মিত পরিদর্শন করুন',
      'পরিমিত পানি দিন'
    ]
  },
  {
    id: 'harvesting',
    icon: '🧺',
    nameKey: 'harvesting',
    descKey: 'harvestingDesc',
    duration: 'ধারাবাহিক',
    tips: [
      'সকালে ফল তুলুন',
      'রঙ পরিবর্তনের দিকে খেয়াল রাখুন',
      'যত্নসহকারে সংগ্রহ করুন'
    ]
  }
];

export const LifecyclePage: React.FC<LifecyclePageProps> = ({ selectedCrop }) => {
  const { t } = useLanguage();
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  if (!selectedCrop) {
    return (
      <div className="p-4 pt-8 text-center">
        <p className="text-lg text-muted-foreground">প্রথমে একটি ফসল নির্বাচন করুন</p>
      </div>
    );
  }

  if (selectedCrop !== 'dragonFruit') {
    return (
      <div className="p-4 pt-8 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">{t('lifecycle')}</h2>
        <div className="farmer-card p-6">
          <p className="text-lg text-muted-foreground mb-4">
            {selectedCrop === 'rice' ? '🌾' : selectedCrop === 'jute' ? '🌿' : '🥬'} এর জীবনচক্র গাইড শীঘ্রই আসছে
          </p>
          <p className="text-sm text-muted-foreground">
            বর্তমানে ড্রাগন ফলের জন্য বিস্তারিত গাইড উপলব্ধ
          </p>
        </div>
      </div>
    );
  }

  const selectedStageData = dragonFruitStages.find(stage => stage.id === selectedStage);

  return (
    <div className="p-4 pt-8 pb-24">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">🌵 ড্রাগন ফল জীবনচক্র</h2>
        <p className="text-muted-foreground">পর্যায় নির্বাচন করে বিস্তারিত জানুন</p>
      </div>

      {/* Stage Selection */}
      <div className="space-y-3 mb-6">
        {dragonFruitStages.map((stage, index) => (
          <FarmerButton
            key={stage.id}
            variant={selectedStage === stage.id ? 'earth' : 'secondary'}
            size="lg"
            onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
            className="w-full justify-start"
            icon={stage.icon}
          >
            <div className="text-left">
              <div className="font-semibold">{index + 1}. {t(stage.nameKey)}</div>
              <div className="text-sm opacity-80">{stage.duration}</div>
            </div>
          </FarmerButton>
        ))}
      </div>

      {/* Stage Details */}
      {selectedStageData && (
        <div className="farmer-card p-6 gradient-field">
          <div className="text-center mb-6">
            <span className="text-6xl block mb-2">{selectedStageData.icon}</span>
            <h3 className="text-xl font-bold text-primary">{t(selectedStageData.nameKey)}</h3>
            <p className="text-muted-foreground">{t(selectedStageData.descKey)}</p>
            <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm mt-2">
              সময়কাল: {selectedStageData.duration}
            </span>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-primary flex items-center gap-2">
              <Sprout size={20} />
              এই পর্যায়ের পরামর্শ
            </h4>
            <ul className="space-y-2">
              {selectedStageData.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-success">•</span>
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* General Guidance */}
      <div className="mt-6 space-y-4">
        <div className="farmer-card p-4">
          <h4 className="font-semibold text-primary flex items-center gap-2 mb-2">
            <Droplets className="text-blue-500" size={20} />
            {t('soilType')}
          </h4>
          <p className="text-sm text-muted-foreground">{t('soilInfo')}</p>
        </div>

        <div className="farmer-card p-4">
          <h4 className="font-semibold text-primary flex items-center gap-2 mb-2">
            <Beaker className="text-warning" size={20} />
            সার ও কীটনাশক
          </h4>
          <p className="text-sm text-muted-foreground mb-2">{t('fertilizerInfo')}</p>
          <div className="farmer-card p-3 bg-warning/10 border-warning/20">
            <p className="text-sm text-warning-foreground flex items-start gap-2">
              <AlertTriangle size={16} className="text-warning mt-0.5" />
              {t('pesticideWarning')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};