import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FarmerButton } from '@/components/FarmerButton';
import { CropType } from './FarmerApp';
import { Camera, FileText, Calendar, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface Observation {
  id: string;
  crop: CropType;
  stage: string;
  notes: string;
  date: string;
  photoPath?: string;
}

interface ObservationsPageProps {
  selectedCrop: CropType | null;
  observations: Observation[];
  onUpdateObservations: (observations: Observation[]) => void;
}

export const ObservationsPage: React.FC<ObservationsPageProps> = ({
  selectedCrop,
  observations,
  onUpdateObservations,
}) => {
  const { t } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newObservation, setNewObservation] = useState({
    stage: '',
    notes: '',
  });

  const stages = [
    'propagation',
    'vegetativeGrowth', 
    'flowering',
    'fruiting',
    'harvesting'
  ];

  const handleAddObservation = () => {
    if (!selectedCrop || !newObservation.stage) return;

    const observation: Observation = {
      id: Date.now().toString(),
      crop: selectedCrop,
      stage: newObservation.stage,
      notes: newObservation.notes,
      date: new Date().toISOString(),
    };

    onUpdateObservations([observation, ...observations]);
    setNewObservation({ stage: '', notes: '' });
    setShowAddForm(false);
  };

  const handleDeleteObservation = (id: string) => {
    onUpdateObservations(observations.filter(obs => obs.id !== id));
  };

  const filteredObservations = selectedCrop
    ? observations.filter(obs => obs.crop === selectedCrop)
    : observations;

  if (!selectedCrop) {
    return (
      <div className="p-4 pt-8 text-center">
        <p className="text-lg text-muted-foreground">প্রথমে একটি ফসল নির্বাচন করুন</p>
      </div>
    );
  }

  return (
    <div className="p-4 pt-8 pb-24">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">{t('observations')}</h2>
        <p className="text-muted-foreground">আপনার ফসলের পর্যবেক্ষণ রেকর্ড করুন</p>
      </div>

      {/* Add Observation Button */}
      <FarmerButton
        variant="earth"
        size="lg"
        onClick={() => setShowAddForm(true)}
        className="w-full mb-6"
        icon={<Camera size={24} />}
      >
        নতুন পর্যবেক্ষণ যোগ করুন
      </FarmerButton>

      {/* Add Form */}
      {showAddForm && (
        <div className="farmer-card p-6 mb-6 gradient-field">
          <h3 className="text-lg font-semibold text-primary mb-4">নতুন পর্যবেক্ষণ</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                পর্যায় নির্বাচন করুন
              </label>
              <div className="grid grid-cols-2 gap-2">
                {stages.map((stage) => (
                  <FarmerButton
                    key={stage}
                    variant={newObservation.stage === stage ? 'earth' : 'secondary'}
                    onClick={() => setNewObservation({ ...newObservation, stage })}
                    className="text-sm py-2"
                  >
                    {t(stage)}
                  </FarmerButton>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                নোট (ঐচ্ছিক)
              </label>
              <textarea
                value={newObservation.notes}
                onChange={(e) => setNewObservation({ ...newObservation, notes: e.target.value })}
                placeholder="আপনার পর্যবেক্ষণ লিখুন..."
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground min-h-[80px]"
              />
            </div>

            <div className="flex gap-2">
              <FarmerButton
                variant="earth"
                onClick={handleAddObservation}
                disabled={!newObservation.stage}
                className="flex-1"
              >
                {t('save')}
              </FarmerButton>
              <FarmerButton
                variant="secondary"
                onClick={() => setShowAddForm(false)}
                className="flex-1"
              >
                {t('cancel')}
              </FarmerButton>
            </div>
          </div>
        </div>
      )}

      {/* Observations List */}
      <div className="space-y-4">
        {filteredObservations.length === 0 ? (
          <div className="farmer-card p-6 text-center">
            <Camera size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">এখনো কোনো পর্যবেক্ষণ নেই</p>
            <p className="text-sm text-muted-foreground mt-2">
              প্রথম পর্যবেক্ষণ যোগ করুন
            </p>
          </div>
        ) : (
          filteredObservations.map((observation) => (
            <div key={observation.id} className="farmer-card p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {observation.stage === 'propagation' ? '🌱' :
                     observation.stage === 'vegetativeGrowth' ? '🌿' :
                     observation.stage === 'flowering' ? '🌸' :
                     observation.stage === 'fruiting' ? '🍓' : '🧺'}
                  </span>
                  <div>
                    <h4 className="font-semibold text-primary">
                      {t(observation.stage)}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      {format(new Date(observation.date), 'dd MMM yyyy, HH:mm')}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteObservation(observation.id)}
                  className="text-destructive hover:text-destructive/80 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {observation.notes && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <FileText size={16} className="text-muted-foreground mt-0.5" />
                    <p className="text-sm">{observation.notes}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};