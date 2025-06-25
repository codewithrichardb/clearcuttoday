import { ObjectId } from 'mongodb';

export interface JournalEntry {
  _id?: ObjectId;
  userId: string;
  title?: string;
  content: string;
  mood?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface JournalFormData {
  title: string;
  content: string;
  mood: number | null;
}

export interface JournalListResponse {
  data: JournalEntry[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
  };
}
