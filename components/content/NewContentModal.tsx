'use client';

import React, { useState } from 'react';
import { ContentItem, ContentStatus } from '@/types/youtube';
import { X, Plus, Sparkles } from 'lucide-react';

interface NewContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: ContentItem) => void;
}

export default function NewContentModal({ isOpen, onClose, onAdd }: NewContentModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState('YouTube');
  const [type, setType] = useState('YouTube Video');
  const [status, setStatus] = useState<ContentStatus>('idea');
  const [scheduledDate, setScheduledDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: ContentItem = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `item-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      platform,
      type,
      status,
      createdAt: new Date().toISOString(),
      scheduledDate: scheduledDate || undefined,
    };

    onAdd(newItem);
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-[#FFFDF9] border border-[#E5DCD0] shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E5DCD0] flex items-center justify-between">
          <h3 className="text-base font-bold text-[#211C1D] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#832632]" />
            Add New Content Idea
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#624641] hover:text-[#211C1D] hover:bg-[#F9F2E8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#211C1D] mb-1">
              Content Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 10 AI Developer Extensions You Must Try"
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F9F2E8] border border-[#D9C8B5] text-[#211C1D] placeholder-[#a69688] focus:outline-none focus:ring-2 focus:ring-[#832632]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#211C1D] mb-1">
              Description / Notes
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Key talking points, reference links, or target metrics..."
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F9F2E8] border border-[#D9C8B5] text-[#211C1D] placeholder-[#a69688] focus:outline-none focus:ring-2 focus:ring-[#832632] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#211C1D] mb-1">
                Format / Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F9F2E8] border border-[#D9C8B5] text-[#211C1D] focus:outline-none focus:ring-2 focus:ring-[#832632]"
              >
                <option value="YouTube Video">YouTube Video</option>
                <option value="Tutorial">Tutorial / Coding</option>
                <option value="YouTube Short">YouTube Short</option>
                <option value="Deep Dive">Deep Dive</option>
                <option value="Live Stream">Live Stream</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#211C1D] mb-1">
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ContentStatus)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F9F2E8] border border-[#D9C8B5] text-[#211C1D] focus:outline-none focus:ring-2 focus:ring-[#832632]"
              >
                <option value="idea">Idea</option>
                <option value="planning">Planning</option>
                <option value="draft">Draft</option>
                <option value="ready">Ready</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#211C1D] mb-1">
              Scheduled Date (Optional)
            </label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F9F2E8] border border-[#D9C8B5] text-[#211C1D] focus:outline-none focus:ring-2 focus:ring-[#832632]"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#624641] hover:text-[#211C1D] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#832632] hover:bg-[#6e1e28] text-[#F9F2E8] shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Content</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
