import DashboardNavBar from "@/components/DashboardNavBar";
import Layout from "@/components/Layout";
import { useApi } from "@/lib/api";
import { JournalEntry } from "@/types/journal";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";

export default function JournalEntryPage() {
  const router = useRouter();
  const { id } = router.query;
  const { get, delete: del } = useApi();
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchEntry = async () => {
      if (!id) return;
      
      try {
        const response = await get<JournalEntry>(`/api/journals/${id}`);
        setEntry(response.data);
      } catch (error) {
        console.error("Failed to fetch journal entry:", error);
        router.push("/journals");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, [id, get, router]);

  const handleDelete = async () => {
    if (!id || Array.isArray(id)) {
      console.error("Invalid journal entry ID");
      return;
    }

    if (!confirm("Are you sure you want to delete this journal entry?")) {
      return;
    }

    try {
      setIsDeleting(true);
      await del(`/api/journals/${id}`);
      router.push("/journals");
    } catch (error) {
      console.error("Failed to delete journal entry:", error);
      toast.error("Failed to delete journal entry");
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMoodLabel = (mood: number | null | undefined) => {
    if (mood === null || mood === undefined) return null;
    const labels = ["Terrible", "Not Great", "Neutral", "Good", "Great!"];
    return labels[Math.min(Math.max(0, mood - 1), labels.length - 1)];
  };

  if (isLoading) {
    return (
      <Layout title="Loading...">
        <DashboardNavBar />
        <div className="container my-3">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!entry) {
    return (
      <Layout title="Not Found">
        <DashboardNavBar />
        <div className="container my-3">
          <div className="alert alert-warning">Journal entry not found</div>
          <Link href="/journals" className="btn btn-primary">
            Back to Journal
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={entry.title || "Journal Entry"}>
      <DashboardNavBar />
      <div className="container my-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link href="/journals" className="btn btn-outline-secondary btn-sm">
            <FaArrowLeft className="me-1" /> Back to Journal
          </Link>
          <div>
            <Link 
              href={`/journals/${id}/edit`} 
              className="btn btn-outline-primary btn-sm me-2"
            >
              <FaEdit className="me-1" /> Edit
            </Link>
            <button 
              className="btn btn-outline-danger btn-sm"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <FaTrash className="me-1" /> 
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h1 className="h3 mb-1">{entry.title || 'Untitled'}</h1>
                <p className="text-muted mb-0">
                  {formatDate(entry.createdAt)}
                </p>
              </div>
              {entry.mood !== undefined && entry.mood !== null && (
                <div className="text-end">
                  <div className="h4 mb-0">
                    {getMoodLabel(entry.mood)}
                  </div>
                  <small className="text-muted">Mood</small>
                </div>
              )}
            </div>

            <div className="border-top pt-3 mt-3">
              <div 
                className="journal-content" 
                style={{ whiteSpace: 'pre-line' }}
              >
                {entry.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
