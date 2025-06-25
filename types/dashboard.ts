export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  streak: number;
  mood: number | null;
  recentJournals: JournalEntry[];
}

export interface UserJourney {
  track: string;
  intentions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  type: 'journal' | 'checkin' | 'activity';
  title: string;
  description: string;
  dueDate?: string;
  completed?: boolean;
}

export interface DashboardData {
  journey: UserJourney | null;
  stats: DashboardStats;
  nextActivity?: Activity;
}
