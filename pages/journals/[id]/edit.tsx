import DashboardNavBar from "@/components/DashboardNavBar";
import Layout from "@/components/Layout";
import { useApi } from "@/lib/api";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import { FaSadTear, FaMeh, FaSmile, FaLaugh } from 'react-icons/fa';

const MOOD_OPTIONS = [
  { value: 1, label: 'Terrible', icon: <FaSadTear className="text-danger" /> },
  { value: 2, label: 'Not Great', icon: <FaMeh className="text-warning" /> },
  { value: 3, label: 'Neutral', icon: <FaMeh className="text-info" /> },
  { value: 4, label: 'Good', icon: <FaSmile className="text-primary" /> },
  { value: 5, label: 'Great!', icon: <FaLaugh className="text-success" /> },
];

export default function EditJournalPage() {
  const router = useRouter();
  const { id } = router.query;
  const { get, put } = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  interface JournalFormData {
    title: string;
    content: string;
    mood: number | null;
    tags?: string[];
  }

  const [formData, setFormData] = useState<JournalFormData>({
    title: '',
    content: '',
    mood: null,
    tags: []
  });

  useEffect(() => {
    const fetchEntry = async () => {
      if (!id) return;
      
      try {
        const data = await get(`/api/journals/${id}`);
        setFormData({
          title: data?.title || '',
          content: data?.content,
          mood: data?.mood || null,
        });
      } catch (error) {
        console.error("Failed to fetch journal entry:", error);
        toast.error("Failed to load journal entry");
        router.push("/journals");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, [id, get, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'mood' ? (value ? parseInt(value, 10) : null) : value,
    }));
  };

  const handleMoodSelect = (mood: number) => {
    setFormData(prev => ({
      ...prev,
      mood: prev.mood === mood ? null : mood,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.content.trim()) {
      toast.error('Please write something in your journal');
      return;
    }

    try {
      setIsSubmitting(true);
      await put(`/api/journals/${id}`, formData);
      toast.success('Journal entry updated successfully!');
      router.push(`/journals/${id}`);
    } catch (error) {
      console.error('Error updating journal entry:', error);
      toast.error('Failed to update journal entry');
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <Layout title="Edit Journal Entry">
      <DashboardNavBar />
      <div className="container my-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link href={`/journals/${id}`} className="btn btn-outline-secondary btn-sm">
            <FaArrowLeft className="me-1" /> Cancel
          </Link>
          <h1 className="h4 mb-0">
            Edit Journal Entry
          </h1>
          <div style={{ width: '100px' }}></div> {/* For alignment */}
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form onSubmit={handleSubmit} className="card shadow-sm">
              <div className="card-body p-4">
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">Title (optional)</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Give your entry a title"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="content" className="form-label">Your entry</label>
                  <textarea
                    id="content"
                    name="content"
                    className="form-control"
                    rows={10}
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Write about your thoughts, feelings, or anything on your mind..."
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label d-block mb-2">How were you feeling?</label>
                  <div className="d-flex justify-content-between">
                    {MOOD_OPTIONS.map((option) => (
                      <div key={option.value} className="text-center">
                        <button
                          type="button"
                          className={`btn btn-icon btn-lg rounded-circle mb-1 ${formData.mood === option.value ? 'bg-primary text-white' : 'bg-light'}`}
                          onClick={() => handleMoodSelect(option.value)}
                          aria-label={option.label}
                        >
                          {React.cloneElement(option.icon, {
                            size: 24,
                            className: formData.mood === option.value ? 'text-white' : ''
                          })}
                        </button>
                        <div className="small text-muted">{option.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <Link href={`/journals/${id}`} className="btn btn-outline-secondary">
                    <FaTimes className="me-1" /> Cancel
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting || !formData.content.trim()}
                  >
                    <FaSave className="me-1" />
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
