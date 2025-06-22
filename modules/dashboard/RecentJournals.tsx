import RecentJournal from '@/components/dashboard/RecentJournal'
import React from 'react'

function RecentJournals() {
    return (
        <>
        <RecentJournal date="2025-06-20" content="Today I practiced mindfulness and felt more centered..." tags={["mindfulness", "growth"]} />
        <RecentJournal date="2025-06-19" content="Reflected on my progress and wrote about..." tags={["reflection", "journal"]} />
        
        </>
    )
}

export default RecentJournals