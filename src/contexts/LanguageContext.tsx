import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'bn' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  bn: {
    appName: 'কৃষক সাথী',
    welcome: 'স্বাগতম',
    selectCrop: 'ফসল নির্বাচন করুন',
    dragonFruit: 'ড্রাগন ফল',
    rice: 'ধান',
    jute: 'পাট',
    vegetables: 'সবজি',
    lifecycle: 'জীবনচক্র',
    observations: 'পর্যবেক্ষণ',
    reminders: 'স্মরণীয়',
    settings: 'সেটিংস',
    home: 'হোম',
    camera: 'ক্যামেরা',
    notes: 'নোট',
    addNote: 'নোট যোগ করুন',
    stage: 'পর্যায়',
    save: 'সেভ করুন',
    cancel: 'বাতিল',
    back: 'পিছনে',
    next: 'পরবর্তী',
    
    // Dragon Fruit Lifecycle
    propagation: 'বংশবৃদ্ধি',
    vegetativeGrowth: 'উদ্ভিদীয় বৃদ্ধি',
    flowering: 'ফুল ফোটা',
    fruiting: 'ফল ধরা',
    harvesting: 'ফসল কাটা',
    
    // Guidance
    soilType: 'মাটির ধরণ',
    soilInfo: 'বেলে দোআঁশ, সুনিষ্কাশিত, pH ৫.৫-৭.০',
    seedInfo: 'কাটিং (৩০-৫০ সেমি, রোগমুক্ত)',
    fertilizerInfo: 'জৈব সার + এনপিকে বৃদ্ধির সময়',
    irrigationInfo: 'হালকা, ঘন ঘন, জলাবদ্ধতা এড়ান',
    pesticideWarning: 'সতর্কতা: সবসময় লেবেল অনুযায়ী কীটনাশক ব্যবহার করুন। গ্লাভস/মাস্ক ব্যবহার করুন।',
    
    // Privacy
    privacyNote: 'অ্যাপে ছবি ও তথ্য শুধু আপনার ফোনে সেভ হবে। ভবিষ্যতে চাইলে শেয়ার করতে পারবেন।',
    
    // Stages detailed
    propagationDesc: 'রোগমুক্ত কাটিং নির্বাচন ও রোপণ',
    vegetativeDesc: 'গাছের বৃদ্ধি ও পাতা গজানো',
    floweringDesc: 'ফুল ফোটা ও পরাগায়ন',
    fruitingDesc: 'ফল গঠন ও বিকাশ',
    harvestingDesc: 'পাকা ফল সংগ্রহ',
  },
  en: {
    appName: 'Farmer\'s Friend',
    welcome: 'Welcome',
    selectCrop: 'Select Crop',
    dragonFruit: 'Dragon Fruit',
    rice: 'Rice',
    jute: 'Jute',
    vegetables: 'Vegetables',
    lifecycle: 'Lifecycle',
    observations: 'Observations',
    reminders: 'Reminders',
    settings: 'Settings',
    home: 'Home',
    camera: 'Camera',
    notes: 'Notes',
    addNote: 'Add Note',
    stage: 'Stage',
    save: 'Save',
    cancel: 'Cancel',
    back: 'Back',
    next: 'Next',
    
    // Dragon Fruit Lifecycle
    propagation: 'Propagation',
    vegetativeGrowth: 'Vegetative Growth',
    flowering: 'Flowering',
    fruiting: 'Fruiting',
    harvesting: 'Harvesting',
    
    // Guidance
    soilType: 'Soil Type',
    soilInfo: 'Sandy loam, well-drained, pH 5.5-7.0',
    seedInfo: 'Cuttings (30-50 cm, disease-free)',
    fertilizerInfo: 'Organic compost + NPK during growth',
    irrigationInfo: 'Light, frequent, avoid waterlogging',
    pesticideWarning: 'Warning: Always use pesticides according to label instructions. Use gloves/mask.',
    
    // Privacy
    privacyNote: 'Photos and data are stored only on your phone. You can share them in the future if you want.',
    
    // Stages detailed
    propagationDesc: 'Select disease-free cuttings and plant',
    vegetativeDesc: 'Plant growth and leaf development',
    floweringDesc: 'Flowering and pollination',
    fruitingDesc: 'Fruit formation and development',
    harvestingDesc: 'Harvest ripe fruits',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('bn'); // Default to Bangla

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['bn']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};