import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useApi } from '@/lib/api';
import { toast } from 'react-toastify';
import { FaRegFrown, FaRegMeh, FaRegSmileBeam, FaRegLaughSquint, FaTimes } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// Dynamically import the markdown editor with no SSR
const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
);
import 'easymde/dist/easymde.min.css';

// Mood options with colors
const MOOD_OPTIONS = [
  { value: 1, label: 'Awful', icon: <FaRegFrown />, color: '#dc3545' },
  { value: 2, label: 'Bad', icon: <FaRegFrown />, color: '#fd7e14' },
  { value: 3, label: 'Neutral', icon: <FaRegMeh />, color: '#ffc107' },
  { value: 4, label: 'Good', icon: <FaRegSmileBeam />, color: '#20c997' },
  { value: 5, label: 'Great', icon: <FaRegLaughSquint />, color: '#198754' },
];

interface JournalFormData {
  title: string;
  content: string;
  mood: number | null;
  tags: string[];
}

function JournalForm() {
  const router = useRouter();
  const { post } = useApi();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<JournalFormData>({
    title: '',
    content: '',
    mood: null,
    tags: []
  });
  
  const [tagInput, setTagInput] = useState('');
  const tagInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      content: value
    }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !tagInput && formData.tags.length > 0) {
      // Remove last tag when backspace is pressed with empty input
      removeTag(formData.tags[formData.tags.length - 1]);
    }
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setTagInput('');
    }
  };

  const handleTagInputBlur = () => {
    // Add tag when input loses focus and there's text
    if (tagInput.trim()) {
      addTag();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
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
      await post('/api/journals', formData);
      toast.success('Journal entry saved successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving journal entry:', error);
      toast.error('Failed to save journal entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="form-label text-muted small mb-1">Title (optional)</label>
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

      {/* Mood Selection */}
      <div className="mb-4">
        <label className="form-label d-block text-muted small mb-1">How are you feeling?</label>
        <div className="d-flex justify-content-between px-1 col-md-8">
          {MOOD_OPTIONS.map((option) => (
            <div key={option.value} className="text-center">
              <button
                type="button"
                className={`btn btn-icon btn-lg rounded-circle mb-1 p-1 ${formData.mood === option.value ? 'text-white' : ''}`}
                onClick={() => handleMoodSelect(option.value)}
                aria-label={option.label}
                style={{
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  backgroundColor: formData.mood === option.value ? option.color : '#f8f9fa',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {React.cloneElement(option.icon, {
                  size: 24,
                  style: {
                    color: formData.mood === option.value ? 'white' : option.color
                  }
                })}
              </button>
              <div className="small text-muted">{option.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tags Input */}
      <div className="mb-4">
        <label className="form-label d-block text-muted small mb-1">
          Tags
          <small className="text-muted ms-1">(separate with commas)</small>
        </label>
        
        {/* Tags container with input */}
        <div 
          className="form-control d-flex flex-wrap align-items-center"
       
          onClick={() => tagInputRef.current?.focus()}
        >
          {/* Display tags as pills */}
          {formData.tags.map((tag) => (
            <span 
              key={tag} 
              className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center"
              style={{ 
                padding: '0.35rem 0.75rem', 
                borderRadius: '50px',
                fontSize: '0.85rem'
              }}
            >
              {tag}
              <button 
                type="button" 
                className="btn btn-link p-0 ms-2"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                style={{ lineHeight: 1 }}
                aria-label={`Remove ${tag}`}
              >
                <FaTimes className="text-muted" size={12} />
              </button>
            </span>
          ))}
          
          {/* Hidden input for better mobile experience */}
          <input
            type="text"
            className="flex-grow-1 border-0 bg-transparent"
            style={{ 
              minWidth: '100px',
              outline: 'none',
              boxShadow: 'none',
              padding: '0.25rem 0.5rem'
            }}
            placeholder={formData.tags.length === 0 ? 'Type and press comma...' : ''}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value.replace(/,/g, ''))} // Prevent commas in input
            onKeyDown={handleTagKeyDown}
            onBlur={handleTagInputBlur}
            ref={tagInputRef}
          />
        </div>
        <small className="text-muted">Press comma or enter to add a tag</small>
      </div>

      {/* Markdown Editor */}
      <div className="mb-4">
        <label className="form-label text-muted small mb-2 d-block">How was your day?</label>
        <div className="overflow-hidden">
          <SimpleMDE
            value={formData.content}
            onChange={handleContentChange}
            placeholder="Write about your thoughts, feelings, or anything on your mind..."
            className="form-control border-0"
            style={{ minHeight: '100px', width: '100%' }}
            options={{
              spellChecker: false,
              status: false,
              autofocus: false,
              placeholder: 'Write about your thoughts, feelings, or anything on your mind...',
              toolbar: [
                'bold', 'italic', 'heading', '|',
                'quote', 'unordered-list', 'ordered-list', '|',
                'link', 'image', '|',
                'preview', 'side-by-side', 'fullscreen', '|',
                'guide'
              ]
            }}
          />
        </div>
      </div>

      <div className="d-grid gap-2 d-md-flex justify-content-end pt-2">
        <button
          type="button"
          className="btn btn-outline-secondary px-4"
          onClick={() => router.push('/dashboard')}
          disabled={isSubmitting}
          style={{ borderRadius: '8px' }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary px-4"
          disabled={isSubmitting || !formData.content.trim()}
          style={{ borderRadius: '8px' }}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : 'Save Entry'}
        </button>
      </div>
    </form>
  );
}

export default JournalForm;