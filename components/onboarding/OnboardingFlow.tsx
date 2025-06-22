import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa';
import { useRouter } from 'next/router';

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

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [selectedIntentions, setSelectedIntentions] = useState<Intention[]>([]);
  const router = useRouter();

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track);
  };

  const toggleIntention = (intention: Intention) => {
    setSelectedIntentions(prev => 
      prev.includes(intention)
        ? prev.filter(i => i !== intention)
        : [...prev, intention]
    );
  };

  const handleSubmit = async () => {
    // TODO: Save to database
    router.push('/dashboard');
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {/* Progress Bar */}
          <div className="progress mb-4" style={{ height: '8px' }}>
            <div 
              className="progress-bar bg-primary" 
              role="progressbar" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <WelcomeStep onNext={nextStep} />
              )}
              
              {step === 2 && (
                <TrackSelection 
                  selectedTrack={selectedTrack}
                  onSelect={handleTrackSelect}
                />
              )}
              
              {step === 3 && (
                <IntentionSelection
                  selectedIntentions={selectedIntentions}
                  onToggle={toggleIntention}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between mt-4">
            {step > 1 ? (
              <button 
                onClick={prevStep}
                className="btn btn-outline-primary"
              >
                <FaArrowLeft className="me-2" /> Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button 
                onClick={nextStep}
                className="btn btn-primary"
                disabled={step === 2 && !selectedTrack}
              >
                Continue <FaArrowRight className="ms-2" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                className="btn btn-primary"
                disabled={selectedIntentions.length === 0}
              >
                Start Your Journey <FaCheck className="ms-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center">
      <h2 className="mb-4">Welcome to ClearCut</h2>
      <p className="lead mb-4">
        Clarity for the emotionally overwhelmed. Whether {`it's`} heartbreak, burnout, or betrayal - {`we're`} here to help you reset.
      </p>
      <p className="text-muted mb-4">
        {`You're`} not broken. {`You're`} just overwhelmed. {`Let's`} start your clarity journey.
      </p>
      <button 
        onClick={onNext}
        className="btn btn-primary btn-lg px-5"
      >
        Begin
      </button>
    </div>
  );
}

function TrackSelection({ 
  selectedTrack, 
  onSelect 
}: { 
  selectedTrack: Track | null, 
  onSelect: (track: Track) => void 
}) {
  return (
    <div>
      <h3 className="mb-4 text-center">What are you healing from?</h3>
      <div className="row g-3">
        {trackOptions.map(({ id, emoji, label }) => (
          <div key={id} className="col-md-6">
            <button
              className={`btn w-100 p-3 text-start border rounded-3 d-flex align-items-center ${
                selectedTrack === id 
                  ? 'border-primary border-2 bg-primary bg-opacity-10' 
                  : 'border-light-subtle'
              }`}
              onClick={() => onSelect(id as Track)}
            >
              <span className="fs-3 me-3">{emoji}</span>
              <span>{label}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntentionSelection({ 
  selectedIntentions, 
  onToggle 
}: { 
  selectedIntentions: string[], 
  onToggle: (intention: Intention) => void 
}) {
  return (
    <div>
      <h3 className="mb-4 text-center">What would you like to feel by the end of your 7 days?</h3>
      <div className="d-grid gap-2">
        {intentionOptions.map(({ id, label }) => (
          <div 
            key={id}
            className={`p-3 border rounded-3 cursor-pointer ${
              selectedIntentions.includes(id) 
                ? 'border-primary border-2 bg-primary bg-opacity-10' 
                : 'border-light-subtle'
            }`}
            onClick={() => onToggle(id as Intention)}
          >
            <div className="form-check mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedIntentions.includes(id)}
                onChange={() => {}}
              />
              <label className="form-check-label ms-2">
                {label}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
