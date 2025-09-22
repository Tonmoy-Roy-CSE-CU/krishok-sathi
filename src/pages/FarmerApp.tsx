import React, { useState, useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { HomePage } from './HomePage';
import { CropSelectionPage } from './CropSelectionPage';
import { LifecyclePage } from './LifecyclePage';
import { ObservationsPage } from './ObservationsPage';
import { RemindersPage } from './RemindersPage';
import { SettingsPage } from './SettingsPage';
import { NavigationBar } from '@/components/NavigationBar';

export type CropType = 'dragonFruit' | 'rice' | 'jute' | 'vegetables';

interface FarmerAppState {
  selectedCrop: CropType | null;
  activeTab: string;
  observations: any[];
  reminders: any[];
}

const FarmerApp: React.FC = () => {
  const [state, setState] = useState<FarmerAppState>(() => {
    // Load from localStorage
    const saved = localStorage.getItem('farmerAppState');
    return saved ? JSON.parse(saved) : {
      selectedCrop: null,
      activeTab: 'home',
      observations: [],
      reminders: [],
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('farmerAppState', JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<FarmerAppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const renderPage = () => {
    if (!state.selectedCrop && state.activeTab !== 'settings') {
      return <CropSelectionPage onCropSelect={(crop) => updateState({ selectedCrop: crop, activeTab: 'home' })} />;
    }

    switch (state.activeTab) {
      case 'home':
        return <HomePage selectedCrop={state.selectedCrop} />;
      case 'lifecycle':
        return <LifecyclePage selectedCrop={state.selectedCrop} />;
      case 'observations':
        return <ObservationsPage 
          selectedCrop={state.selectedCrop} 
          observations={state.observations}
          onUpdateObservations={(observations) => updateState({ observations })}
        />;
      case 'reminders':
        return <RemindersPage 
          selectedCrop={state.selectedCrop}
          reminders={state.reminders}
          onUpdateReminders={(reminders) => updateState({ reminders })}
        />;
      case 'settings':
        return <SettingsPage onCropChange={() => updateState({ selectedCrop: null, activeTab: 'home' })} />;
      default:
        return <HomePage selectedCrop={state.selectedCrop} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen gradient-field pb-20">
        {renderPage()}
        <NavigationBar 
          activeTab={state.activeTab} 
          onTabChange={(tab) => updateState({ activeTab: tab })} 
        />
      </div>
    </LanguageProvider>
  );
};

export default FarmerApp;