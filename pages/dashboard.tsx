import DashboardLayout from '@/components/DashboardLayout';
import Mood from '@/modules/dashboard/Mood';
import RecentJournals from '@/modules/dashboard/RecentJournals';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaSpa } from 'react-icons/fa';
import { format } from 'date-fns';

function Dashboard() {
    const { currentUser } = useAuth();
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        setCurrentDate(format(new Date(), 'EEEE, MMMM d, yyyy'));
    }, []);

    return (
        <ProtectedRoute>
            <DashboardLayout title="Dashboard">
                <div className='d-flex justify-content-between align-items-center'>
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
                <div className='my-3'>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card rounded-3 dashboard-card">
                                <div className="card-body">
                                    <h6>{`Today's`} mood</h6>
                                    <div className='d-flex justify-content-between align-items-center mt-3'>
                                        <Mood />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card rounded-3 dashboard-card">
                                <div className="card-body">
                                    <h6 className='mb-3 mt-2'>Streak</h6>
                                    <div className='d-flex justify-content-start align-items-top'>
                                        <div className='benefits-card-icons rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center fw-bold h3 me-3 text-success'>
                                            7
                                        </div>
                                        <div>
                                            <p>Days of consistent journaling <br /> keep it up</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card rounded-3 dashboard-card">
                                <div className="card-body">
                                    <h6 className='mb-3 mt-2'>Next activity</h6>
                                    <div className='d-flex justify-content-start align-items-top'>
                                        <div className='benefits-card-icons rounded-4 bg-primary bg-opacity-10 d-flex align-items-center justify-content-center fw-bold h3 me-3 text-success'>
                                            <FaSpa className='text-primary' />
                                        </div>
                                        <div>
                                            <p className='fw-semibold mb-1'>Group meditation</p>
                                            <p>Today @ 2:00pm</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-2">
                            <div className="card rounded-3">
                                <div className="card-body">
                                    <h6 className='mb-3 mt-2'>Recent journal entries</h6>
                                    <RecentJournals />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    )
}

export default Dashboard