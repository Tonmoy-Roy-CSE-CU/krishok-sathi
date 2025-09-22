import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FarmerButton } from '@/components/FarmerButton';
import { CropType } from './FarmerApp';
import { Bell, Plus, Trash2, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Reminder {
  id: string;
  crop: CropType;
  title: string;
  description: string;
  datetime: string;
  active: boolean;
}

interface RemindersPageProps {
  selectedCrop: CropType | null;
  reminders: Reminder[];
  onUpdateReminders: (reminders: Reminder[]) => void;
}

export const RemindersPage: React.FC<RemindersPageProps> = ({
  selectedCrop,
  reminders,
  onUpdateReminders,
}) => {
  const { t } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
  });

  const reminderTemplates = [
    { title: 'পানি দিন', description: 'গাছে পানি দেওয়ার সময়', icon: '💧' },
    { title: 'সার প্রয়োগ', description: 'জৈব সার প্রয়োগ করুন', icon: '🌱' },
    { title: 'পরিদর্শণ', description: 'গাছের স্বাস্থ্য পরিদর্শণ', icon: '👁️' },
    { title: 'কীটনাশক', description: 'কীটনাশক স্প্রে করুন', icon: '🧴' },
    { title: 'ফসল কাটা', description: 'ফল তোলার সময়', icon: '🧺' },
  ];

  const handleAddReminder = () => {
    if (!selectedCrop || !newReminder.title || !newReminder.date || !newReminder.time) return;

    const datetime = new Date(`${newReminder.date}T${newReminder.time}`);
    const reminder: Reminder = {
      id: Date.now().toString(),
      crop: selectedCrop,
      title: newReminder.title,
      description: newReminder.description,
      datetime: datetime.toISOString(),
      active: true,
    };

    onUpdateReminders([...reminders, reminder]);
    setNewReminder({ title: '', description: '', date: '', time: '' });
    setShowAddForm(false);
  };

  const handleDeleteReminder = (id: string) => {
    onUpdateReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const handleToggleReminder = (id: string) => {
    onUpdateReminders(
      reminders.map(reminder =>
        reminder.id === id ? { ...reminder, active: !reminder.active } : reminder
      )
    );
  };

  const filteredReminders = selectedCrop
    ? reminders.filter(reminder => reminder.crop === selectedCrop)
    : reminders;

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
        <h2 className="text-2xl font-bold text-primary mb-2">{t('reminders')}</h2>
        <p className="text-muted-foreground">কাজের স্মরণীয় সেট করুন</p>
      </div>

      {/* Add Reminder Button */}
      <FarmerButton
        variant="earth"
        size="lg"
        onClick={() => setShowAddForm(true)}
        className="w-full mb-6"
        icon={<Plus size={24} />}
      >
        নতুন স্মরণীয় যোগ করুন
      </FarmerButton>

      {/* Add Form */}
      {showAddForm && (
        <div className="farmer-card p-6 mb-6 gradient-field">
          <h3 className="text-lg font-semibold text-primary mb-4">নতুন স্মরণীয়</h3>
          
          {/* Quick Templates */}
          <div className="mb-4">
            <p className="text-sm font-medium text-primary mb-2">দ্রুত টেমপ্লেট</p>
            <div className="grid grid-cols-2 gap-2">
              {reminderTemplates.map((template) => (
                <button
                  key={template.title}
                  onClick={() => setNewReminder({
                    ...newReminder,
                    title: template.title,
                    description: template.description
                  })}
                  className="text-left p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>{template.icon}</span>
                    <div>
                      <div className="text-sm font-medium">{template.title}</div>
                      <div className="text-xs text-muted-foreground">{template.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                শিরোনাম
              </label>
              <input
                type="text"
                value={newReminder.title}
                onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                placeholder="স্মরণীয়ের শিরোনাম"
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                বিবরণ (ঐচ্ছিক)
              </label>
              <textarea
                value={newReminder.description}
                onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                placeholder="অতিরিক্ত তথ্য..."
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground min-h-[60px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  তারিখ
                </label>
                <input
                  type="date"
                  value={newReminder.date}
                  onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  সময়
                </label>
                <input
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <FarmerButton
                variant="earth"
                onClick={handleAddReminder}
                disabled={!newReminder.title || !newReminder.date || !newReminder.time}
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

      {/* Reminders List */}
      <div className="space-y-4">
        {filteredReminders.length === 0 ? (
          <div className="farmer-card p-6 text-center">
            <Bell size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">এখনো কোনো স্মরণীয় নেই</p>
            <p className="text-sm text-muted-foreground mt-2">
              প্রথম স্মরণীয় যোগ করুন
            </p>
          </div>
        ) : (
          filteredReminders
            .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
            .map((reminder) => (
              <div key={reminder.id} className={`farmer-card p-4 ${!reminder.active ? 'opacity-60' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      <Bell size={20} className={reminder.active ? 'text-primary' : 'text-muted-foreground'} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary">{reminder.title}</h4>
                      {reminder.description && (
                        <p className="text-sm text-muted-foreground mt-1">{reminder.description}</p>
                      )}
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                        <Clock size={14} />
                        {format(new Date(reminder.datetime), 'dd MMM yyyy, HH:mm')}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleReminder(reminder.id)}
                      className={`p-1 rounded ${reminder.active ? 'text-success' : 'text-muted-foreground'}`}
                    >
                      <Bell size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteReminder(reminder.id)}
                      className="text-destructive hover:text-destructive/80 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};