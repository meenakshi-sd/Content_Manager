'use client';

import React, { useState } from 'react';
import { ContentItem, ContentStatus } from '@/types/youtube';
import ContentCard from './ContentCard';
import NewContentModal from './NewContentModal';
import CalendarSection from './CalendarSection';
import { Plus, Kanban, Sparkles, Inbox } from 'lucide-react';

interface ContentPlannerProps {
  items: ContentItem[];
  onStatusChange: (id: string, newStatus: ContentStatus) => void;
  onAddContent: (item: ContentItem) => void;
  onDeleteContent: (id: string) => void;
}

export default function ContentPlanner({
  items,
  onStatusChange,
  onAddContent,
  onDeleteContent,
}: ContentPlannerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: { id: ContentStatus; title: string }[] = [
    { id: 'idea', title: 'IDEAS' },
    { id: 'planning', title: 'PLANNING' },
    { id: 'draft', title: 'DRAFT' },
    { id: 'ready', title: 'READY' },
    { id: 'published', title: 'PUBLISHED' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#FFFDF9] border border-[#E5DCD0] shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-[#211C1D] flex items-center gap-2">
            <Kanban className="w-5 h-5 text-[#832632]" />
            Content Plan
          </h2>
          <p className="text-xs text-[#624641] mt-1">
            Organize your next videos from idea to publication.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#832632] hover:bg-[#6e1e28] text-[#F9F2E8] shadow-md active:scale-98 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Content</span>
        </button>
      </div>

      {/* Empty State Banner if 0 items */}
      {items.length === 0 && (
        <div className="p-10 rounded-3xl bg-[#FFFDF9] border border-dashed border-[#D9C8B5] text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#832632]/10 text-[#832632] flex items-center justify-center mx-auto">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#211C1D]">No content planned yet</h3>
          <p className="text-xs text-[#624641] max-w-md mx-auto leading-relaxed">
            Turn your next idea into a published video. AI suggestions based on your channel performance will appear here when you add them.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#832632] text-[#F9F2E8] inline-flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create First Content Idea</span>
          </button>
        </div>
      )}

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const columnItems = items.filter((item) => item.status === col.id);

          return (
            <div
              key={col.id}
              className="rounded-2xl bg-[#FFFDF9] border border-[#E5DCD0] p-3 flex flex-col min-h-[380px] shadow-xs"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-2 py-2 mb-3 border-b border-[#E5DCD0]">
                <span className="text-xs font-extrabold tracking-wider text-[#211C1D]">
                  {col.title}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F9F2E8] text-[#832632] border border-[#D9C8B5]">
                  {columnItems.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-3 flex-1">
                {columnItems.map((item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    onStatusChange={onStatusChange}
                    onDelete={onDeleteContent}
                  />
                ))}

                {columnItems.length === 0 && (
                  <div className="h-28 border border-dashed border-[#E5DCD0] rounded-xl flex items-center justify-center text-[11px] text-[#a69688]">
                    No items
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Calendar Timeline View */}
      {items.length > 0 && <CalendarSection items={items} />}

      {/* Modal Dialog */}
      <NewContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={onAddContent}
      />
    </div>
  );
}
