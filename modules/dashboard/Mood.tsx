import React, { useState, useEffect } from 'react';
import { FaFrown, FaHistory, FaMeh, FaSmile, FaCheck } from 'react-icons/fa';
import { useApi } from '@/lib/api';
import { toast } from 'react-toastify';

interface MoodProps {
  onMoodRecorded?: () => void;
  initialMood?: number | null;
}

function Mood({ onMoodRecorded, initialMood }: MoodProps) {
  const [moodToday, setMoodToday] = useState<number | null>(initialMood || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { post } = useApi();

  useEffect(() => {
    if (initialMood !== undefined) {
      setMoodToday(initialMood);
    }
  }, [initialMood]);

  const handleMoodSelect = async (value: number) => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      await post('/mood', { mood: value });
      setMoodToday(value);
      toast.success('Mood recorded successfully!');
      if (onMoodRecorded) onMoodRecorded();
    } catch (error) {
      console.error('Error recording mood:', error);
      toast.error('Failed to record mood. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="d-flex align-items-center">
      <div className="d-flex align-items-center me-3">
        {[1, 2, 3, 4, 5].map((value) => {
          const isSelected = moodToday === value;
          return (
            <button
              key={value}
              onClick={() => handleMoodSelect(value)}
              disabled={isSubmitting}
              className={`rounded-circle btn border-0 p-2 ${isSelected 
                ? 'text-success' 
                : 'text-muted'} ${isSubmitting ? 'opacity-50' : ''}`}
              title={`${value} - ${value < 3 ? 'Bad' : value === 3 ? 'Neutral' : 'Good'}`}
            >
              {value < 3 ? (
                <FaFrown size={20} />
              ) : value === 3 ? (
                <FaMeh size={20} />
              ) : (
                <FaSmile size={20} />
              )}
            </button>
          );
        })}
      </div>
      {moodToday !== null && (
        <div className="text-success small d-flex align-items-center">
          <FaCheck className="me-1" /> Recorded
        </div>
      )}
      <FaHistory />
    </div>
  );
}

export default Mood