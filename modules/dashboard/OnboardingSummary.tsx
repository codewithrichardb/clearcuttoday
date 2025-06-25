import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FaHeartbeat, FaBullseye } from 'react-icons/fa';

interface UserJourney {
  track: string;
  intentions: string[];
  createdAt: string;
  updatedAt: string;
}

export default function OnboardingSummary() {
  const { currentUser } = useAuth();
  const [journey, setJourney] = useState<UserJourney | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        if (!currentUser) return;
        
        const token = await currentUser.getIdToken();
        const response = await fetch('/api/user/journey', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch journey data');
        }

        const data = await response.json();
        setJourney(data);
      } catch (err) {
        console.error('Error fetching journey:', err);
        setError('Failed to load your journey information');
      } finally {
        setLoading(false);
      }
    };

    fetchJourney();
  }, [currentUser]);

  // Format track ID to display text
  const formatTrack = (trackId: string) => {
    const trackMap: Record<string, string> = {
      'breakup': 'Breakup or divorce',
      'job-loss': 'Job loss or workplace toxicity',
      'family-trauma': 'Family trauma or abandonment',
      'betrayal': 'Betrayal by friends or partners',
      'burnout': 'Burnout or chronic emotional exhaustion',
      'identity-crisis': 'Identity crisis or existential stuckness'
    };
    return trackMap[trackId] || trackId;
  };

  // Format intention IDs to display text
  const formatIntention = (intentionId: string) => {
    const intentionMap: Record<string, string> = {
      'emotional-stability': 'More emotionally stable',
      'clarity': 'Better clarity on what happened',
      'self-worth': 'More self-worth and peace',
      'reduce-obsessive-thoughts': 'Less obsessive thought loops',
      'move-forward': 'Ready to move forward'
    };
    return intentionMap[intentionId] || intentionId;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-3">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-warning">{error}</div>;
  }

  if (!journey) {
    return null; // Don't show anything if no journey data
  }

  return (
    <div className="card rounded-3 mb-3">
      <div className="card-body">
        <h5 className="card-title d-flex align-items-center">
          <FaHeartbeat className="text-primary me-2" />
          Your Healing Journey
        </h5>
        
        <div className="mb-3">
          <h6 className="text-muted mb-2">Focus Area</h6>
          <div className="p-3 bg-light rounded-3">
            <FaBullseye className="text-primary me-2" />
            {formatTrack(journey.track)}
          </div>
        </div>
        
        <div>
          <h6 className="text-muted mb-2">Your Goals</h6>
          <div className="d-flex flex-wrap gap-2">
            {journey.intentions.map((intention, index) => (
              <span key={index} className="badge bg-primary bg-opacity-10 text-primary p-2">
                {formatIntention(intention)}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-3 small text-muted">
          Started on {new Date(journey.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
