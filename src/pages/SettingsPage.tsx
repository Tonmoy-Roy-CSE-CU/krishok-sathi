import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FarmerButton } from '@/components/FarmerButton';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Settings, Languages, Smartphone, Info, RotateCcw } from 'lucide-react';

interface SettingsPageProps {
  onCropChange: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onCropChange }) => {
  const { t } = useLanguage();

  const handleExportData = () => {
    const data = {
      farmerAppState: localStorage.getItem('farmerAppState'),
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `farmer-app-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    if (confirm('সব ডাটা মুছে ফেলতে চান? এই কাজ আর বাতিল করা যাবে না।')) {
      localStorage.removeItem('farmerAppState');
      window.location.reload();
    }
  };

  return (
    <div className="p-4 pt-8 pb-24">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">{t('settings')}</h2>
        <p className="text-muted-foreground">অ্যাপের সেটিংস ও তথ্য</p>
      </div>

      <div className="space-y-6">
        {/* Language Settings */}
        <div className="farmer-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Languages className="text-primary" size={24} />
            <h3 className="text-lg font-semibold text-primary">ভাষা নির্বাচন</h3>
          </div>
          <LanguageToggle />
        </div>

        {/* Crop Management */}
        <div className="farmer-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <RotateCcw className="text-primary" size={24} />
            <h3 className="text-lg font-semibold text-primary">ফসল পরিবর্তন</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            নতুন ফসল নির্বাচন করতে চান?
          </p>
          <FarmerButton
            variant="secondary"
            onClick={onCropChange}
            className="w-full"
          >
            ফসল পরিবর্তন করুন
          </FarmerButton>
        </div>

        {/* Data Management */}
        <div className="farmer-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="text-primary" size={24} />
            <h3 className="text-lg font-semibold text-primary">ডাটা ব্যবস্থাপনা</h3>
          </div>
          <div className="space-y-3">
            <FarmerButton
              variant="secondary"
              onClick={handleExportData}
              className="w-full"
            >
              ডাটা এক্সপোর্ট করুন
            </FarmerButton>
            <FarmerButton
              variant="secondary"
              onClick={handleClearData}
              className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              সব ডাটা মুছে ফেলুন
            </FarmerButton>
          </div>
        </div>

        {/* About */}
        <div className="farmer-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Info className="text-primary" size={24} />
            <h3 className="text-lg font-semibold text-primary">অ্যাপ সম্পর্কে</h3>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div>
              <strong className="text-foreground">কৃষক সাথী</strong>
              <p>সংস্করণ: ১.০.০</p>
            </div>
            <div>
              <p><strong className="text-foreground">উদ্দেশ্য:</strong> কৃষকদের আধুনিক চাষাবাদে সহায়তা</p>
            </div>
            <div>
              <p><strong className="text-foreground">বৈশিষ্ট্য:</strong></p>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• বিশেষজ্ঞ পরামর্শ</li>
                <li>• পর্যায়ভিত্তিক গাইড</li>
                <li>• অফলাইন ব্যবহার</li>
                <li>• ছবি সহ পর্যবেক্ষণ</li>
                <li>• স্মরণীয় সিস্টেম</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="farmer-card p-4 bg-muted/50">
          <p className="text-sm text-center text-muted-foreground">
            {t('privacyNote')}
          </p>
        </div>
      </div>
    </div>
  );
};