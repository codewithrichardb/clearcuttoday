import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaBook, FaPlus, FaSearch } from "react-icons/fa";
import { useApi } from "@/lib/api";
import { JournalEntry } from "@/types/journal";
import DashboardLayout from "@/components/DashboardLayout";

export default function JournalList() {
  const router = useRouter();
  const { get } = useApi();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await get<JournalEntry[]>("/api/journals");
        setEntries(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch journal entries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, [get]);

  const filteredEntries = entries.filter(
    (entry: JournalEntry) =>
      (entry.content?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (entry.title?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMoodEmoji = (mood: number | null | undefined): string | null => {
    if (mood === null || mood === undefined) return null;
    const emojis = ["😢", "😞", "😐", "🙂", "😊"];
    return emojis[Math.min(Math.max(0, mood - 1), emojis.length - 1)] || null;
  };

  if (isLoading) {
    return (
      <DashboardLayout title="My Journal">
        <div className="container my-3">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="My Journal">
      <div className="container my-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">
            <FaBook className="me-2" /> My Journal
          </h4>
          <Link href="/journals/new" className="btn btn-primary btn-sm">
            <FaPlus className="me-1" /> New Entry
          </Link>
        </div>

        <div className="mb-4">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredEntries.length === 0 ? (
          <div className="text-center py-5">
            <FaBook className="display-4 text-muted mb-3" />
            <h4>No journal entries yet</h4>
            <p className="text-muted mb-4">
              Start your journaling journey by creating your first entry
            </p>
            <Link href="/journals/new" className="btn btn-primary">
              <FaPlus className="me-2" /> Create First Entry
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {filteredEntries.map((entry) => (
              <div key={entry._id?.toString()} className="col-md-6 col-lg-4">
                <div 
                  className="card h-100 shadow-sm hover-shadow transition-all"
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/journals/${entry._id}`)}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-1 text-truncate">
                        {entry.title || 'Untitled'}
                      </h5>
                      {entry.mood !== undefined && entry.mood !== null && (
                        <span className="fs-4">{getMoodEmoji(entry.mood)}</span>
                      )}
                    </div>
                    <p className="card-text text-muted small mb-2">
                      {formatDate(entry.createdAt)}
                    </p>
                    <p className="card-text text-truncate-3">
                      {entry.content.substring(0, 150)}
                      {entry.content.length > 150 ? '...' : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
