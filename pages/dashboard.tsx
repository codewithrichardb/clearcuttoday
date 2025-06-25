import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '@/lib/api';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaSpa, FaHeartbeat, FaBullseye, FaBook, FaClipboardCheck } from 'react-icons/fa';
import { format } from 'date-fns';
import { DashboardData } from '@/types/dashboard';
import dynamic from 'next/dynamic';

// Get mood description based on value
const getMoodDescription = (mood: number): string => {
  if (mood < 2) return 'Very Bad';
  if (mood < 3) return 'Bad';
  if (mood === 3) return 'Neutral';
  if (mood < 5) return 'Good';
  return 'Very Good';
};

// Dynamically import Mood component with no SSR
const Mood = dynamic(() => import('@/modules/dashboard/Mood'), { 
  ssr: false,
  loading: () => <div className="d-flex justify-content-center"><div className="spinner-border spinner-border-sm" role="status"></div></div>
});

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

function Dashboard() {
  const { currentUser, loading } = useAuth();
  const [currentDate, setCurrentDate] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Initialize API client
  const { get } = useApi();

  // Fetch dashboard data
  const fetchDashboardData = async (): Promise<DashboardData> => {
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    
    try {
      const response = await get<DashboardData>('/dashboard');
      // Extract the data from the response
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  };
  
  const { data: dashboardData, isLoading, error, refetch } = useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
    enabled: !!currentUser,
    refetchOnWindowFocus: false,
  });

  const handleMoodRecorded = () => {
    // Refetch dashboard data to update the mood display
    refetch();
  };

  useEffect(() => {
    setIsClient(true);
    setCurrentDate(format(new Date(), 'EEEE, MMMM d, yyyy'));
  }, []);

  if (loading || !isClient) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout title="Dashboard">
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <div>
            <h5 className='mb-1'>
              Welcome back, {currentUser?.displayName || 'User'}
            </h5>
            <p className='small text-muted'>{currentDate}</p>
          </div>
          <div>
            <Link href="/journals/new" className='btn btn-primary d-flex align-items-center text-white'>
              <FaPlus size={14} className='me-1' /> New journal entry
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger">
            Error loading dashboard data: {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        ) : dashboardData ? (
          <div className="row">
            {/* Left Column */}
            <div className="col-lg-4 mb-3">
              {dashboardData.journey && (
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
                        {formatTrack(dashboardData.journey.track)}
                      </div>
                    </div>
                    
                    <div>
                      <h6 className="text-muted mb-2">Your Goals</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {dashboardData.journey.intentions.map((intention, index) => (
                          <span key={index} className="badge bg-primary bg-opacity-10 text-primary p-2">
                            {formatIntention(intention)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Next Activity Card - Only show if there are activities */}
              <div className="card rounded-3 mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Next Activity</h6>
                  </div>
                  {dashboardData.nextActivity ? (
                    <div className='d-flex justify-content-start align-items-top'>
                      <div className='benefits-card-icons rounded-4 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center fw-bold h3 me-3 text-success'>
                        {dashboardData.nextActivity.type === 'journal' && <FaBook className='text-primary' />}
                        {dashboardData.nextActivity.type === 'checkin' && <FaClipboardCheck className='text-primary' />}
                        {dashboardData.nextActivity.type === 'activity' && <FaSpa className='text-primary' />}
                      </div>
                      <div>
                        <h6 className='mb-1'>{dashboardData.nextActivity.title}</h6>
                        <p className='small text-muted mb-1'>{dashboardData.nextActivity.description}</p>
                        {dashboardData.nextActivity.dueDate && (
                          <span className='badge bg-light text-dark small'>
                            {new Date(dashboardData.nextActivity.dueDate).toLocaleString(undefined, {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className='text-center py-3'>
                      <div className="d-flex flex-column align-items-center">
                        <p className='text-muted mb-3'>You don&apos;t have any upcoming activities</p>
                        <Link href="/activities" className='btn btn-sm btn-outline-primary w-75'>
                          <FaPlus className="me-2" /> Add Activity
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-lg-8">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="card rounded-3 dashboard-card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Today&apos;s mood</h6>
                        {dashboardData.stats.mood !== null && (
                          <span className="badge bg-success bg-opacity-10 text-success">
                            Recorded
                          </span>
                        )}
                      </div>
                      <div className='d-flex flex-column align-items-center'>
                        <Mood 
                          initialMood={dashboardData.stats.mood}
                          onMoodRecorded={handleMoodRecorded}
                        />
                        {dashboardData.stats.mood !== null && (
                          <div className="mt-2 text-muted small">
                            {dashboardData.stats.mood}/5 - {getMoodDescription(dashboardData.stats.mood)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="card rounded-3 dashboard-card h-100">
                    <div className="card-body">
                      <h6 className='mb-3 mt-2'>Streak</h6>
                      <div className='d-flex justify-content-start align-items-top'>
                        <div className='benefits-card-icons rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center fw-bold h3 me-3 text-success'>
                          {dashboardData.stats.streak || 0}
                        </div>
                        <div>
                          <p>Days of consistent journaling <br /> keep it up</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <div className="card rounded-3">
                  <div className="card-body">
                    <h6 className='mb-3 mt-2'>Recent journal entries</h6>
                    {dashboardData.stats.recentJournals.length > 0 ? (
                      <div className="list-group">
                        {dashboardData.stats.recentJournals.map(journal => (
                          <div key={journal.id} className="list-group-item border-0 border-bottom">
                            <h6 className="mb-1">{journal.title}</h6>
                            <p className="mb-1 text-muted">
                              {journal.content.substring(0, 100)}{journal.content.length > 100 ? '...' : ''}
                            </p>
                            <small className="text-muted">
                              {new Date(journal.createdAt).toLocaleDateString()}
                            </small>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted">No recent journal entries</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </DashboardLayout>
    </ProtectedRoute>
  );
}

export default Dashboard;