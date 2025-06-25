import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';

// API function to save onboarding data
const saveOnboardingData = async ({ 
  track, 
  intentions, 
  token 
}: { 
  track: string; 
  intentions: string[]; 
  token: string 
}) => {
  const response = await fetch('/api/onboarding', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ track, intentions })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to save onboarding data');
  }

  return response.json();
};

type Track = 'breakup' | 'job-loss' | 'family-trauma' | 'betrayal' | 'burnout' | 'identity-crisis';
type Intention = 'emotional-stability' | 'clarity' | 'self-worth' | 'reduce-obsessive-thoughts' | 'move-forward';

const trackOptions = [
  { id: 'breakup', emoji: '💔', label: 'Breakup or divorce' },
  { id: 'job-loss', emoji: '💼', label: 'Job loss or workplace toxicity' },
  { id: 'family-trauma', emoji: '🧬', label: 'Family trauma or abandonment' },
  { id: 'betrayal', emoji: '🥀', label: 'Betrayal by friends or partners' },
  { id: 'burnout', emoji: '🔥', label: 'Burnout or chronic emotional exhaustion' },
  { id: 'identity-crisis', emoji: '🕳️', label: 'Identity crisis or existential stuckness' },
];

const intentionOptions = [
  { id: 'emotional-stability', label: 'More emotionally stable' },
  { id: 'clarity', label: 'Better clarity on what happened' },
  { id: 'self-worth', label: 'More self-worth and peace' },
  { id: 'reduce-obsessive-thoughts', label: 'Less obsessive thought loops' },
  { id: 'move-forward', label: 'Ready to move forward' },
];

const WelcomeStep = ({ onNext }: { onNext: () => void }) => (
  <div className="text-center">
    <h1 className="display-6 fw-bold mb-4">Welcome to ClearCut</h1>
    <p className="lead mb-5">
      {`Let's`} get to know you better so we can personalize your healing journey.
    </p>
    <button 
      onClick={onNext}
      className="btn btn-primary text-white px-4 py-2"
    >
      Get Started <FaArrowRight className="ms-2" />
    </button>
  </div>
);

const TrackSelection = ({ 
  selectedTrack, 
  onSelect 
}: { 
  selectedTrack: Track | null; 
  onSelect: (track: Track) => void;
}) => (
  <div>
    <h2 className="h3 mb-4">What brings you here today?</h2>
    <div className="row g-3">
      {trackOptions.map((track) => (
        <div key={track.id} className="col-12 col-md-6">
          <button
            onClick={() => onSelect(track.id as Track)}
            className={`w-100 p-3 rounded-3 border-2 text-start transition-colors ${
              selectedTrack === track.id
                ? 'border-primary bg-primary bg-opacity-10 text-white'
                : 'border-light-subtle hover-border-primary'
            }`}
          >
            <span className="fs-3 me-2">{track.emoji}</span>
            <span className="fw-medium">{track.label}</span>
          </button>
        </div>
      ))}
    </div>
  </div>
);

const IntentionSelection = ({ 
  selectedIntentions, 
  onToggle 
}: { 
  selectedIntentions: string[]; 
  onToggle: (intention: Intention) => void;
}) => (
  <div>
    <h2 className="h3 mb-3">What would you like to achieve?</h2>
    <p className="text-muted mb-4">Select all that apply</p>
    <div className="d-grid gap-3">
      {intentionOptions.map((intention) => (
        <div
          key={intention.id}
          onClick={() => onToggle(intention.id as Intention)}
          className={`p-3 rounded-3 border-2 cursor-pointer transition-colors ${
            selectedIntentions.includes(intention.id)
              ? 'border-primary bg-primary bg-opacity-10'
              : 'border-light-subtle hover-border-primary'
          }`}
        >
          <div className="d-flex align-items-center">
            <div className={`flex-shrink-0 me-3 d-flex align-items-center justify-content-center rounded-1 border-2 ${
              selectedIntentions.includes(intention.id)
                ? 'bg-primary border-primary text-white'
                : 'border-secondary'
            }`} 
            style={{ width: '20px', height: '20px' }}>
              {selectedIntentions.includes(intention.id) && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span>{intention.label}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [selectedIntentions, setSelectedIntentions] = useState<Intention[]>([]);
  const router = useRouter();
  const { currentUser } = useAuth();
  
  // React Query mutation for saving onboarding data
  const { mutate: saveOnboarding, isPending, error } = useMutation<
    unknown, 
    Error, 
    { track: Track, intentions: Intention[] }
  >({
    mutationFn: async ({ track, intentions }) => {
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      const token = await currentUser.getIdToken();
      return saveOnboardingData({ track, intentions, token });
    },
    onSuccess: () => {
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      console.error('Error saving onboarding data:', error);
    }
  });

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track);
  };

  const handleIntentionToggle = (intention: Intention) => {
    setSelectedIntentions(prev =>
      prev.includes(intention)
        ? prev.filter(i => i !== intention)
        : [...prev, intention]
    );
  };

  const handleSubmit = () => {
    if (!selectedTrack || selectedIntentions.length === 0) {
      alert('Please select both a track and at least one intention');
      return;
    }

    saveOnboarding({
      track: selectedTrack,
      intentions: selectedIntentions
    });
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-96"
        >
          {step === 1 && <WelcomeStep onNext={nextStep} />}
          {step === 2 && (
            <TrackSelection 
              selectedTrack={selectedTrack} 
              onSelect={handleTrackSelect} 
            />
          )}
          {step === 3 && (
            <IntentionSelection 
              selectedIntentions={selectedIntentions}
              onToggle={handleIntentionToggle}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="d-flex justify-content-between mt-5">
        {step > 1 ? (
          <button 
            onClick={prevStep}
            className="btn btn-outline-secondary px-4 py-2"
          >
            <FaArrowLeft className="me-2" /> Back
          </button>
        ) : (
          <div />
        )}
        
        {step < 3 ? (
          <button 
            onClick={nextStep}
            className="btn btn-primary px-4 py-2 text-white"
            disabled={step === 2 && !selectedTrack}
          >
            Continue <FaArrowRight className="ms-2" />
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            className="btn btn-primary px-4 py-2 text-white"
            disabled={!selectedTrack || selectedIntentions.length === 0 || isPending}
          >
            {isPending ? (
              <>
                <FaSpinner className="fa-spin me-2" />
                Saving...
              </>
            ) : (
              'Start Your Journey'
            )}
          </button>
        )}
      </div>
      
      {error && (
        <div className="alert alert-danger mt-4">
          {error.message}
        </div>
      )}
    </div>
  );
}
